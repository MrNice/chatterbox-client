var app = {};

app.server = 'https://api.parse.com/1/classes/chatterbox?order=-createdAt';
app.messageStack = { storage: {}, messages: [] };
app.message = {
  username: '',
  text: '',
  roomname: ''
};
app.chatrooms = {};

app.messageStack.add = function(msg){
  key = msg.objectId;
  if (this.storage[key] === undefined){
    app.chatrooms.add(msg);
    this.messages.push(msg);

    this.storage[key] = true;
  }
};

app.chatrooms.add = function(msg){
  if(msg.roomname === undefined){
    throw 'OMFGERROR';
  } else {
    if(this[msg.roomname] !== undefined){
      this[msg.roomname].push(msg);
    } else {
      this[msg.roomname] = [msg];
      var $str = $('<li></li>');
      var saltedName = '123' + msg.roomname;
      $str.text(msg.roomname);
      $str.attr("id", saltedName);
      $('#roomlist').append($str);
      $('#' + saltedName).click(function(event) {
        console.log('Chatroom changed');
        $('.messages').empty();
        app.displayMessages(app.chatrooms[saltedName.substr(3)]);
      });
    }
  }
};

app.init = function(parameters) {
  app.username = QueryString.username;
  this.fetch();
  setInterval(app.fetch, 3000);
};

app.send = function(messageObject) {
  if(messageObject.text === '') {
    throw "No Message Error";
  }
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
      data = data.results;
      _(data.results).each(function(msg){
       this.messageStack.add(msg); 
      }, this);
      app.displayMessages(data);
    },
    error: function (data) {
      // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to receive message');
    }
  });
};

app.displayMessages = function(messageList){
  //Takes an array of messages, and puts them onto the screen
  _(messageList).each(function(msg){
    var $str = $('<li></li>');
    $str.text(msg.username + ": " + msg.text);
    $('.messages').prepend($str);
  }, this);
};

// returns the message object
app.createMessage = function(){
  var msg = Object.create(app.message);
  msg.username = app.username;
  msg.text = $('.message').val();
  msg.roomname = 'Default';
  $('.message').val('');
  return msg;
};

// start
$(document).ready(function() {
  $('.username').keyup(function(event){
    if (event.which === 13){
      app.username = $('.username').val();
      $('.username').val('');
    }
  });

  $('.message').keyup(function(event){
    if (event.which === 13){
      app.send( app.createMessage() );
    }
  });

  $('.send').click(function(){
    app.send( app.createMessage() );
  });

  app.init();
});