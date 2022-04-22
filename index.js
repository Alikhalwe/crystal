/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

var watchID = null;
var phone_checking_tmr = null;

var app = {
    // Application Constructor
    initialize: function () {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function () {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function () {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function (id) {
        
        if (device != null) {
          
           /* $('#txt_devuid').val(device.uuid);
            $('#txt_platform').val(device.platform);
            $("#txt_version").val(device.version);
            $("#txt_name").val(device.name);
            $("#txt_width").val(screen.width);
            $("#txt_height").val(screen.height);
            $("#txt_colorDepth").val(screen.colorDepth);
            fillparams();*/
            
        }

        console.log('Received Event: ' + id);
    }
};

function setnativecoords(p_native_lat, p_native_long) {
    $('#txt_lat').val(p_native_lat);
    $('#txt_lng').val(p_native_long);
    
}


