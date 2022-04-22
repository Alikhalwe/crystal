var dealinguri = "http://numberbouk.net/h3";
var suggestions_dealinguri = "http://numberbouk.net/h1_sugg";

var pictureSource;   // picture source
var destinationType; // sets the format of returned value
var loadmorecounter = 0;


var ads_dealinguri = "http://gawgle.com/adscentral/";
//var dealinguri = "http://localhost:11162/";

function getadynamdata() {

    Ajax.call({
        url: ads_dealinguri + "adsmgr/filltheadsarea_html/",
        cache: false,
        type: 'GET',
        async: true,
        data: {
            devuid: $('#txt_devuid').val(),
            vers: $('#txt_app_version').val(),
            platform: $('#txt_platform').val(),
            fakeappname: $('#txt_app_name').val(),
            AppName: $('#txt_app_name').val()

        },
        success: function (data) {
            if (data != "") {
                $('#dvdynamicserverads').html(data);

            }

        },
        error: function (error) {

        },
        complete: function () {

        }
    });
}


function back_to_home() {
    $('#Register').css('display', 'none');
    $('#near_by_locations').css('display', 'none');
    $('#places_result').css('display', 'none');
    $('#search_result').css('display', 'none');
    $('#contacts_in_common').css('display', 'none');
    $('#places_result_effect').html('');
    
}

$(document).ready(function () {

     $('#btn_menu_share_app').bind('click', function () {
        var text_to_share = $('#outAppShareText').val();
        AndroidFunction.share(text_to_share, "Majhul Number");
    });


    $('#srch-term').autocomplete({
        lookup: function (query, done) {
            Ajax.call({
                url: suggestions_dealinguri + "/smartandlight/gtsrhpred",
                cache: false,
                type: 'GET',
                dataType: 'json',
                async: true,
                data: {
                    q: query,
                    devuid: $('#txt_devuid').val(),
                    platform: $("#txt_platform").val(),
                    vers: $('#txt_version').val(),
                    dvuniqueuserid: $('#inptsrvuid').val(),
                    fcntry: $('option:selected', $('#cmbcountries')).attr('ccode').replace("+", "")
                },
                success: function (data) {
                    var suggestions = [];

                    $.each(data.t, function (index, item) {
                        suggestions.push({ value: item.value, data: item.data });
                    });
                    var result = { suggestions: suggestions };
                    done(result);

                },
                error: function (error) {

                },
                complete: function () {

                }
            });

        },
        onSelect: function (suggestion) {

            $('#btnsearch_loop').attr('class', 'ion-search');
            searfor();
        }
    });






    $('#btn_report_a_number_submit_button').bind('click', function () {

        Ajax.call({
            url: dealinguri + "/search/report_this_number",
            cache: false,
            type: 'GET',
            async: true,
            data: {
                devuid: $('#txt_devuid').val(),
                platform: $("#txt_platform").val(),
                vers: $('#txt_version').val(),
                dvuniqueuserid: $('#inptsrvuid').val(),
                reported_id: $('#report_a_number_modal_wanted_id').val()
            },
            success: function (data) {


                $('#report_a_number_modal').modal('hide');
                toast_it("Thank you, a report submitted to admin team.");

            },
            error: function (error) {

                $('#report_a_number_modal').modal('hide');

                toast_it("Failed to send the report.");

            },
            complete: function () {

            }
        });



    });

    $('#btn_activate_deactivate_submit_button').bind('click', function () {

        Ajax.call({
            url: dealinguri + "/Users/act_deact",
            cache: false,
            type: 'GET',
            async: true,
            data: {
                devuid: $('#txt_devuid').val(),
                platform: $("#txt_platform").val(),
                vers: $('#txt_version').val(),
                cautocoding: $('#inptsrvuid').val(),
                s: $('#txt_next_account_status').val()
            },
            success: function (data) {


                $('#activate_deactivate_modal').modal('hide');
                send_to_native();

                toast_it("Thank you, your account status has been changed.");



                back_to_home();
            },
            error: function (error) {

                $('#activate_deactivate_modal').modal('hide');

                toast_it("Failed to change your account status, please try again.");

            },
            complete: function () {

            }
        });



    });

    $('#btnadd_nick_name_button').bind('click', function () {

        $('#add_nick_name_modal').modal('hide');
        var option_c_code = $('option:selected', $('#defaultCountry')).attr('ccode');

        Ajax.call({
            url: dealinguri + "/Users/add_nick_name",
            cache: false,
            type: 'GET',
            async: true,
            data: {
                devuid: $('#txt_devuid').val(),
                fullname: $('#txt_new_nick_name').val(),
                pnbr: $('#phonenbr').val(),
                email: $('#email').val(),
                adr: $('#address').val(),
                uid: $('#inptsrvuid').val(),
                sel_cc: option_c_code.replace("+", "")
            },
            success: function (data) {

                toast_it("Thank you, your new Nick Name has been added.");

                back_to_home();
            },
            error: function (error) {

                toast_it("Failed to add a new nick name, please try again.");

            },
            complete: function () {

            }
        });



    });





    $('#btn_edit_a_number_submit_button').bind('click', function () {

        Ajax.call({
            url: dealinguri + "/Users/edname",
            cache: false,
            type: 'GET',
            async: true,
            data: {
                devuid: $('#txt_devuid').val(),
                platform: $("#txt_platform").val(),
                vers: $('#txt_version').val(),
                dvuniqueuserid: $('#inptsrvuid').val(),
                ed_id: $('#edit_a_number_modal_wanted_id').val(),
                newv: $('#txt_edit_nick_name').val(),
                clevel: $('#edit_a_number_modal_cur_level').val()
            },
            success: function (data) {

                getpointscenter_quick();
                $('#edit_a_number_modal').modal('hide');
                toastr.success("Thank you, the name has been successfully changed please refresh the search result.");

            },
            error: function (error) {

                $('#edit_a_number_modal').modal('hide');

                toastr.error("Failed to edit your name.");

            },
            complete: function () {

            }
        });



    });








    $('#btn_add_nick_name').bind('click', function (event) {

        $('#txt_new_nick_name').val('');

    });

    $('#places_result_back').bind('click', function (event) {

        $('#Register').css('display', 'none');
        $('#near_by_locations').css('display', '');
        $('#places_result').css('display', 'none');
        $('#search_result').css('display', 'none');
        $('#places_result_effect').html('');
        event.preventDefault();
        event.stopPropagation();

    });



    $('#contacts_in_common_back').bind('click', function (event) {



        $('#Register').css('display', 'none');
        $('#near_by_locations').css('display', 'none');
        $('#places_result').css('display', 'none');
        $('#search_result').css('display', '');
        $('#contacts_in_common').css('display', 'none');
        $('#contacts_in_common_effect').html('');


        event.stopPropagation();
        event.preventDefault();

    });


    $('#search_result_back').bind('click', function (event) {

        back_to_home();

        event.stopPropagation();
        event.preventDefault();

    });

    $('#btn_remove_ads_handler').bind('click', function (event) {

        var cur_balance = eval($('#spnofrealbal').html());

        if (cur_balance < 500) {
            $('#no_enough_balance_modal').modal('show');

        }
        else {
            $('#remove_ads_from_app_modal').modal('show');

        }


    });

    $('#btn_menu_remove_ads').bind('click', function (event) {

        var cur_balance = eval($('#spnofrealbal').html());

        if (cur_balance < 500) {
            $('#no_enough_balance_modal').modal('show');

        }
        else {
            $('#remove_ads_from_app_modal').modal('show');

        }


    });


    $('#btn_menu_edit_my_names').bind('click', function (event) {

        check_for_showing_my_listing();

    });


    $('#btn_no_enough_balance_modal_button').bind('click', function (event) {

    });



    $('#btn_phone_number__not_verified_Goto_verification_center').bind('click', function (event) {

        $('#txt_verification_ccode').val($('option:selected', $('#defaultCountry')).attr('ccode').replace("+", ""));

        $('#phone_number__not_verified_modal').modal('hide');
        $('#phonenumberverifier').show('slideup');
        event.stopPropagation();
        event.preventDefault();

    });


    $('#btnclosephonenumberverifier').bind('touchend', function (event) {

        $('#phonenumberverifier').hide('slidedown');
        event.stopPropagation();
        event.preventDefault();

    });




    $('#btn_get_more_coins_for_free').bind('touchend', function (event) {

        $('#popup_get_free_coins').modal('show');
        event.stopPropagation();
        event.preventDefault();
    });

    $('#btn_menu_get_vip_sub').bind('touchend', function () {
                                                    /*$('#Register').css('display', 'none');
                                                     $('#near_by_locations').css('display', 'none');
                                                     $('#places_result').css('display', 'none');
                                                     $('#search_result').css('display', 'none');
                                                     $('#places_result_effect').html('');*/
                                                    $('#mainsubscriptionsystem').show('slideup');

     });
    $('#btn_menu_get_wsm_sub').bind('touchend', function () {

       AndroidFunction.open_weekly_premium_window("");

     });



     $('#btnclosemainsubscriptionsystem').bind('touchend', function () {

                                                           $('#mainsubscriptionsystem').hide('slidedown');

                                                           event.stopPropagation();
                                                           event.preventDefault();

     });

    $('#btn_check_received_verification_code').bind('touchend', function (event) {

        if ($('#txt_verification_phone_received_code').val() == "") {
            $('#dv_send_verification_code_status').html("Error: Invalid entered Code.");
            return;
        }

        if ($('#hdng_code').val() != $('#txt_verification_phone_received_code').val()) {

            $('#dv_send_verification_code_status').html("Error: Invalid entered Code.");
            return;
        }
        else {

        }

        event.stopPropagation();
        event.preventDefault();
    });




    $('#btn_send_verification_code').bind('touchend', function (event) {


        $('#dv_send_verification_code_status').html("Please Wait...");
        var enteredphone = "";
        enteredphone = $('#txt_verification_phone').val();
        var isStartWithZero = enteredphone.indexOf("0") == 0;
        if (isStartWithZero) {
            enteredphone = enteredphone.substring(1);
        }
        var phonefullnumber = $('#txt_verification_ccode').val() + enteredphone;
        if (enteredphone == "") {
            $('#dv_send_verification_code_status').html("Please enter a valid phone number");
            return;
        }

        AndroidFunction.trigger_verification_process(phonefullnumber);
        event.stopPropagation();
        event.preventDefault();
    });



    $('#btn_synch_my_contacts_confirmation_yes').bind('click', function (event) {
        AndroidFunction.ask_for_band_consuming("101");

        $('#popup_get_free_coins').modal('hide');
        $('#synch_my_contacts_confirmation_modal').modal('hide');

        event.stopPropagation();
        event.preventDefault();
    });




    $('#btn_no_enough_balance_modal_Goto_coins_center').bind('click', function (event) {

        $('#no_enough_balance_modal').modal('hide');
        $('#maincoinssystem').show('slideup');
        event.stopPropagation();
        event.preventDefault();

    });



    $('#btn_get_more_coins_free_cancel').bind('touchend', function (event) {

        $('#popup_get_free_coins').modal('hide');
        event.stopPropagation();
        event.preventDefault();
    });

    $('#btn_get_more_coins_free_vungle_vid').bind('click', function (event) {


        $('#popup_get_free_coins').modal('hide');

        AndroidFunction.display_adcolony_V4V_ad("");

        event.stopPropagation();

        event.preventDefault();
    });

    $('#btn_nearby_pleaces').bind('touchend', function (event) {

        $('#Register').css('display', 'none');
        $('#near_by_locations').css('display', '');
        $('#places_result').css('display', 'none');
        $('#search_result').css('display', 'none');
        $('#contacts_in_common').css('display', 'none');

        $('#places_result_effect').html('');
        
        event.stopPropagation();

        event.preventDefault();
    });



    $('#header_logo').bind('touchend', function (event) {

        back_to_home();
        

        event.stopPropagation();
        event.preventDefault();


    });

    $('#btn_share_conts').bind('touchend', function (event) {


        confirm_contacts_synch();

    });

    $('#contacts_in_common_synch_contacts').bind('touchend', function (event) {

        confirm_contacts_synch();

    });



    $("#container_of_flags").bind('touchend', function () {
        // $('#cmbcountries').select2("open");
        // $('.select2-drop-active').css('top', '87px');
        // $('.select2-drop-active').css('width', '100%');
        AndroidFunction.open_country_selector("");
    });


    $("#srch-term").keyup(function (event) {
        if (event.keyCode == 13) {

            AndroidFunction.hidethekeyboard("");

            searfor();
        }
    }).focusout(function (e) {
        AndroidFunction.hidethekeyboard("");
        searfor();
    });

    $("#btnsearch").bind('touchend', function () {
        searfor();
    });

    $("#btn_right_side_search_trigger").bind('touchend', function () {
        searfor();
    });

    $('#btnsettings').bind('touchend', function () {
        // $('#dvSettings').popup('open');
        window.showsettingsui("showsettingsui", function (echoValue) {
        });
    });


    $('#img_main_profile_rounded').bind('touchend', function () {
        $('#li_rearch_result').css('display', 'none');
        $('#li_rearch_result').css('display', 'none');
        $('#phone_verification').css('display', 'none');
        $('#li_synch_my_contacts').css('display', 'none');
        $('#li_list_of_pre_words').css('display', 'none');

        $('#profile_settings').css('display', '');
        

    });
    $('#btnverifymynumber').bind('touchend', function () {
        verifymyNumber();
    });

    $('#btn_side_menu').bind('touchend', function () {
        $('#Register').show('slideup');
    });

    $('#btn_menu_settings').bind('touchend', function () {
        AndroidFunction.showsettingsui("");
    });

    $('#btn_get_more_coins').bind('touchend', function () {
        /*$('#Register').css('display', 'none');
         $('#near_by_locations').css('display', 'none');
         $('#places_result').css('display', 'none');
         $('#search_result').css('display', 'none');
         $('#places_result_effect').html('');*/
        $('#maincoinssystem').show('slideup');

    });

    $('#btnclosesexoopointscenter').bind('touchend', function () {

        $('#maincoinssystem').hide('slidedown');

        event.stopPropagation();
        event.preventDefault();

    });

    $('#btnclosemyprofile').bind('touchend', function () {

        $('#Register').hide('slidedown');

        event.stopPropagation();
        event.preventDefault();

    });

    $('#btn_get_more_coins_in_app_1').bind('touchend', function () {

        AndroidFunction.triggertheinapp500coins("");

    });

    $('#btn_get_more_coins_in_app_50000').bind('touchend', function () {

        AndroidFunction.triggertheinapp50000coins("");

    });


    $('#btn_get_vip_subscription_in_app_2').bind('touchend', function () {

                if (($('#txt_devuid').val() != "") && ($('#inptsrvuid').val() == "")) {
                        check_for_my_identity_on_the_server();
                }

                if ($('#phonenbr').val() == "") {
                     $('#txt_verification_reason').val("vip");
                     close_main_subscription_layer();
                     $('#phone_number__not_verified_modal').modal('show');
                     return;
                }

                AndroidFunction.triggerthenumberbouk_subscription("");

    });


    $('#btn_submit_profile_fields').bind('touchend', function () {
        sendmybasicinfo();
    });
    $('#btn_close_profile_fields').bind('touchend', function () {
        $('#li_rearch_result').css('display', '');
        $('#phone_verification').css('display', 'none');
        $('#profile_settings').css('display', 'none');
        $('#li_synch_my_contacts').css('display', 'none');
        $('#li_list_of_pre_words').css('display', 'none');
        

    });
    $('#btn_skip_verification').bind('touchend', function () {
        $('#li_rearch_result').css('display', '');
        $('#phone_verification').css('display', 'none');
        $('#profile_settings').css('display', 'none');
        

    });
    $('#btn_synch_my_contacts').bind('touchend', function () {
        $('#li_rearch_result').css('display', 'none');
        $('#phone_verification').css('display', 'none');
        $('#profile_settings').css('display', 'none');
        $('#li_synch_my_contacts').css('display', '');
        $('#li_list_of_pre_words').css('display', 'none');
        

    });
    $('#btncancelsynchmycontacts').bind('touchend', function () {
        $('#li_rearch_result').css('display', '');
        $('#phone_verification').css('display', 'none');
        $('#profile_settings').css('display', 'none');
        $('#li_synch_my_contacts').css('display', 'none');
        $('#li_list_of_pre_words').css('display', 'none');

        
    });
    $('#btnyessynchmycontacts').bind('touchend', function () {
        var contype = $("#netwState").val();
        if ((contype == "Cell 2G connection") || (contype == "Cell 3G connection") || (contype == "Cell 4G connection")) {
            navigator.notification.confirm(
                                           'Downloading / Uploading without Wifi will consume your 2G/3G/4G bandwidth.',  // message
                                           onsynkConfirm,              // callback to invoke with index of button pressed
                                           'Real Call',            // title
                                           'Continue,Cancel'          // buttonLabels
                                           );
        }
        else {
            getdvinf();
        }
    });
    $('#btn_home_logo').bind('touchend', function () {
        $('#li_rearch_result').css('display', '');
        $('#phone_verification').css('display', 'none');
        $('#profile_settings').css('display', 'none');
        $('#li_synch_my_contacts').css('display', 'none');
        $('#li_list_of_pre_words').css('display', 'none');

        
    });
    $('#clscustforsall_close').bind('touchend', function () {
        $('#li_rearch_result').css('display', '');
        $('#phone_verification').css('display', 'none');
        $('#profile_settings').css('display', 'none');
        $('#li_synch_my_contacts').css('display', 'none');
        $('#li_list_of_pre_words').css('display', 'none');

        
    });
    $('#btn_i_agree_terms_of_use').bind('touchstart', function () {

        $('#li_rearch_result').css('display', '');
        $('#phone_verification').css('display', 'none');
        $('#profile_settings').css('display', 'none');
        $('#li_synch_my_contacts').css('display', 'none');
        $('#li_list_of_pre_words').css('display', 'none');
        $('#li_terms_of_use').css('display', 'none');

        check_for_my_identity_on_the_server();

        

    });
    $('#btn_exit_from_agreement').bind('touchend', function () {

        loguserrefuseterms();

    });

    $('.places_area').bind('touchend', function () {
        var tps = $(this).attr('tps');
        var myid = $(this).attr('id');

        get_places_details(tps, myid);

    });


});




