var ul = document.querySelector("ul");

var IDInput = document.querySelector("#ice");
var connectBtn = document.querySelector("#connect");
var callBtn = document.querySelector("#call");

var message = document.querySelector("#message");
var sendBtn = document.querySelector("#send");

var vdo = document.querySelector("#vdo");

var addmsg = (msg) => ul.innerHTML = `<li>${msg}</li>` + ul.innerHTML;

iceServers = {
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
      urls: "turn:global.relay.metered.ca:80?transport=tcp",
      username: "ce73328b9e0a9142a9f254d8",
      credential: "MvkxqvW8pNLnkPJn",
    },
    {
      urls: "turn:global.relay.metered.ca:443",
      username: "ce73328b9e0a9142a9f254d8",
      credential: "MvkxqvW8pNLnkPJn",
    },
    {
      urls: "turns:global.relay.metered.ca:443?transport=tcp",
      username: "ce73328b9e0a9142a9f254d8",
      credential: "MvkxqvW8pNLnkPJn",
    },
  ]
};

var peer = new Peer();
var conn;



var Lstream;
navigator.mediaDevices.getUserMedia({video:true,audio:true}).then(stream=>Lstream=stream);

vdo.srcObject = Lstream;

peer.on('open', function(id){
  addmsg("My Id is : " + id);
});

connectBtn.onclick = (event) => {
  connect(IDInput.value);
};

callBtn.onclick = (event) => {
  addmsg("call btn")
  peer.call(IDInput.value, Lstream);
};

sendBtn.onclick = (event) => {
  conn.send(message.value);
}

function connect(id) {
  conn = peer.connect(id);
  // on open will be launch when you successfully connect to PeerServer
  conn.on('open', function(){
    // here you have conn.id
    conn.send('hi!');
  });
}

peer.on('connection', function(conn) {
  conn.on('data', function(data){
    // Will print 'hi!'
    addmsg(data);
  });
});

peer.on('call', (call)=>{
  addmsg("call received");
  call.answer(Lstream);
  call.on("stream", (Rstream)=>{
    vdo.srcObject = Rstream;
  })
});