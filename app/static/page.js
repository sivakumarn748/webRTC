var ul = document.querySelector("ul");

var iceInput = document.querySelector("#ice");
var connect = document.querySelector("#connect");

var message = document.querySelector("#message");
var send = document.querySelector("#send");

var vdo = document.querySelector("#vdo");
vdo.style.borderColor = "red";
vdo.style.borderWidth = "10px";

var addmsg = (msg) => ul.innerHTML = `<li>${msg}</li>` + ul.innerHTML;

var lc = new RTCPeerConnection({
    iceServers: [
        {
          urls: "stun:stun.relay.metered.ca:80",
        },
        {
          urls: "turn:global.relay.metered.ca:80",
          username: "ce73328b9e0a9142a9f254d8",
          credential: "MvkxqvW8pNLnkPJn",
        },
        {
          urls: "turn:global.relay.metered.ca:443",
          username: "ce73328b9e0a9142a9f254d8",
          credential: "MvkxqvW8pNLnkPJn",
        },
    ],
});

const dc = lc.createDataChannel("channel");

dc.onmessage = e => addmsg("message : " + e.data);
dc.onopen = e => addmsg("<b>Local Data channel conn opened.</b>");

lc.onicecandidate = e => addmsg("New Ice Cdt : " + JSON.stringify(lc.localDescription));

lc.createOffer().then(o => lc.setLocalDescription(o)).then(a => addmsg("Local Description set sucessfully."));

lc.ondatachannel = e => {
    lc.dc = e.channel;
    lc.dc.onopen = e => addmsg("<b>Remote Data channel conn opened.</b>")
    lc.dc.onmessage = e => alert("Message : " +  e.data);
}

connect.addEventListener('click', function(){
    var offer = JSON.parse(iceInput.value);
    lc.setRemoteDescription(offer).then(a => addmsg("<b>Offer Set</b>"));
    lc.createAnswer().then(a => lc.setLocalDescription(a)).then(o => addmsg("Offer Created"));
    navigator.mediaDevices.getUserMedia(constraints={video:true}).then(stream=>lc.addTrack(stream)).catch(error=>alert(error));
});

send.addEventListener('click', function(){
    lc.dc.send(message.value);
});

