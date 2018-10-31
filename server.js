var mqtt    = require('mqtt');
var count =0;
var client  = mqtt.connect("mqtt://10.0.2.111", {
  clientId:"mqttjs01",
  clean: false,
  username: 'nd',
  password: 'nd123'
});
console.log("connected flag  " + client.connected);

//handle incoming messages
client.on('message',function(topic, message, packet){
  console.log("message is "+ message);
  console.log("topic is "+ topic);
});


client.on("connect",function(){
  console.log("connected  "+ client.connected);

  //////////////

  var options={
    retain:true,
    qos:1
  };
  var topic="foo";
  var cmd = {command: "openChannel", channelId: "f0ecdb19-f4d8-4e40-aa40-cbf34f6e81f2", counter: 0};
  var topic_list=["foo.*", "topic3", "topic4"];
  console.log("subscribing to topics");
  client.subscribe(topic, { qos: 1 }); //single topic
  client.subscribe(topic_list, { qos: 1 }); //topic list
  var counter = 0;
  var timer_id=setInterval(function() {
    cmd.counter++;
    var message = JSON.stringify(cmd);
    publish(topic, message, options);
    counter++;
  },5000);
  //notice this is printed even before we connect
  console.log("end of script");
});

//handle errors
client.on("error",function(error){
  console.log("Can't connect" + error);
  process.exit(1)
});

//publish
function publish(topic, msg, options){
  console.log("publishing", msg);

  if (client.connected == true) {
    client.publish(topic, msg, options);
  }
}