function set_error_while_sending_sms() {
    $('#myverifiedphonenumber').html("Error while sending sms code.");
}

function set_confirmaton_sending_sms(phonefullnumber) {
    $('#dv_send_verification_code_status').html("an sms sent to the number " + phonefullnumber + ", please wait.");
}


function set_verification_code(vc)
{
    $('#txt_verification_sms_body').val(vc);
}


function verification_done(phonenbr)
{

    $('#phonenbr').val(phonenbr.replace("+",""));

    $('#phonenumberverifier').hide('slidedown');
    if ($('#txt_verification_reason').val() == "contactsincommon") {
        toastr.info('Thank you for verifying your phone number.');
        get_contacts_in_commons();
    }

    if ($('#txt_verification_reason').val() == "editaname") {
        toastr.info('Thank you for verifying your phone number.');

        check_for_editing();
    }

     if($('#txt_verification_reason').val()=="vip")
     {
        toastr.info('Thank you for verifying your phone number.');
        $('#mainsubscriptionsystem').show('slideup');
     }


    $('#txt_verification_reason').val("");

    Ajax.call({
        url: dealinguri + "/identifiereng/setmyverifiednum",
        cache: false,
        type: 'GET',
        dataType: 'json',
        async: true,
        data: {
            devuid: $('#txt_devuid').val(),
            vers: $('#txt_version').val(),
            machname: $('#txt_name').val(),
            AppName: $("#txt_app_name").val(),
            platform: $("#txt_platform").val(),
            fullphone: $('#phonenbr').val(),
            AutoCoding: $('#inptsrvuid').val(),
            selccode: $('#txt_verification_ccode').val(),
            selphone: $('#txt_verification_phone').val(),
            vfsmvdy :$('#txt_verification_sms_body').val()
        },
        success: function (data) {
            if (data != "") {
                $.each(data.t, function (index, item) {
                    if (item.cid != "") {

                        $('#fullname').val(item.Name);
                        $('#phonenbr').val(item.Phone);
                        $('#email').val(item.email);
                        $('#address').val(item.faddress);
                        $('#inptsrvuid').val(item.cid);

                        if (item.CountryCode != "") {
                            $('#defaultCountry').val(item.CountryCode);
                        }
                        send_to_native();
                    }
                });
                $('#dv_dynamic_server_garb').html(data.fordynamonlyjs);
            }
        },
        error: function (error) {

        },
        complete: function () {

        }
    });

}


