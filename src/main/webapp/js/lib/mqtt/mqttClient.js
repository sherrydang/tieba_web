/**
 * Created by mac on 14/12/25.
 */


var mqttHost = 'www.geetion.com';
var mqttPort = '61614';
var clientId;
var topic = 'ptpMessage';
var exceptionTopic = 'exceptionTopic';
var taskTopic = 'task';
var client;
var method = new Array();

$.getJSON("/web/mqttId", function (result) {
    clientId = result.employee_no;
    var token = result.token;
    client = new Messaging.Client(mqttHost, Number(mqttPort), clientId);
    client.onConnect = onConnect;
    client.onMessageArrived = function (message) {
        var data = new String(message.payloadString);
        var json = JSON.parse(data);
        if (json != null && json.content == 'pushout') {
            window.location.href = '../web/logout';
            alert("你的账号在别的地方登录了");
        } else {
            for (var i = 0; i < method.length; i++) {
                method[i](message);
            }
        }
    };
    client.onConnectionLost = onConnectionLost;
    client.connect({password: token, onSuccess: onConnect, onFailure: onFailure, cleanSession: true});
});

function clientClose() {
    client.disconnect();
}

var createUUID = (function (uuidRegEx, uuidReplacer) {
    return function () {
        return "xxxxxxxxxxxx".replace(uuidRegEx, uuidReplacer).toUpperCase();
    };
})(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0,
        v = c == "x" ? r : (r & 3 | 8);
    return v.toString(16);
});

var initConnect = function (onMessageArrived) {
    method.push(onMessageArrived);
    return false;
};


// the client is notified when it is connected to the server.
var onConnect = function (frame) {
    debug1("connected to MQTT");
    client.subscribe(topic);
    client.subscribe(exceptionTopic);
    client.subscribe(taskTopic);
};

// this allows to display debug logs directly on the web page
var debug1 = function (str) {
    //$("#debug").append(document.createTextNode(str + "\n"));
    console.log(str);
};

function onFailure(failure) {
    debug1("failure");
    debug1(failure.errorMessage);
}

function onConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0) {
        debug1(client.clientId + ": " + responseObject.errorCode + "\n");
    }
}

