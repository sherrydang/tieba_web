var pc;
var toClientID;
var carMap = new Map();
var config = {
    peerConnectionConfig: {
        iceServers: [
            {url: "stun:stun.ideasip.com"},
            {
                url: "turn:turn.bistri.com:80",
                credential: 'homeo',
                username: 'homeo'
            },
            {
                url: 'turn:turn.anyfirewall.com:443?transport=tcp',
                credential: 'webrtc',
                username: 'webrtc'
            }
        ]
    },
    peerConnectionConstraints: {
        optional: [
            {"DtlsSrtpKeyAgreement": (webrtcDetectedBrowser === 'firefox')}
        ]
    },
    mediaConstraints: {
        'mandatory': {
            'OfferToReceiveAudio': true,
            'OfferToReceiveVideo': true
        }
    }
}

var onMessageArrived = function (message) {
    if (message.destinationName == 'ptpMessage') {
        var data = new String(message.payloadString);
        var json = JSON.parse(data);
        if (json.type == 'offer') {
            answer(json.FROM, json.payload);
        } else if (json.type == 'candidate') {
            if (pc.remoteDescription) {
                pc.addIceCandidate(new RTCIceCandidate({
                    sdpMLineIndex: json.payload.label,
                    sdpMid: json.payload.id,
                    candidate: json.payload.candidate
                }));
            }
        } else if (json.type == 'init') {
            if (json.echo == 1) {
                send(json.FROM, json.action, json.conversation, json.echo, json.type, null);
                if (json.conversation == 1) {
                    sendOfferFn(json.FROM);
                }
            } else if (json.echo == 0) {
                if (json.conversation != 0) {
                    driverCall(json.FROM);
                    carMap.set(json.FROM, json);
                }
            }
        } else if (json.type == 'answer') {
            pc.setRemoteDescription(new RTCSessionDescription(json.payload), function () {
            }, function (error) {
                console.log(error);
            });
            console.log(4);
        } else if (json.type == 'close') {
            onClose();
            carMap.delete(json.FROM);
            Messenger().hideAll();
        }
    }
}
/*司机通话请求*/
function driverCall(from) {
    var msg = Messenger().post({
        message: from + "请求语音通话...",
        hideAfter: 3600,
        actions: {
            retry: {
                label: '接听',
                action: function () {
                    talking(from)
                    return msg.cancel();
                }
            },
            cancel: {
                label: '拒绝',
                action: function () {
                    onClose();
                    return msg.cancel();
                }
            }
        }
    });
}

/*通话中*/
function talking(id) {
    var json = carMap.get(id);
    getUserMedia({video: false, audio: true}, function (stream) {
        pc.addStream(stream);
        send(json.FROM, json.action, json.conversation, 1, json.type, null);
        sendOfferFn(json.FROM);
        var msg = Messenger().post({
            message: "通话中",
            hideAfter: 3600,
            actions: {
                cancel: {
                    label: '关闭',
                    action: function () {
                        onClose();
                        return msg.cancel();
                    }
                }
            }
        });
    }, function (err) {
        console.log('Failed to get local stream', err);
    });
}

/**
 * 初始化 webSocket
 */
var supported = ("WebSocket" in window);
if (!supported) {
    var msg = "Your browser does not support Web Sockets. This example will not work properly.<br>";
    msg += "Please use a Web Browser with Web Sockets support (WebKit or Google Chrome).";
    console.error(msg);
} else {
    initConnect(onMessageArrived);
    initPeer();
}

function answer(clientID, payload) {
    pc.setRemoteDescription(new RTCSessionDescription(payload), function () {

    }, function (error) {
        console.log(error);
    });
    pc.createAnswer(
        function (sessionDescription) {
            pc.setLocalDescription(sessionDescription);
            send(clientID, null, null, null, "answer", sessionDescription);
        },
        function (error) {
            console.log(error);
        },
        config.mediaConstraints
    );
}
//发送offer和answer的函数，发送本地session描述
function sendOfferFn(clientID) {
    pc.createOffer(
        function (sessionDescription) {
            pc.setLocalDescription(sessionDescription);
            send(clientID, null, null, null, "offer", sessionDescription);
        },
        function (error) {
            console.log(error);
        },
        config.mediaConstraints
    );
}

/**
 * @param FROM //发送者
 * @param TO //接收者
 * @param action // vedio视频 audio音频 both
 * @param conversation //0单方  1双方
 * @param echo //0发送请求  1确认请求  2取消请求   3连接超时
 * @param type // offer  answer  candidate init
 * @param payload //sdp
 */
var send = function (TO, action, conversation, echo, type, payload) {
    var timestamp = Date.parse(new Date());
    var json = JSON.stringify({
        "FROM": clientId,
        "TO": TO,
        "action": action,
        "conversation": conversation,
        "echo": echo,
        "type": type,
        "payload": payload,
        "message_type": "webrtc",
        "sendtime": timestamp
    });
    console.log(json);
    message = new Messaging.Message(json);
    message.destinationName = "ptpMessage";
    client.send(message);
}

function onClose() {
    send(toClientID, null, null, null, "close", null);
    console.log("关闭");
    closePeer();
    initPeer();
}


function onIceCandidate(event) {
    console.log(event);
    if (event.candidate != null) {
        send(toClientID, null, null, null, "candidate", {
            label: event.candidate.sdpMLineIndex,
            id: event.candidate.sdpMid,
            candidate: event.candidate.candidate
        });
    } else {
        console.log("End of candidates.");
    }
}

function closePeer() {
    if (pc != null)
        pc.close();
    pc = null;
}

function initPeer() {
    pc = new RTCPeerConnection(config.peerConnectionConfig, config.peerConnectionConstraints);
    pc.onicecandidate = onIceCandidate;
    pc.onaddstream = function (event) {
        var element = document.getElementById('video');
        attachMediaStream(element, event.stream);
    };
    pc.onremovestream = function (event) {

    };
    pc.oniceconnectionstatechange = function (event) {
        switch (
            (  event.srcElement // Chrome
            || event.target   ) // Firefox
                .iceConnectionState) {
            case 'disconnected':
                // remoteVideosContainer.removeChild(peer.remoteVideoEl);
                break;
        }
    };
    return pc;
}