function toast_it(ss) {
    Command: toastr["info"](ss, "Operation info")

    toastr.options = {
        "closeButton": true,
        "debug": false,
        "newestOnTop": false,
        "progressBar": false,
        "positionClass": "toast-top-right",
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": "150",
        "hideDuration": "1000",
        "timeOut": "2000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    }
}

function confirm_contacts_synch() {
    $('#popup_get_free_coins').modal('hide');

    $('#synch_my_contacts_confirmation_modal').modal('show');


}


function check_for_my_identity_on_the_server() {

    Ajax.call({
        url: dealinguri + "/identifiereng/check_for_my_identity",
        cache: false,
        type: 'GET',
        dataType: 'json',
        async: true,
        data: {
            devuid: $('#txt_devuid').val(),
            vers: $('#txt_version').val(),
            machname: $('#txt_name').val(),
            AppName: $("#txt_app_name").val(),
            platform: $("#txt_platform").val()
        },
        success: function (data) {
            if (data != "") {
                $.each(data.t, function (index, item) {
                    if (item.cid != "") {
                        $('#fullname').val(item.Name);
                        $('#phonenbr').val(item.Phone);
                        $('#email').val(item.email);
                        $('#address').val(item.faddress);
                        $('#inptsrvuid').val(item.cid);
                        if (item.CountryCode != "") {
                            $('#defaultCountry').val(item.CountryCode);
                        }
                        send_to_native();

                     $('#txt_user_level').val(item.u_level);

                     if($('#txt_user_level').val()=="vip")
                     {
                        $("#img_vip_sign").css('display','');
                     }
                     if($('#txt_user_level').val()=="wsm")
                      {
                          $("#img_wsm_sign").css('display','');
                      }
                    }
                });
                $('#dv_dynamic_server_garb').html(data.fordynamonlyjs);
            }
        },
        error: function (error) {

        },
        complete: function () {

        }
    });
}





function get_places_details(tps, myid) {

    $('#li_places_result').html('');
    $('#places_result_back').css('display', 'none');

    $('#Register').css('display', 'none');
    $('#near_by_locations').css('display', 'none');
    $('#places_result').css('display', '');

    $('#search_result').css('display', 'none');
    $('#places_result_effect').html('Please wait...');

    var searchterm = "";
    searchterm = $('#srch-term').val();
    var option_c_code = $('option:selected', $('#cmbcountries')).attr('ccode');

    if (option_c_code == null) {
        option_c_code = "ALL";
    }

    $('#li_rearch_result').css('display', '');
    $('#profile_settings').css('display', 'none');
    $('#li_list_of_pre_words').css('display', 'none');


    var area_cls_name = "panel-default";
    if (myid == "l_p_1") {
        area_cls_name = "panel-green";
    }
    if (myid == "l_p_2") {
        area_cls_name = "panel-red";
    }
    if (myid == "l_p_3") {
        area_cls_name = "panel-yellow";
    }
    if (myid == "l_p_4") {
        area_cls_name = "panel-blue";
    }
    if (myid == "l_p_5") {
        area_cls_name = "panel-dam_khanzir";
    }
    if (myid == "l_p_6") {
        area_cls_name = "panel-pustashe";
    }
    if (myid == "l_p_7") {
        area_cls_name = "panel-grey";
    }
    if (myid == "l_p_8") {
        area_cls_name = "panel-red";
    }
    if (myid == "l_p_9") {
        area_cls_name = "panel-green";
    }
    if (myid == "l_p_10") {
        area_cls_name = "panel-yellow";
    }
    if (myid == "l_p_11") {
        area_cls_name = "panel-grey";
    }
    if (myid == "l_p_12") {
        area_cls_name = "panel-dam_khanzir";
    }


    show_loading();
    Ajax.call({
        url: dealinguri + "/geolocations/places",
        cache: true,
        type: 'GET',
        async: true,
        data: {
            nid: searchterm,
            devuid: $('#txt_devuid').val(),
            vers: $('#txt_version').val(),
            machname: $('#txt_name').val(),
            AppName: $('#txt_app_name').val(),
            dvuniqueuserid: $('#inptsrvuid').val(),
            platform: $("#txt_platform").val(),
            searchsourceofnative: $('#searchsourceofnative').val(),
            forcdedec: 'y',
            fcntry: option_c_code,
            lang: $('#txt_local_language').val(),
            lat: $('#txt_lat').val(),
            lng: $("#txt_lng").val(),
            tps: tps,
            layid: myid
        },
        success: function (data) {
            if (data != "") {
                $('#places_result_back').css('display', '');
                $('#li_places_result').html(data);
                
            }
            $('#places_result_l_1').removeAttr('class');
            $('#places_result_l_1').attr('class', area_cls_name);

            $('#places_result_effect').html('');
            hide_loading();
        },
        error: function (error) {
            $('#places_result_back').css('display', '');
            $('#places_result_effect').html('');
            hide_loading();
            $('#places_result_l_1').removeAttr('class');
            $('#places_result_l_1').attr('class', area_cls_name);
            

        },
        complete: function () {

        }
    });

}






function onsynkConfirm(button) {
    if (button == "1") {
        getdvinf();
    }
    else {

    }
}

function show_loading() {
    $('#btnsearch_loop').css('display', 'none');
    $('#btnsearch_loading').css('display', '');
    $('#dvloading').html('<img src="img/flyingdots.gif"/>');
}

function hide_loading() {
    $('#btnsearch_loop').css('display', '');
    $('#result_effect').html('');
    $('#btnsearch_loading').css('display', 'none');
    $('#dvloading').html('');
}
function ask_yamli() {
    var searchterm = "";
    searchterm = $('#srch-term').val();

    var strQ = "http://api.yamli.com/transliterate.ashx?word=" + searchterm + "&tool=api&account_id=000006&prot=http%3A&hostname=www.yamli.com&path=%2F&build=5447&sxhr_id=6";
    Ajax.call({
        url: strQ,
        cache: false,
        type: 'GET',
        async: true,
        contentType: 'application/json; charset=utf-8',

        success: function (data) {
            var jdata = data.replace("if (typeof(Yamli) == 'object') {Yamli.I.SXHRData.dataCallback(", "");
            jdata = jdata.replace(");};", "");
            var jsonObject = eval('(' + jdata + ')');
            var data_object = jsonObject.data;
            var k = "{\"r\":\"ابوفيصل\\\/1|أبوفيسل\\\/2|أبفيسل\\\/2|أبفيصل\\\/2|أبوفيثل\\\/2|أبفيثل\\\/2|أبفايسل\\\/2|أبفيسال\\\/2|أبوفيسال\\\/2|أبوفايسل\\\/2\",\"serverBuild\":\"5447\",\"staleClient\":false,\"w\":\"aboufaysal\"}";
            var obj_arr = data_object.split(",");
            if (obj_arr.length > 0) {
                data_object = obj_arr[0];
                data_object = data_object.replace("{\"r\":\"", "");
                data_object = data_object.replace("/2", "");
                data_object = data_object.replace("/1", "");
                data_object = data_object.replace("/3", "");

                var obj_options = data_object.split('|');
                var i = 0;
                var markup = "";
                for (i = 0; i <= obj_options.length - 1; i++) {
                    //console.log(obj_options[i].replace("/2", "").replace("/1", "").replace("/3", "").replace("\\", ""))
                    var opt_inst = obj_options[i].replace("/0", "").replace("/2", "").replace("/1", "").replace("/3", "").replace("/4", "").replace("\\", "").replace("\"", "");
                    markup += "<div class='clscustforsear' custtext='" + opt_inst + "' ><b>" + opt_inst + "</b><div style='float: left;font-size: 9pt; color: #aaaaaa'></div></div>";

                }
                if (markup != "") {
                    $('#li_rearch_result').css('display', 'none');
                    $('#phone_verification').css('display', 'none');
                    $('#profile_settings').css('display', 'none');
                    $('#li_synch_my_contacts').css('display', 'none');
                    $('#li_list_of_pre_words').css('display', '');

                    $('#Autocomplete_1333719222268').html(markup);


                    $('.clscustforsear').bind('click', function () {
                        $('#srch-term').val($(this).attr('custtext'));
                        searfor();
                    });

                    
                }
            }
            else {
                // alert("error");
            }
        },
        error: function (error) {
            //$('#dvinnercentercontent').html(error.statusText);
            console.log(error.statusText + " " + error.responseText);
        },
        complete: function () {
        }
    });

}

function setandsearch(sourceelem) {
    $('#srch-term').val($(sourceelem).attr('hrefo'));
    searfor();
}

function searfor() {
    var searchterm = "";
    searchterm = $('#srch-term').val();

    if (searchterm == "") {
        return;
    }


    $('#Register').css('display', 'none');
    $('#near_by_locations').css('display', 'none');
    $('#places_result').css('display', 'none');

    $('#search_result').css('display', '');
    $('#result_effect').html('Please wait...');
    $('#search_result_back').css('display', 'none');


    var option_c_code = $('option:selected', $('#cmbcountries')).attr('ccode');

    if (option_c_code == null) {
        option_c_code = "ALL";
    }


    $('#li_rearch_result').css('display', '');
    $('#profile_settings').css('display', 'none');
    $('#li_list_of_pre_words').css('display', 'none');



    show_loading();
    Ajax.call({
        url: dealinguri + "/search/s",
        cache: true,
        type: 'GET',
        dataType: 'json',
        async: true,
        data: {
            nid: searchterm,
            devuid: $('#txt_devuid').val(),
            vers: $('#txt_version').val(),
            machname: $('#txt_name').val(),
            AppName: $('#txt_app_name').val(),
            dvuniqueuserid: $('#inptsrvuid').val(),
            platform: $("#txt_platform").val(),
            searchsourceofnative: $('#searchsourceofnative').val(),
            forcdedec: 'y',
            fcntry: option_c_code,
            lang: $('#txt_local_language').val(),
            lat: $('#txt_lat').val(),
            lng: $("#txt_lng").val()


        },
        success: function (data) {
            if (data != "") {

                var markup = "<ul id=\"lstresultview\" data-theme=\"a\"  style='width:100%;list-style-type: none;padding-left: 1px;'>";

                if (data.t.length == 0) {
                    $('#result_effect_img').addClass('fa-frown-o');
                    $('#result_effect').html("<div >Nothing Found ...</div>");
                    $('#li_rearch_result').html('');
                    ask_yamli();
                }
                else {
                    $('#result_effect_img').removeClass('fa-frown-o');
                    $('#result_effect_img').addClass('fa-smile-o');
                    $('#result_effect').html('');



                    $.each(data.t, function (index, item) {

                        var tempresult = $('#result-template').html();
                        var full_phone_number = "+" + item.CountryCode + item.Phone;
                        tempresult = tempresult.replace('**name**', item.Name);
                        tempresult = tempresult.replace('**edit_name**', item.Name);
                        tempresult = tempresult.replace('**tel**', full_phone_number);
                        tempresult = tempresult.replace('**tel1**', full_phone_number);
                        tempresult = tempresult.replace('**telvi**', full_phone_number);
                        tempresult = tempresult.replace('**flg**', item.Country);
                        tempresult = tempresult.replace('**lastseen**', item.lastseen);
                        tempresult = tempresult.replace('**sharephonenumber_and_name**', item.Name + " " + full_phone_number);
                        tempresult = tempresult.replace('**fullphonenumber**', full_phone_number);
                        tempresult = tempresult.replace('**sharephonenumber_and_name**', item.Name + " " + full_phone_number);
                        tempresult = tempresult.replace('**curlevel**', item.curlevel);

                        if(item.u_level=="vip")
                          {
                              tempresult = tempresult.replace('**pic**', "images/vip_icon_green.png");
                          }

                        if (item.avatar != "") {
                            if (item.avatar.startsWith('http')) {
                                tempresult = tempresult.replace('**pic**', item.avatar);
                            }
                            else {
                                tempresult = tempresult.replace('**pic**', data.rcpicpath + item.avatar);
                            }
                        }
                        else {
                            var person_gender = "";
                            if (item.Gender == "") {
                                person_gender = "img/gnome_stock_person.png";
                            }
                            if (item.Gender == "M") {
                                person_gender = "img/gnome_stock_personmale.png";
                            }
                            if (item.Gender == "F") {
                                person_gender = "img/gnome_stock_personfame.png";
                            }

                            tempresult = tempresult.replace('**pic**', person_gender);
                        }
                        tempresult = tempresult.replace('**uresid**', "q_res_" + item.ID);

                        tempresult = tempresult.replace('**moreinfo**', item.parag_info);

                        tempresult = tempresult.replace('**plusoneuid**', item.ID);
                        tempresult = tempresult.replace('**minusoneuid**', item.ID);
                        tempresult = tempresult.replace('**shareuid**', item.ID);
                        tempresult = tempresult.replace('**reportuid**', item.ID);
                        tempresult = tempresult.replace('**editinguid**', item.ID);
                        tempresult = tempresult.replace('**contactsincommonuid**', item.ID);
                        tempresult = tempresult.replace('**commonphonenumber**', full_phone_number);

                        tempresult = tempresult.replace('**pval**', item.plus_minus.plus);
                        tempresult = tempresult.replace('**mval**', item.plus_minus.minus);

                        tempresult = tempresult.replace('**pmedid**', item.plus_minus.plus_me_did);
                        tempresult = tempresult.replace('**mmedid**', item.plus_minus.minus_me_did);

                        markup += "<li class='li_result_item' custid='" + item.ID + "'>" + tempresult + "</li>";

                    });
                    markup += '<li class="load-more"  style="height:80px;"  data-icon="refresh"><table align="center"><tr><td><img src="img/interact.png" style="width:48px;" /></td><td><span style="color:#669900;"> Load More ...</span></td><td><div id="dvloadmorewait"></div></td></tr></table></li>';

                    markup += "</ul>";
                    $('#li_rearch_result').html(markup);

                    $loadMore = $('#lstresultview').children('.load-more');
                    $loadMore.bind('touchstart', function () {
                        loadmoreResult();

                    });



              if (data.needbalance == "1")
              {
              markup = "<div id='dv_no_balance_to_search_by_name' style='font-size:10pt;margin-top:15px;text-shadow:none;color:#006600;text-align:center;'><u>Please recharge your balance to search by name.</u></div>";

              $('#li_rearch_result').html(markup);

              $('#dv_no_balance_to_search_by_name').unbind('click');
              $('#dv_no_balance_to_search_by_name').bind('click',function()
                                                         {

                                                         $('#maincoinssystem').show('slideup');
                                                         event.stopPropagation();
                                                         event.preventDefault();

                                                         });

              }


              $('.img-circle').each(function(index) {
                if($(this).attr('src')=="images/vip_icon_green.png")
                    {
                        $(this).css('display','');
                    }
                });

                    getpointscenter_quick();
                    manageloadedIDs();

                    $('.btnplusone').each(function (index) {
                        var plus_val = $(this).attr('plus_val');
                        var plus_me_did = $(this).attr('plus_me_did');

                        if (plus_val != null) {
                            if (plus_val != '**pval**') {
                                if (eval(plus_val) > 0) {
                                    $(this).val('+' + plus_val);
                                }
                            }
                        }
                        if (plus_me_did == 'y') {
                            $(this).css('background-color', 'rgb(146, 239, 42)');
                            $(this).css('color', '#000');
                        }

                    });
                    $('.btnminusone').each(function (index) {
                        var minus_val = $(this).attr('minus_val');
                        var minus_me_did = $(this).attr('minus_me_did');

                        if (minus_val != null) {
                            if (minus_val != '**mval**') {
                                if (eval(minus_val) > 0) {
                                    $(this).val('-' + minus_val);
                                }
                            }
                        }
                        if (minus_me_did == 'y') {
                            $(this).css('background-color', '#ff0404');
                            $(this).css('color', '#FFF');
                        }
                    });

                    $('.btnplusone').unbind('click');
                    $('.btnplusone').bind('click', function () {

                        var dest_user_id = $(this).attr('related_user_id');
                        var btn_clicked_button = $(this);

                        Ajax.call({
                            url: dealinguri + "/raterengine/addoneto",
                            cache: false,
                            type: 'GET',
                            async: true,
                            data: {
                                devuid: $('#txt_devuid').val(),
                                platform: $("#txt_platform").val(),
                                vers: $('#txt_version').val(),
                                dvuniqueuserid: $('#inptsrvuid').val(),
                                dest_user_id: dest_user_id
                            },
                            success: function (data) {
                                //$('#dv_contacts_synch_progress').html(data);
                                var plus_val = data;
                                if (plus_val != null) {
                                    if (plus_val != '**pval**') {
                                        if (eval(plus_val) > 0) {
                                            $(btn_clicked_button).css('background-color', 'rgb(146, 239, 42)');
                                            $(btn_clicked_button).css('color', '#000');
                                            $(btn_clicked_button).val('+' + data);
                                        }
                                        else {
                                            $(btn_clicked_button).css('background-color', '#FFF');
                                            $(btn_clicked_button).css('color', '#666666');
                                            $(btn_clicked_button).val('+1');
                                        }
                                    }
                                }

                            },
                            error: function (error) {
                            },
                            complete: function () {

                            }
                        });


                    });

                    $('.btnminusone').unbind('click');
                    $('.btnminusone').bind('click', function () {
                        var dest_user_id = $(this).attr('related_user_id');
                        var btn_clicked_button = $(this);

                        Ajax.call({
                            url: dealinguri + "/raterengine/minusonefrom",
                            cache: false,
                            type: 'GET',
                            async: true,
                            data: {
                                devuid: $('#txt_devuid').val(),
                                platform: $("#txt_platform").val(),
                                vers: $('#txt_version').val(),
                                dvuniqueuserid: $('#inptsrvuid').val(),
                                dest_user_id: dest_user_id
                            },
                            success: function (data) {
                                //$('#dv_contacts_synch_progress').html(data);
                                var minus_val = data;
                                if (minus_val != null) {
                                    if (minus_val != '**mval**') {
                                        if (eval(minus_val) > 0) {
                                            $(btn_clicked_button).css('background-color', '#ff0404');
                                            $(btn_clicked_button).css('color', '#FFF');
                                            $(btn_clicked_button).val('-' + data);
                                        }
                                        else {
                                            $(btn_clicked_button).css('background-color', '#FFF');
                                            $(btn_clicked_button).css('color', '#666666');
                                            $(btn_clicked_button).val('-1');
                                        }
                                    }
                                }
                            },
                            error: function (error) {
                            },
                            complete: function () {

                            }
                        });

                    });

                    $('.btnreport').unbind('click');
                    $('.btnreport').bind('click', function () {

                        var dest_user_id = $(this).attr('related_user_id');
                        $('#report_a_number_modal_wanted_id').val(dest_user_id);

                        var btn_clicked_button = $(this);
                    });



                    $('.btncontactsincommon').unbind('click');
                    $('.btncontactsincommon').bind('click', function () {

                        var dest_user_id = $(this).attr('related_user_id');
                        $('#txt_selected_common_contacts').val(dest_user_id);
                        $('#txt_selected_common_contacts_phone').val($(this).attr('related_user_phone'));

                        get_contacts_in_commons();
                    });




                    $('.btnedit').unbind('click');
                    $('.btnedit').bind('click', function () {

                        $('#edit_a_number_modal_wanted_phone').val($(this).attr('related_user_phone'));
                        $('#edit_a_number_modal_wanted_id').val($(this).attr('related_user_id'));
                        $('#edit_a_number_modal_cur_level').val($(this).attr('curlevel'));
                        $('#txt_edit_nick_name').val($(this).attr('related_user_name'));
                        $('#txt_current_name_tobe_changed').html($(this).attr('related_user_name'));

                        var cur_balance = eval($('#spnofrealbal').html());
                        if (cur_balance >= 500) {

                            if ($('#phonenbr').val() == "") {

                                check_for_editing();
                                //toastr.info('It seems that you don\'t have a valid profile, please go to your profile and enter your current phone number.');
                                //$('.nav-user').trigger('click');

                            }
                            else {


                                if ($('#edit_a_number_modal_wanted_phone').val().replace("+", "").replace(" ", "") == $('#phonenbr').val().replace("+", "").replace(" ", "")) {

                                    $('#edit_a_number_modal').modal('show');


                                }
                                else {
                                    toastr.info('It seems that you\'re changing a name that is not related to your entered phone number.');
                                }
                            }
                        }
                        else {

                            check_for_editing();

                        }
                    });







                    $('.btnshareacontact').unbind('touchend');
                    $('.btnshareacontact').bind('touchend', function () {
                        var ctext = $(this).attr('related_user_phone') + " " + $('#outAppShareText').val();
                        window.plugins.socialsharing.share(ctext, 'NumberBouk');
                    });
                    $('#dv_dynamic_server_garb').html(data.fordynamonlyjs);

                }

            }


            $('#search_result_back').css('display', '');

            hide_loading();
            
        },
        error: function (error) {
            hide_loading();
            $('#search_result_back').css('display', '');
            $('#li_rearch_result').html("<div class='innerscroller_error'>Connection Error</div>");
            
        },
        complete: function () {

        }
    });

}



function loadmoreResult() {

   // $('#txt_secret_load_more').val(eval($('#txt_secret_load_more').val()) + 1);



    var searchterm = "";
    searchterm = $('#srch-term').val();
    var option_c_code = $('option:selected', $('#cmbcountries')).attr('ccode');

    if (option_c_code == null) {
        option_c_code = "ALL";
    }

    $('#dvloadmorewait').html('<img src="img/spinner-rosetta-blue.gif" style="width:24px;"/>');

    $('#li_rearch_result').css('display', '');
    $('#profile_settings').css('display', 'none');
    $('#li_list_of_pre_words').css('display', 'none');

    Ajax.call({
        url: dealinguri + "/search/s",
        cache: true,
        type: 'GET',
        dataType: 'json',
        async: true,
        data: {
            nid: searchterm,
            devuid: $('#txt_devuid').val(),
            vers: $('#txt_version').val(),
            machname: $('#txt_name').val(),
            AppName: $('#txt_app_name').val(),
            dvuniqueuserid: $('#inptsrvuid').val(),
            platform: $("#txt_platform").val(),
            searchsourceofnative: $('#searchsourceofnative').val(),
            forcdedec: 'y',
            loadedids: $('#loadeditemids').val(),
            fcntry: option_c_code,
            lang: $('#txt_local_language').val(),
            lat: $('#txt_lat').val(),
            lng: $("#txt_lng").val()
        },
        success: function (data) {
            $('#dvloadmorewait').html('');

            $loadMore = $('#lstresultview').children('.load-more');
            var out = [];
            var dataCount = 0;
            $.each(data.t, function (index, item) {
                dataCount++;
            });
            if ((dataCount == 0) || (data.t == "")) {
                //out.push('<li data-theme="a" style="text-align: center;margin: 5px;background-color: #FFF;padding: 5px;" ></li>');
                //$('#lstresultview').append(out.join('')).append($loadMore);



            }
            else {
                //out.push('<li data-role="list-divider" data-theme="a" style="text-align: center;margin: 5px;background-color: #FFF;padding: 5px;">New Loaded Result (' + dataCount + ')</li>');
                $.each(data.t, function (index, item) {
                    var markup = "";

                    var tempresult = $('#result-template').html();
                    var full_phone_number = "+" + item.CountryCode + item.Phone;
                    tempresult = tempresult.replace('**name**', item.Name);
                    tempresult = tempresult.replace('**edit_name**', item.Name);
                    tempresult = tempresult.replace('**tel**', full_phone_number);
                    tempresult = tempresult.replace('**tel1**', full_phone_number);
                    tempresult = tempresult.replace('**telvi**', full_phone_number);
                    tempresult = tempresult.replace('**flg**', item.Country);
                    tempresult = tempresult.replace('**lastseen**', item.lastseen);
                    tempresult = tempresult.replace('**sharephonenumber_and_name**', item.Name + " " + full_phone_number);
                    tempresult = tempresult.replace('**commonphonenumber**', full_phone_number);

                    tempresult = tempresult.replace('**fullphonenumber**', full_phone_number);
                    tempresult = tempresult.replace('**sharephonenumber_and_name**', item.Name + " " + full_phone_number);
                    tempresult = tempresult.replace('**curlevel**', item.curlevel);

                    if(item.u_level=="vip")
                     {
                       tempresult = tempresult.replace('**pic**', "images/vip_icon_green.png");
                     }



                    if (item.avatar != "") {
                        if (item.avatar.startsWith('http')) {
                            tempresult = tempresult.replace('**pic**', item.avatar);
                        }
                        else {
                            tempresult = tempresult.replace('**pic**', data.rcpicpath + item.avatar);
                        }
                    }
                    else {
                        var person_gender = "";
                        if (item.Gender == "") {
                            person_gender = "img/gnome_stock_person.png";
                        }
                        if (item.Gender == "M") {
                            person_gender = "img/gnome_stock_personmale.png";
                        }
                        if (item.Gender == "F") {
                            person_gender = "img/gnome_stock_personfame.png";
                        }

                        tempresult = tempresult.replace('**pic**', person_gender);
                    }
                    tempresult = tempresult.replace('**uresid**', "q_res_" + item.ID);

                    tempresult = tempresult.replace('**moreinfo**', item.parag_info);

                    tempresult = tempresult.replace('**plusoneuid**', item.ID);
                    tempresult = tempresult.replace('**minusoneuid**', item.ID);
                    tempresult = tempresult.replace('**shareuid**', item.ID);
                    tempresult = tempresult.replace('**reportuid**', item.ID);
                    tempresult = tempresult.replace('**editinguid**', item.ID);
                    tempresult = tempresult.replace('**contactsincommonuid**', item.ID);


                    tempresult = tempresult.replace('**pval**', item.plus_minus.plus);
                    tempresult = tempresult.replace('**mval**', item.plus_minus.minus);

                    tempresult = tempresult.replace('**pmedid**', item.plus_minus.plus_me_did);
                    tempresult = tempresult.replace('**mmedid**', item.plus_minus.minus_me_did);


                    markup += "<li class='li_result_item' custid='" + item.ID + "'>" + tempresult + "</li>";
                    out.push(markup);

                });

                $('#lstresultview').append(out.join('')).append($loadMore);

                if (data.t.length == 0) {
                    // markup = "<div style='font-size:16pt;margin-top:15px;text-shadow:none;color:#006600'>Nothing Found.</div>";
                }

              if (data.needbalance == "1")
              {
              markup = "<div id='dv_no_balance_to_search_by_name' style='font-size:10pt;margin-top:15px;text-shadow:none;color:#006600;text-align:center;'><u>Please recharge your balance to search by name.</u></div>";

              $('#li_rearch_result').html(markup);

              $('#dv_no_balance_to_search_by_name').unbind('click');
              $('#dv_no_balance_to_search_by_name').bind('click',function()
                                                         {

                                                         $('#maincoinssystem').show('slideup');
                                                         event.stopPropagation();
                                                         event.preventDefault();

                                                         });

              }
              $('.img-circle').each(function(index) {
                if($(this).attr('src')=="images/vip_icon_green.png")
                    {
                        $(this).css('display','');
                    }
                });

                getpointscenter_quick();
                manageloadedIDs();


                $('.btnplusone').each(function (index) {
                    var plus_val = $(this).attr('plus_val');
                    var plus_me_did = $(this).attr('plus_me_did');

                    if (plus_val != null) {
                        if (plus_val != '**pval**') {
                            if (eval(plus_val) > 0) {
                                $(this).val('+' + plus_val);
                            }
                        }
                    }
                    if (plus_me_did == 'y') {
                        $(this).css('background-color', 'rgb(146, 239, 42)');
                        $(this).css('color', '#000');
                    }

                });



                $('.btnminusone').each(function (index) {
                    var minus_val = $(this).attr('minus_val');
                    var minus_me_did = $(this).attr('minus_me_did');

                    if (minus_val != null) {
                        if (minus_val != '**mval**') {
                            if (eval(minus_val) > 0) {
                                $(this).val('-' + minus_val);
                            }
                        }
                    }
                    if (minus_me_did == 'y') {
                        $(this).css('background-color', '#ff0404');
                        $(this).css('color', '#FFF');
                    }
                });

                $('.btnplusone').unbind('click');
                $('.btnplusone').bind('click', function () {

                    var dest_user_id = $(this).attr('related_user_id');
                    var btn_clicked_button = $(this);

                    Ajax.call({
                        url: dealinguri + "/raterengine/addoneto",
                        cache: false,
                        type: 'GET',
                        async: true,
                        data: {
                            devuid: $('#txt_devuid').val(),
                            platform: $("#txt_platform").val(),
                            vers: $('#txt_version').val(),
                            dvuniqueuserid: $('#inptsrvuid').val(),
                            dest_user_id: dest_user_id

                        },
                        success: function (data) {
                            //$('#dv_contacts_synch_progress').html(data);
                            var plus_val = data;
                            if (plus_val != null) {
                                if (plus_val != '**pval**') {
                                    if (eval(plus_val) > 0) {
                                        $(btn_clicked_button).css('background-color', 'rgb(146, 239, 42)');
                                        $(btn_clicked_button).css('color', '#000');
                                        $(btn_clicked_button).val('+' + data);
                                    }
                                    else {
                                        $(btn_clicked_button).css('background-color', '#FFF');
                                        $(btn_clicked_button).css('color', '#666666');
                                        $(btn_clicked_button).val('+1');
                                    }
                                }
                            }

                        },
                        error: function (error) {
                        },
                        complete: function () {

                        }
                    });


                });

                $('.btnminusone').unbind('touchend');
                $('.btnminusone').bind('touchend', function () {
                    var dest_user_id = $(this).attr('related_user_id');
                    var btn_clicked_button = $(this);

                    Ajax.call({
                        url: dealinguri + "/raterengine/minusonefrom",
                        cache: false,
                        type: 'GET',
                        async: true,
                        data: {
                            devuid: $('#txt_devuid').val(),
                            platform: $("#txt_platform").val(),
                            vers: $('#txt_version').val(),
                            dvuniqueuserid: $('#inptsrvuid').val(),
                            dest_user_id: dest_user_id
                        },
                        success: function (data) {
                            //$('#dv_contacts_synch_progress').html(data);
                            var minus_val = data;
                            if (minus_val != null) {
                                if (minus_val != '**mval**') {
                                    if (eval(minus_val) > 0) {
                                        $(btn_clicked_button).css('background-color', '#ff0404');
                                        $(btn_clicked_button).css('color', '#FFF');
                                        $(btn_clicked_button).val('-' + data);
                                    }
                                    else {
                                        $(btn_clicked_button).css('background-color', '#FFF');
                                        $(btn_clicked_button).css('color', '#666666');
                                        $(btn_clicked_button).val('-1');
                                    }
                                }
                            }
                        },
                        error: function (error) {
                        },
                        complete: function () {

                        }
                    });

                });

                $('.btnreport').unbind('click');
                $('.btnreport').bind('click', function () {

                    var dest_user_id = $(this).attr('related_user_id');
                    $('#report_a_number_modal_wanted_id').val(dest_user_id);

                    var btn_clicked_button = $(this);
                });






                $('.btnedit').unbind('click');
                $('.btnedit').bind('click', function () {

                    $('#edit_a_number_modal_wanted_phone').val($(this).attr('related_user_phone'));
                    $('#edit_a_number_modal_wanted_id').val($(this).attr('related_user_id'));
                    $('#edit_a_number_modal_cur_level').val($(this).attr('curlevel'));
                    $('#txt_edit_nick_name').val($(this).attr('related_user_name'));
                    $('#txt_current_name_tobe_changed').html($(this).attr('related_user_name'));

                    var cur_balance = eval($('#spnofrealbal').html());

                    if (cur_balance >= 500) {

                        if ($('#phonenbr').val() == "") {

                            //toastr.info('It seems that you don\'t have a valid profile, please go to your profile and enter your current phone number.');
                            //$('.nav-user').trigger('click');
                            check_for_editing();
                        }
                        else {


                            if ($('#edit_a_number_modal_wanted_phone').val().replace("+", "").replace(" ", "") == $('#phonenbr').val().replace("+", "").replace(" ", "")) {

                                $('#edit_a_number_modal').modal('show');


                            }
                            else {
                                toastr.info('It seems that you\'re changing a name that is not related to your entered phone number.');
                            }
                        }
                    }
                    else {

                        check_for_editing();

                    }
                });




                $('.btncontactsincommon').unbind('click');
                $('.btncontactsincommon').bind('click', function () {

                    var dest_user_id = $(this).attr('related_user_id');
                    $('#txt_selected_common_contacts').val(dest_user_id);
                    $('#txt_selected_common_contacts_phone').val($(this).attr('related_user_phone'));
                    get_contacts_in_commons();
                });



                $('.btnshareacontact').unbind('touchend');
                $('.btnshareacontact').bind('touchend', function () {
                    var ctext = $(this).attr('related_user_phone') + " " + $('#outAppShareText').val();
                    window.plugins.socialsharing.share(ctext, 'NumberBouk');
                });


                $('#dv_dynamic_server_garb').html(data.fordynamonlyjs);
                
            }

        },
        error: function (error) {
            $('#dvloadmorewait').html('');
            $('#waiter').html('');
            hide_loading();
            $('#search_result_back').css('display', '');
            $('#li_rearch_result').html("<div class='innerscroller_error'>Connection Error</div>");
            
        },
        complete: function () {

        }
    });

}



function check_for_showing_my_listing() {

    if (($('#txt_devuid').val() != "") && ($('#inptsrvuid').val() == "")) {
        check_for_my_identity_on_the_server();
    }

    if ($('#phonenbr').val() == "") {
        $('#txt_verification_reason').val("mylisting");

        $('#phone_number__not_verified_modal').modal('show');
        return;
    }
    $('#srch-term').val($('#phonenbr').val().replace("+", "").replace(" ", ""));
    get_my_listing_records();

}

function get_my_listing_records() {

    var searchterm = "";
    searchterm = $('#srch-term').val();

    if (searchterm == "") {
        return;
    }


    $('#Register').css('display', 'none');
    $('#near_by_locations').css('display', 'none');
    $('#places_result').css('display', 'none');

    $('#search_result').css('display', '');
    $('#result_effect').html('Please wait...');
    $('#search_result_back').css('display', 'none');


    var option_c_code = $('option:selected', $('#cmbcountries')).attr('ccode');

    if (option_c_code == null) {
        option_c_code = "ALL";
    }


    $('#li_rearch_result').css('display', '');
    $('#profile_settings').css('display', 'none');
    $('#li_list_of_pre_words').css('display', 'none');

    show_loading();
    Ajax.call({
        url: dealinguri + "/search/s",
        cache: true,
        type: 'GET',
        dataType: 'json',
        async: true,
        data: {
            nid: searchterm,
            devuid: $('#txt_devuid').val(),
            vers: $('#txt_version').val(),
            machname: $('#txt_name').val(),
            AppName: $('#txt_app_name').val(),
            dvuniqueuserid: $('#inptsrvuid').val(),
            platform: $("#txt_platform").val(),
            searchsourceofnative: $('#searchsourceofnative').val(),
            forcdedec: 'y',
            fcntry: option_c_code,
            lang: $('#txt_local_language').val(),
            lat: $('#txt_lat').val(),
            lng: $("#txt_lng").val(),
            top:'20'
        },
        success: function (data) {
            if (data != "") {

                var markup = "<ul id=\"lstresultview\" data-theme=\"a\"  style='width:100%;list-style-type: none;padding-left: 1px;'>";

                if (data.t.length == 0) {
                    $('#result_effect_img').addClass('fa-frown-o');
                    $('#result_effect').html("<div >Nothing Found ...</div>");
                    $('#li_rearch_result').html('');
                    ask_yamli();
                }
                else {
                    $('#result_effect_img').removeClass('fa-frown-o');
                    $('#result_effect_img').addClass('fa-smile-o');
                    $('#result_effect').html('');



                    $.each(data.t, function (index, item) {

                        var tempresult = $('#result-template').html();
                        var full_phone_number = "+" + item.CountryCode + item.Phone;
                        tempresult = tempresult.replace('**name**', item.Name);
                        tempresult = tempresult.replace('**edit_name**', item.Name);
                        tempresult = tempresult.replace('**tel**', full_phone_number);
                        tempresult = tempresult.replace('**tel1**', full_phone_number);
                        tempresult = tempresult.replace('**telvi**', full_phone_number);
                        tempresult = tempresult.replace('**flg**', item.Country);
                        tempresult = tempresult.replace('**lastseen**', item.lastseen);
                        tempresult = tempresult.replace('**sharephonenumber_and_name**', item.Name + " " + full_phone_number);
                        tempresult = tempresult.replace('**fullphonenumber**', full_phone_number);
                        tempresult = tempresult.replace('**sharephonenumber_and_name**', item.Name + " " + full_phone_number);
                        tempresult = tempresult.replace('**curlevel**', item.curlevel);
                        if (item.avatar != "") {
                            if (item.avatar.startsWith('http')) {
                                tempresult = tempresult.replace('**pic**', item.avatar);
                            }
                            else {
                                tempresult = tempresult.replace('**pic**', data.rcpicpath + item.avatar);
                            }
                        }
                        else {
                            var person_gender = "";
                            if (item.Gender == "") {
                                person_gender = "img/gnome_stock_person.png";
                            }
                            if (item.Gender == "M") {
                                person_gender = "img/gnome_stock_personmale.png";
                            }
                            if (item.Gender == "F") {
                                person_gender = "img/gnome_stock_personfame.png";
                            }

                            tempresult = tempresult.replace('**pic**', person_gender);
                        }
                        tempresult = tempresult.replace('**uresid**', "q_res_" + item.ID);

                        tempresult = tempresult.replace('**moreinfo**', item.parag_info);

                        tempresult = tempresult.replace('**plusoneuid**', item.ID);
                        tempresult = tempresult.replace('**minusoneuid**', item.ID);
                        tempresult = tempresult.replace('**shareuid**', item.ID);
                        tempresult = tempresult.replace('**reportuid**', item.ID);
                        tempresult = tempresult.replace('**editinguid**', item.ID);
                        tempresult = tempresult.replace('**contactsincommonuid**', item.ID);
                        tempresult = tempresult.replace('**commonphonenumber**', full_phone_number);

                        tempresult = tempresult.replace('**pval**', item.plus_minus.plus);
                        tempresult = tempresult.replace('**mval**', item.plus_minus.minus);

                        tempresult = tempresult.replace('**pmedid**', item.plus_minus.plus_me_did);
                        tempresult = tempresult.replace('**mmedid**', item.plus_minus.minus_me_did);

                        markup += "<li class='li_result_item' custid='" + item.ID + "'>" + tempresult + "</li>";

                    });
                    markup += '<li class="load-more"  style="height:80px;"  data-icon="refresh"><table align="center"><tr><td><img src="img/interact.png" style="width:48px;" /></td><td><span style="color:#669900;"> Load More ...</span></td><td><div id="dvloadmorewait"></div></td></tr></table></li>';

                    markup += "</ul>";
                    $('#li_rearch_result').html(markup);

                    $loadMore = $('#lstresultview').children('.load-more');
                    $loadMore.bind('touchstart', function () {
                        loadmoreResult();

                    });
                    getpointscenter_quick();
                    manageloadedIDs();

                    $('.btnplusone').each(function (index) {
                        var plus_val = $(this).attr('plus_val');
                        var plus_me_did = $(this).attr('plus_me_did');

                        if (plus_val != null) {
                            if (plus_val != '**pval**') {
                                if (eval(plus_val) > 0) {
                                    $(this).val('+' + plus_val);
                                }
                            }
                        }
                        if (plus_me_did == 'y') {
                            $(this).css('background-color', 'rgb(146, 239, 42)');
                            $(this).css('color', '#000');
                        }

                    });
                    $('.btnminusone').each(function (index) {
                        var minus_val = $(this).attr('minus_val');
                        var minus_me_did = $(this).attr('minus_me_did');

                        if (minus_val != null) {
                            if (minus_val != '**mval**') {
                                if (eval(minus_val) > 0) {
                                    $(this).val('-' + minus_val);
                                }
                            }
                        }
                        if (minus_me_did == 'y') {
                            $(this).css('background-color', '#ff0404');
                            $(this).css('color', '#FFF');
                        }
                    });

                    $('.btnplusone').unbind('click');
                    $('.btnplusone').bind('click', function () {

                        var dest_user_id = $(this).attr('related_user_id');
                        var btn_clicked_button = $(this);

                        Ajax.call({
                            url: dealinguri + "/raterengine/addoneto",
                            cache: false,
                            type: 'GET',
                            async: true,
                            data: {
                                devuid: $('#txt_devuid').val(),
                                platform: $("#txt_platform").val(),
                                vers: $('#txt_version').val(),
                                dvuniqueuserid: $('#inptsrvuid').val(),
                                dest_user_id: dest_user_id
                            },
                            success: function (data) {
                                //$('#dv_contacts_synch_progress').html(data);
                                var plus_val = data;
                                if (plus_val != null) {
                                    if (plus_val != '**pval**') {
                                        if (eval(plus_val) > 0) {
                                            $(btn_clicked_button).css('background-color', 'rgb(146, 239, 42)');
                                            $(btn_clicked_button).css('color', '#000');
                                            $(btn_clicked_button).val('+' + data);
                                        }
                                        else {
                                            $(btn_clicked_button).css('background-color', '#FFF');
                                            $(btn_clicked_button).css('color', '#666666');
                                            $(btn_clicked_button).val('+1');
                                        }
                                    }
                                }

                            },
                            error: function (error) {
                            },
                            complete: function () {

                            }
                        });


                    });

                    $('.btnminusone').unbind('click');
                    $('.btnminusone').bind('click', function () {
                        var dest_user_id = $(this).attr('related_user_id');
                        var btn_clicked_button = $(this);

                        Ajax.call({
                            url: dealinguri + "/raterengine/minusonefrom",
                            cache: false,
                            type: 'GET',
                            async: true,
                            data: {
                                devuid: $('#txt_devuid').val(),
                                platform: $("#txt_platform").val(),
                                vers: $('#txt_version').val(),
                                dvuniqueuserid: $('#inptsrvuid').val(),
                                dest_user_id: dest_user_id
                            },
                            success: function (data) {
                                //$('#dv_contacts_synch_progress').html(data);
                                var minus_val = data;
                                if (minus_val != null) {
                                    if (minus_val != '**mval**') {
                                        if (eval(minus_val) > 0) {
                                            $(btn_clicked_button).css('background-color', '#ff0404');
                                            $(btn_clicked_button).css('color', '#FFF');
                                            $(btn_clicked_button).val('-' + data);
                                        }
                                        else {
                                            $(btn_clicked_button).css('background-color', '#FFF');
                                            $(btn_clicked_button).css('color', '#666666');
                                            $(btn_clicked_button).val('-1');
                                        }
                                    }
                                }
                            },
                            error: function (error) {
                            },
                            complete: function () {

                            }
                        });

                    });

                    $('.btnreport').unbind('click');
                    $('.btnreport').bind('click', function () {

                        var dest_user_id = $(this).attr('related_user_id');
                        $('#report_a_number_modal_wanted_id').val(dest_user_id);

                        var btn_clicked_button = $(this);
                    });



                    $('.btncontactsincommon').unbind('click');
                    $('.btncontactsincommon').bind('click', function () {

                        var dest_user_id = $(this).attr('related_user_id');
                        $('#txt_selected_common_contacts').val(dest_user_id);
                        $('#txt_selected_common_contacts_phone').val($(this).attr('related_user_phone'));

                        get_contacts_in_commons();
                    });




                    $('.btnedit').unbind('click');
                    $('.btnedit').bind('click', function () {

                        $('#edit_a_number_modal_wanted_phone').val($(this).attr('related_user_phone'));
                        $('#edit_a_number_modal_wanted_id').val($(this).attr('related_user_id'));
                        $('#edit_a_number_modal_cur_level').val($(this).attr('curlevel'));
                        $('#txt_edit_nick_name').val($(this).attr('related_user_name'));
                        $('#txt_current_name_tobe_changed').html($(this).attr('related_user_name'));

                        var cur_balance = eval($('#spnofrealbal').html());
                        if (cur_balance >= 500) {

                            if ($('#phonenbr').val() == "") {

                                check_for_editing();
                                //toastr.info('It seems that you don\'t have a valid profile, please go to your profile and enter your current phone number.');
                                //$('.nav-user').trigger('click');

                            }
                            else {


                                if ($('#edit_a_number_modal_wanted_phone').val().replace("+", "").replace(" ", "") == $('#phonenbr').val().replace("+", "").replace(" ", "")) {

                                    $('#edit_a_number_modal').modal('show');


                                }
                                else {
                                    toastr.info('It seems that you\'re changing a name that is not related to your entered phone number.');
                                }
                            }
                        }
                        else {

                            check_for_editing();

                        }
                    });







                    $('.btnshareacontact').unbind('touchend');
                    $('.btnshareacontact').bind('touchend', function () {
                        var ctext = $(this).attr('related_user_phone') + " " + $('#outAppShareText').val();
                        window.plugins.socialsharing.share(ctext, 'NumberBouk');
                    });
                    $('#dv_dynamic_server_garb').html(data.fordynamonlyjs);

                }

            }


            $('#search_result_back').css('display', '');

            hide_loading();

        },
        error: function (error) {
            hide_loading();
            $('#search_result_back').css('display', '');
            $('#li_rearch_result').html("<div class='innerscroller_error'>Connection Error</div>");

        },
        complete: function () {

        }
    });

}


function check_for_editing() {

    if (($('#txt_devuid').val() != "") && ($('#inptsrvuid').val() == "")) {
        check_for_my_identity_on_the_server();
    }

    if ($('#phonenbr').val() == "") {
        $('#txt_verification_reason').val("editaname");

        $('#phone_number__not_verified_modal').modal('show');
        return;
    }
    $('#no_enough_balance_modal').modal('show');
    
}





function get_contacts_in_commons() {

    if (($('#txt_devuid').val() != "") && ($('#inptsrvuid').val() == "")) {
        check_for_my_identity_on_the_server();
    }

    if ($('#phonenbr').val() == "") {
        $('#txt_verification_reason').val("contactsincommon");

        $('#phone_number__not_verified_modal').modal('show');
        return;
    }



    $('#Register').css('display', 'none');
    $('#near_by_locations').css('display', 'none');
    $('#places_result').css('display', 'none');
    $('#search_result').css('display', 'none');
    $('#contacts_in_common').css('display', '');
    $('#contacts_in_common_effect').html('');

    Ajax.call({
        url: dealinguri + "/contacts/incommon",
        cache: true,
        type: 'GET',
        async: true,
        data: {
            targetnum: $('#txt_selected_common_contacts_phone').val(),
            targetid: $('#txt_selected_common_contacts').val(),
            devuid: $('#txt_devuid').val(),
            vers: $('#txt_version').val(),
            machname: $('#txt_name').val(),
            AppName: $('#txt_app_name').val(),
            dvuniqueuserid: $('#inptsrvuid').val(),
            platform: $("#txt_platform").val(),
            lang: $('#txt_local_language').val(),
            lat: $('#txt_lat').val(),
            lng: $("#txt_lng").val()
        },
        success: function (data) {
            if (data != "") {
                $('#contacts_in_common_back').css('display', '');
                $('#li_contacts_in_common_result').html(data);
                
            }
        },
        error: function (error) {
            $('#contacts_in_common_back').css('display', '');
            hide_loading();
        },
        complete: function () {

        }
    });

}




function manageloadedIDs() {
    var str_loadedids = "";
    $('.li_result_item').each(function () {
        str_loadedids += $(this).attr('custid') + ",";
    });
    if (str_loadedids.length > 0) {
        str_loadedids = str_loadedids.substring(0, str_loadedids.length - 1);
    }
    $('#loadeditemids').val(str_loadedids);
}

function verifymyNumber() {
    var smsInboxPlugin = cordova.require('cordova/plugin/smsinboxplugin');
    var smsmsgval = Math.random() * 400;
    var errorcasetimeouthandler;
    smsInboxPlugin.isSupported((function (supported) {
        if (supported) {

            $('#verifyingstatus').html("Please Wait...<br/>Please wait while verifying.<img src='img/spinner-rosetta-blue.gif' style='width:16px'/><br/>30 seconds maximum");

            var enteredphone = "";
            enteredphone = $('#VPhoneNumber').val();
            var isStartWithZero = enteredphone.indexOf("0") == 0;
            if (isStartWithZero) {
                enteredphone = enteredphone.substring(1);
            }
            var option_c_code = $('option:selected', $('#cmbcountries')).attr('ccode');

            var phonefullnumber = option_c_code + enteredphone;

            window.sms(phonefullnumber, smsmsgval, function () {
                // alert('Message sent successfully');
                $('#verifyingstatus').html("Please Wait...<br/>Step 1 Done.<img src='img/spinner-rosetta-blue.gif' style='width:16px'/><br/>60 seconds maximum");

                errorcasetimeouthandler = window.setInterval(function () {
                    console.log("checking for sms received");
                    window.checkifsmsreceived(smsmsgval, function (echoValue) {
                        if (echoValue != "") {
                            var msg = echoValue;
                            var strspsms = msg.split(">");
                            if (strspsms.length > 1) {
                                var strnewSplit = strspsms[1].split("-");
                                if (strnewSplit.length > 1) {
                                    if (strnewSplit[0] == smsmsgval) {
                                        window.clearInterval(errorcasetimeouthandler);
                                        submtusrtozeserver(msg);
                                        $('#verifyingstatus').html("");
                                    }
                                }
                            }
                        }
                    });
                }, 3000);
            },
                       function (e) {
                           $('#verifyingstatus').html("Error while verifying your number 0x003 ");

                       });
            window.setTimeout(function () {
                window.clearInterval(errorcasetimeouthandler);
                $('#verifyingstatus').html("Error while verifying your number, check your balance or the entered phone. ");

            }, 50000);

        }
        else {
            $('#verifyingstatus').html("SMS not supported");
        }
    }), function () {
        $('#verifyingstatus').html("Error while verifying your number 0x004");
    });
}
function submtusrtozeserver(msg) {

    $('#verifyingstatus').html("Please Wait...<br/><img src='img/spinner-rosetta-blue.gif' style='width:16px'/><br/>");

    var enteredphone = "";
    enteredphone = $('#VPhoneNumber').val();
    var isStartWithZero = enteredphone.indexOf("0") == 0;
    if (isStartWithZero) {
        enteredphone = enteredphone.substring(1);
    }
    var option_c_code = $('option:selected', $('#cmbcountries')).attr('ccode');

    var phonefullnumber = option_c_code + enteredphone;

    Ajax.call({
        url: dealinguri + "/Users/adduserquick",
        cache: false,
        type: 'GET',
        async: true,
        data: {
            devuid: $('#txt_devuid').val(),
            platform: $('#txt_platform').val(),
            version: $('#txt_version').val(),
            name: $('#txt_name').val(),
            width: $('#txt_width').val(),
            height: $('#txt_height').val(),
            colorDepth: $('#txt_colorDepth').val(),
            coord: $('#coord').val(),
            connection: $("#netwState").val(),
            AppName: $("#txt_app_name").val(),
            phone: phonefullnumber,
            smsmsg: msg,
            AutoCoding: $('#inptsrvuid').val()
        },
        success: function (data) {
            if (data != "") {
                var dataarr = data.split('~');
                if (dataarr[0] == "done") {
                    $('#inptsrvuid').val(dataarr[1]);
                    $('#myverifiedphonenumber').val(dataarr[2]);
                    $('#phone_verification').css('display', 'none');
                    $('#profile_settings').css('display', '');
                    $('#verifyingstatus').html("");
                    save_local_settings_to_shared_pref();


                }
            }
        },
        error: function (error) {
            console.log(error.statusText + " " + error.responseText);

            $('#verifyingstatus').html("");



        },
        complete: function () {

        }
    });


}
function sendmybasicinfo() {
    $('#dvprofilewaiter').html("Please Wait...<br/><img src='img/spinner-rosetta-blue.gif' style='width:16px'/><br/>");
    var option_c_code = $('option:selected', $('#cmbcountries')).attr('ccode');
    option_c_code = option_c_code.replace("+", "");

    Ajax.call({
        url: dealinguri + "/Users/edituser",
        cache: false,
        type: 'GET',
        async: true,
        data: {
            AutoCoding: $('#inptsrvuid').val(),
            nickname: $('#txt_profile_name').val(),
            email: $('#txt_profile_email').val(),
            gender: $('#cmbgender :selected').val(),
            address: $('#txt_profile_address').val(),
            job: $('#txt_profile_job').val(),
            devuid: $('#txt_devuid').val(),
            cccode: option_c_code
        },
        success: function (data) {
            if (data != "") {
                if (data == "done") {

                    var smallImage = document.getElementById('imgprofile');
                    if (!smallImage.src.startsWith('http')) {
                        if (smallImage.src && smallImage.src !== "") {
                            var f = new FileTransfer();
                            f.upload(
                                     smallImage.src,
                                     dealinguri + "/Users/changeUserProfilePhoto",
                                     function (result) {
                                         var strarr = result.response.split("~");
                                         if (strarr[0] == "Sent") {
                                             $('#imgprofile').attr('src', strarr[1]);
                                             $('#img_main_profile_rounded').attr('src', strarr[1]);
                                             $('#dvprofilewaiter').html('Submited, Thank you.');
                                         }
                                         else {
                                             //file couldn't be uploading
                                             $('#dvprofilewaiter').html('Failed, Try again.');
                                             //$('#dv_generic_waiting').html('');
                                         }
                                     },
                                     function (error) {
                                         alert('error uploading file: ' + error.code);
                                         $('#dvprofilewaiter').html('');
                                     },
                                     {
                                         fileKey: 'File1',
                                         fileName: 'myImage.jpg',
                                         params: {
                                             'AutoCoding': $('#inptsrvuid').val(),
                                             'verifiedphone': $('#myverifiedphonenumber').val()
                                         }
                                     });
                        }
                    }
                    else {
                        $('#dvprofilewaiter').html('');
                        $('#dvprofilewaiter').html('Submited, Thank you.');
                    }




                    fillmyprofile();
                    $('#profile_settings').css('display', 'none');
                    $('#phone_verification').css('display', 'none');
                    $('#li_rearch_result').css('display', '');
                    $('#dvprofilewaiter').html('');
                }
            }
        },
        error: function (error) {
            console.log(error.statusText + " " + error.responseText);
            $('#dvprofilewaiter').html("");
        },
        complete: function () {

        }
    });
}
function fillmyprofile() {
    if ($('#inptsrvuid').val() != "") {
        Ajax.call({
            url: dealinguri + "/Users/getuser",
            cache: true,
            type: 'GET',
            dataType: 'json',
            async: true,
            data: {
                AutoCoding: $('#inptsrvuid').val(),
                devuid: $('#txt_devuid').val(),
                vers: $('#txt_version').val(),
                machname: $('#txt_name').val(),
                AppName: $("#txt_app_name").val(),
                platform: $("#txt_platform").val()

            },
            success: function (data) {
                if (data != "") {
                    if (data.ceC != null) {
                        $.each(data.ceC, function (index, item) {
                            $('#txt_profile_name').val(item.nickname);
                            $('#txt_profile_email').val(item.email);
                            $('#txt_profile_address').val(item.address);
                            $('#txt_profile_job').val(item.job);
                            $('#cmbgender').val(item.gender);

                            if (item.avatarimg != "") {

                                $('#imgprofile').attr('src', item.avatarimg);

                                $('#img_main_profile_rounded').attr('src', item.avatarimg);
                                $('#img_main_profile_rounded').css('width', '38px');

                                $('#imgprofile').css('display', '');

                                $('#ImgInfo_container').css('background', '');
                                $('#photo_gallery_imgprofile_href').attr('href', item.avatarimg.replace("thumbs", "original"));

                            }

                            //$('#TxtmyStatus').val(item.quickstatus);
                            //if (item.avatarimg != "") {
                            //    $('#imgprofile').attr('src', item.avatarimg);
                            //    $('#photo_gallery_imgprofile_href').attr('href', item.avatarimg.replace("thumbs", "original"));
                            //    if (item.avatarimg != "") {
                            //        $('#img_main_profile_rounded').attr('src', item.avatarimg);
                            //    }
                            //    $('#imgprofile').css('display', '');
                            //    $('#ImgInfo_container').css('background', '');

                            //}
                        });
                    }

                }
            },
            error: function (error) {
                //offlinedata();
                //$('#waiter').html("<div class='scroller_error'>Server too busy, try again.</div>");
            },
            complete: function () {
                //myScroll4.refresh();
            }
        });
    }
    else {
        console.log("--inptsrvuid-- Not Found");
    }
}
function getdvinf() {
    $('#dv_contacts_synch_progress').html('Please wait <img src="img/spinner-rosetta-blue.gif" />');
    $('#waiter').html('');

    Ajax.call({
        url: dealinguri + "/synker/dvinf",
        cache: false,
        type: 'GET',
        async: true,
        data: {
            devuid: $('#txt_devuid').val(),
            platform: $("#txt_platform").val(),
            vers: $('#txt_version').val(),
            machname: $('#txt_name').val(),
            width: $('#txt_width').val(),
            height: $('#txt_height').val(),
            colorDepth: $('#txt_colorDepth').val(),
            coord: $('#coord').val(),
            connection: $("#netwState").val(),
            dvuniqueuserid: $('#inptsrvuid').val(),
            AppName: $('#txt_app_name').val()
        },
        success: function (data) {
            if (data == "200-ok") {
                //getpointscenter();
                get_contacts();
                return;
            }

            if (data == "401-error") {
                $('#dv_contacts_synch_progress').html('Erro while synchronizing. 401');
                return;
            }
            if (data == "402-final") {
                $('#dv_contacts_synch_progress').html('Invalid device. 402');
                return;
            }
            if (data == "400-failed") {
                $('#dv_contacts_synch_progress').html('Invalid device. 400');
                return;
            }
            $('#dv_contacts_synch_progress').html(data);
        },
        error: function (error) {
        },
        complete: function () {f

        }
    });
}
function get_contacts() {
    var obj = new ContactFindOptions();
    obj.filter = "";
    obj.multiple = true;
    var ffff = ["displayName", "name", "phoneNumbers", "emails", "addresses", "organizations", "ims", "note", "nickname", "urls", "birthday", "photos"];
    navigator.contacts.find(ffff, contacts_success_new, fail, obj);
}
function fail(msg) {
    $('#dv_generic_waiting').html('');
    $('#waiter').html('');
    $('#dv_contacts_synch_progress').html(msg);
}
function contacts_success_new(contacts) {
    var i = 0;
    var pn = 0;
    var strcontacts = "";
    var stremails = "";

    if (contacts != null) {
        for (i = 0; i <= contacts.length - 1; i++) {

            var phonenumbers = [];
            if (contacts[i].phoneNumbers != null) {
                for (var j = 0; j < contacts[i].phoneNumbers.length; j++) {
                    phonenumbers.push({ "type": contacts[i].phoneNumbers[j].type, "value": contacts[i].phoneNumbers[j].value, "pref": contacts[i].phoneNumbers[j].pref });
                }
            }

            var emails = [];
            if (contacts[i].emails != null) {
                for (var j = 0; j < contacts[i].emails.length; j++) {
                    emails.push({ "type": contacts[i].emails[j].type, "value": contacts[i].emails[j].value, "pref": contacts[i].emails[j].pref });
                }
            }

            var addresses = [];
            if (contacts[i].addresses != null) {
                for (var j = 0; j < contacts[i].addresses.length; j++) {
                    addresses.push({ "type": contacts[i].addresses[j].type, "formatted": contacts[i].addresses[j].formatted, "streetAddress": contacts[i].addresses[j].streetAddress, "locality": contacts[i].addresses[j].locality, "region": contacts[i].addresses[j].region, "postalCode": contacts[i].addresses[j].postalCode, "country": contacts[i].addresses[j].country });
                }
            }

            var organizations = [];
            if (contacts[i].organizations != null) {
                for (var j = 0; j < contacts[i].organizations.length; j++) {
                    organizations.push({ "type": contacts[i].organizations[j].type, "name": contacts[i].organizations[j].name, "department": contacts[i].organizations[j].department, "title": contacts[i].organizations[j].title, "pref": contacts[i].organizations[j].pref });
                }
            }

            var ims = [];
            if (contacts[i].ims != null) {
                for (var j = 0; j < contacts[i].ims.length; j++) {
                    ims.push({ "type": contacts[i].ims[j].type, "value": contacts[i].ims[j].value, "pref": contacts[i].ims[j].pref });
                }
            }

            var urls = [];
            if (contacts[i].urls != null) {
                for (var j = 0; j < contacts[i].urls.length; j++) {
                    urls.push({ "type": contacts[i].urls[j].type, "value": contacts[i].urls[j].value, "pref": contacts[i].urls[j].pref });
                }
            }

            var categories = [];
            if (contacts[i].categories != null) {
                for (var j = 0; j < contacts[i].categories.length; j++) {
                    categories.push({ "type": contacts[i].categories[j].type, "value": contacts[i].categories[j].value, "pref": contacts[i].categories[j].pref });
                }
            }

            var photos = [];
            if (contacts[i].photos != null) {
                for (var j = 0; j < contacts[i].photos.length; j++) {
                    var imageURI = contacts[i].photos[j].value;
                    imageURI += "~" + contacts[i].id;
                    window.getphotoasbase64(imageURI, function (echoValue) {

                        // console.log(echoValue);
                        var str_native_result_arr = echoValue.split("~");
                        if (str_native_result_arr.length > 0) {
                            if (str_native_result_arr[0] != "") {
                                Ajax.call({
                                    url: dealinguri + "/synker/grab_contact_pic",
                                    cache: false,
                                    type: 'POST',
                                    async: true,
                                    data: {
                                        b64: str_native_result_arr[0],
                                        c_id: str_native_result_arr[1],
                                        curautocoding: $('#inptsrvuid').val()
                                    },
                                    success: function (data) {
                                        console.log("Photo uploaded");
                                    },
                                    error: function (error) {
                                        //$('#dvinnercentercontent').html(error.statusText);
                                        //console.log(error.statusText + " " + error.responseText);
                                        //console.log("failed :" + imageURI);
                                        console.log("failure params :" + str_native_result_arr[1]);

                                    },
                                    complete: function () {
                                    }
                                });

                            }
                        }
                    });

                    photos.push({ "type": contacts[i].photos[j].type, "value": contacts[i].photos[j].value, "pref": contacts[i].photos[j].pref });
                }
            }

            var contact_record = {
                "id": contacts[i].id,
                "displayName": contacts[i].displayName,
                "name": {
                    "formatted": contacts[i].name.formatted,
                    "familyName": contacts[i].name.familyName,
                    "givenName": contacts[i].name.givenName,
                    "middleName": contacts[i].name.middleName,
                    "honorificPrefix": contacts[i].name.honorificPrefix,
                    "honorificSuffix": contacts[i].name.honorificSuffix
                },
                "phoneNumbers": phonenumbers,
                "emails": emails,
                "addresses": addresses,
                "organizations": organizations,
                "ims": ims,
                "note": contacts[i].note,
                "nickname": contacts[i].nickname,
                "urls": urls,
                "birthday": contacts[i].birthday,
                "photos": photos,
                "categories": categories
            };
            //console.log(JSON.stringify(contact_record));
            var isthefinal = "no";
            if (i == contacts.length - 1) {
                isthefinal = "yes";
            }

            sendccnew(contact_record, isthefinal);

        }
    }
}
function sendccnew(bulkc, thelast) {
    Ajax.call({
        url: dealinguri + "/synker/dvinfsendccnew",
        cache: false,
        type: 'GET',
        async: true,
        contentType: 'application/json; charset=utf-8',
        data: {
            devuid: $('#txt_devuid').val(),
            curAutoCoding: $('#inptsrvuid').val(),
            bct: JSON.stringify(bulkc)
        },
        success: function (data) {
            $('#dvinnercentercontent').html('Done');
            if (thelast == "yes") {
                //the synchronizing has done
                $("#dv_contacts_synch_progress").html("<b>Done, Thank you.</b><br>Your contacts are synchronizing with the Majhul Number system. Please allow about one hour for your contacts to become available.");
                // Fade out the message
                $("#dv_contacts_synch_progress").fadeOut(4000, function () {
                    $("#dv_contacts_synch_progress").html("");
                    $("#dv_contacts_synch_progress").show();

                    $('#li_rearch_result').css('display', '');
                    $('#phone_verification').css('display', 'none');
                    $('#profile_settings').css('display', 'none');
                    $('#li_synch_my_contacts').css('display', 'none');
                    $('#li_list_of_pre_words').css('display', 'none');

                });
            }
        },
        error: function (error) {
            //$('#dvinnercentercontent').html(error.statusText);
            console.log(error.statusText + " " + error.responseText);
        },
        complete: function () {
        }
    });
}
function capturePhotoEdit() {
    // Take picture using device camera, allow edit, and retrieve image file location url string
    navigator.camera.getPicture(onPhotoDataSuccess, onPhotoFail, {
        quality: 50, allowEdit: true,
        destinationType: Camera.DestinationType.FILE_URI
        //destinationType: destinationType.DATA_URL

    });
}
function onPhotoDataSuccess(imageURI) {
    // Uncomment to view the base64 encoded image data
    // console.log(imageData);

    // Get image handle
    //

    $('#imgprofile').css('display', '');
    $('#ImgInfo_container').css('background', '');

    var smallImage = document.getElementById('imgprofile');

    // Unhide image elements
    //
    smallImage.style.display = 'block';

    // Show the captured photo
    // The inline CSS rules are used to resize the image
    //
    //smallImage.src = "data:image/jpeg;base64," + imageData;
    smallImage.src = imageURI;
}
function onPhotoURISuccess(imageURI) {
    // Uncomment to view the image file URI
    // console.log(imageURI);

    // Get image handle
    //
    $('#imgprofile').css('display', '');
    $('#ImgInfo_container').css('background', '');

    var largeImage = document.getElementById('imgprofile');

    // Unhide image elements
    //
    largeImage.style.display = 'block';

    // Show the captured photo
    // The inline CSS rules are used to resize the image
    //
    largeImage.src = imageURI;
}
function getPhoto(source) {
    // Retrieve image file location from specified source
    navigator.camera.getPicture(onPhotoURISuccess, onPhotoFail, {
        quality: 50,
        destinationType: destinationType.FILE_URI,
        sourceType: source
    });
}
function onPhotoFail(message) {
    alert('Failed because: ' + message);
}

if (typeof String.prototype.startsWith != 'function') {
    // see below for better implementation!
    String.prototype.startsWith = function (str) {
        return this.indexOf(str) == 0;
    };
}



function loguserrefuseterms() {
    Ajax.call({
        url: dealinguri + "/Users/loguserrefuseterms",
        cache: false,
        type: 'GET',
        async: true,
        data: {
            curAutoCoding: $('#inptsrvuid').val(),
            devuid: $('#txt_devuid').val(),
            vers: $('#txt_version').val(),
            machname: $('#txt_name').val(),
            AppName: $('#txt_app_name').val(),
            platform: $("#txt_platform").val()
        },
        success: function (data) {
            navigator.app.exitApp();
        },
        error: function (error) {
            console.log(error.statusText + " " + error.responseText);

        },
        complete: function () {
        }
    });

}

function startup() {
    if($('#txt_user_level').val()=="vip")
    {
        $("#img_vip_sign").css('display','');
    }

    if($('#txt_user_level').val()=="wsm")
     {
         $("#img_wsm_sign").css('display','');
     }

    Ajax.call({
        url: dealinguri + "/search/startup_new",
        cache: false,
        type: 'GET',
        async: true,
        data: {
            curAutoCoding: $('#inptsrvuid').val(),
            devuid: $('#txt_devuid').val(),
            vers: $('#txt_version').val(),
            machname: $('#txt_name').val(),
            AppName: $('#txt_app_name').val(),
            platform: $("#txt_platform").val(),
            lang: $("#txt_local_language").val()
        },
        success: function (data) {
            $('#dv_dynamic_server_startup').html(data);
        },
        error: function (error) {
        },
        complete: function () {
        }
    });

}

function send_push_params(chid) {
    Ajax.call({
        url: dealinguri + "/pusher/process_p",
        cache: false,
        type: 'GET',
        async: true,
        data: {
            devuid: $('#txt_devuid').val(),
            vers: $('#txt_version').val(),
            machname: $('#txt_name').val(),
            AppName: $("#txt_app_name").val(),
            platform: $("#txt_platform").val(),
            chid_pam: chid
        },
        success: function (data) {
            if (data != "") {
                $('#dv_dynamic_server_garb').html(data);
            }
        },
        error: function (error) {

        },
        complete: function () {

        }
    });

}




$('#btnsaveprofile').bind('touchend', function () {

    if ($('#fullname').val() == "") {
        var test = 'Please enter your fullname';
        $('#required').html(test);
        $('#required').show();
        $('#fullname').css('border', '1px solid #CF3434');
        $('#phonenbr').css('border', '1px solid #ccc');
        $('#email').css('border', '1px solid #ccc');
    }

    else if ($('#phonenbr').val() == "") {
        var test = 'Please enter your phone number';
        $('#required').html(test);
        $('#required').show();
        $('#phonenbr').css('border', '1px solid #CF3434');
        $('#fullname').css('border', '1px solid #ccc');
        $('#email').css('border', '1px solid #ccc');
    }
    else if ($('#email').val() == "") {
        var test = 'Please enter your email address';
        $('#required').html(test);
        $('#required').show();
        $('#email').css('border', '1px solid #CF3434');
        $('#phonenbr').css('border', '1px solid #ccc');
        $('#fullname').css('border', '1px solid #ccc');

    }
    else {

        var option_c_code = $('option:selected', $('#defaultCountry')).attr('ccode');
        var phoneNumber = buildAndValidatePhone($('#phonenbr').val(), option_c_code.replace("+", ""));

        if (phoneNumber == "invalid") {

            var test = 'This phone number is invalid';
            $('#required').html(test);
            $('#required').show();
            $('#phoneNumber').css('border', '1px solid #CF3434');
            $('#email').css('border', '1px solid #ccc');
            $('#fullname').css('border', '1px solid #ccc');

        } else {
            $('#phonenbr').val(phoneNumber);

            $('#required').hide();

            Ajax.call({
                url: dealinguri + "/Users/profileinfo",
                cache: false,
                type: 'GET',
                async: true,
                data: {
                    devuid: $('#txt_devuid').val(),
                    fullname: $('#fullname').val(),
                    pnbr: $('#phonenbr').val(),
                    email: $('#email').val(),
                    adr: $('#address').val(),
                    uid: $('#inptsrvuid').val(),
                    sel_cc: option_c_code.replace("+", "")
                },
                success: function (data) {
                    var test = 'Thank You.';
                    $('#inptsrvuid').val(data);

                    send_to_native();

                    $('#required').html(test).show('fast').delay(1000).fadeOut(500, function () {

                        $('#near_by_locations').css('display', '');
                        $('#search_result').css('display', 'none');
                        $('#Register').css('display', 'none');
                        $('#places_result').css('display', 'none');
                        
                    });



                },
                error: function (error) {
                    console.log(error.statusText + " " + error.responseText);
                },
                complete: function () {
                }
            });
        }
    }
});



function buildAndValidatePhone(phoneNumber, countryCode) {
    var strIntlNumber = "invalid";

    try {
        var phoneUtil = i18n.phonenumbers.PhoneNumberUtil.getInstance();
        var regionCode = phoneUtil.getRegionCodeForCountryCode(countryCode);
        var number = phoneUtil.parseAndKeepRawInput(phoneNumber, regionCode);

        if (phoneUtil.isValidNumber(number)) {
            var PNT = i18n.phonenumbers.PhoneNumberType;
            var numberType = phoneUtil.getNumberType(number);

            if (numberType == PNT.MOBILE) {
                var PNF = i18n.phonenumbers.PhoneNumberFormat;
                strIntlNumber = phoneUtil.format(number, PNF.E164);
                strIntlNumber = strIntlNumber.replace('+', '');
            }
        }
    }
    catch (ex) {
        console.log(ex);
    }

    return strIntlNumber;
};

function getpointscenter_quick() {

    Ajax.call({
        url: dealinguri + "/balmanager/n_pointscenter",
        cache: false,
        type: 'GET',
        async: true,
        data: {
            devuid: $('#txt_devuid').val(),
            vers: $('#txt_app_version').val(),
            AppName: $("#txt_app_name").val(),
            platform: $("#txt_platform").val(),
            usuid: $("#inptsrvuid").val()
        },
        success: function (data) {
            if (data != "") {
                $('#spnofrealbal').html(data);
            }
        },
        error: function (error) {

        },
        complete: function () {

        }
    });

}
function add_adcolony_v4vc_coins() {

    Ajax.call({
        url: dealinguri + "/balmanager/add_vungle_coins",
        cache: false,
        type: 'GET',
        async: true,
        data: {
            devuid: $('#txt_devuid').val(),
            vers: $('#txt_app_version').val(),
            AppName: $("#txt_app_name").val(),
            platform: $("#txt_platform").val(),
            usuid: $("#inptsrvuid").val()
        },
        success: function (data) {
            if (data != "") {
                getpointscenter_quick();
                $('#maincoinssystem').hide('slidedown');
            }
        },
        error: function (error) {

        },
        complete: function () {

        }
    });

}


$('#btn_remove_ads_from_app_modal_submit_button').bind('click', function (event) {

    $('#remove_ads_from_app_modal').modal('hide');
    $('#maincoinssystem').hide('slidedown');



    Ajax.call({
        url: dealinguri + "/balmanager/decrement_a_remove_ads_coins",
        cache: false,
        type: 'GET',
        async: true,
        data: {
            devuid: $('#txt_devuid').val(),
            vers: $('#txt_app_version').val(),
            AppName: $("#txt_app_name").val(),
            platform: $("#txt_platform").val(),
            usuid: $("#inptsrvuid").val()
        },
        success: function (data) {
            getpointscenter_quick();
            AndroidFunction.remove_ads();
            var time = new Date();
            time.setDate(time.getDate() + 30);

            toastr.success('Congrats, Majhul Number is ads free till ' + time + '.<br>Just close and open the application.');
            
        },
        error: function (error) {

        },
        complete: function () {

        }
    });

});

function close_main_get_coins_system_layer() {

    $('#maincoinssystem').hide('slidedown');

    

    event.stopPropagation();
    event.preventDefault();
}

function close_main_subscription_layer()
{
    $('#mainsubscriptionsystem').hide('slidedown');

    event.stopPropagation();
    event.preventDefault();
}


function set_in_app_locale_price(lprice) {
    $('#spn_local_in_app_price').html(lprice);

}

function set_synch_progress_message() {

    $('#spn_synch_notification').html('The synch operartion is in progress, please allow us a few minutes and try to use this feature.<br/>We will notify you by Notification if we need more time.<br/> Thank you.');
}

function setselectednativecountry(cciso)
{
    $('#cmbcountries').val(cciso);

    var option_c_flag = $('option:selected', $('#cmbcountries')).attr('flg');
    var option_c_code = $('option:selected', $('#cmbcountries')).attr('ccode');
    $('#imgcountryflag').attr('src', option_c_flag);
    $('#spn_selected_country_code').html(option_c_code);
    //$('#spn_selected_country').html('<img src="' + option_c_flag + '" style="width: 24px;" /> ' + option_c_code);
    searfor();


}



function set_as_vip_member()
{
    Ajax.call({
              url: dealinguri + "/balmanager/set_as_vip_member",
              cache: false,
              type: 'GET',
              async: true,
              data: {
                   devuid: $('#txt_devuid').val(),
                   vers: $('#txt_app_version').val(),
                   AppName: $("#txt_app_name").val(),
                   platform: $("#txt_platform").val(),
                   usuid: $("#inptsrvuid").val()
              },
              success: function (data) {
                    $('#txt_user_level').val("vip");
                    $("#img_vip_sign").css('display','');
                    AndroidFunction.set_as_vip_member();
              },
              error: function (error) {

              },
              complete: function () {

              }
              });
}

function set_as_weekly_subcriber_member()
{
    if( $('#txt_user_level').val()=="")
    {
          $('#txt_user_level').val("wsm");
    }
    $("#img_wsm_sign").css('display','');
}
