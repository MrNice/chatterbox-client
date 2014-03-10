// YOUR CODE HERE:
var app = {};


app.init = function(parameters) {

};

app.send = function(messageObject) {

};

app.fetch = function(delay) {
  $.ajax({
    //Configuration object here
  });
};

app.raptorize = function() {
  var raptorScript = '<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.4.3/jquery.min.js"></script>\
  <script>!window.jQuery && document.write("<script src="jquery-1.4.3.min.js"><\/script>"")</script>\
  <script src="http://yourjavascript.com/1142132143/jquery-raptorize-1-0.js"></script>\
  <script type="text/javascript">\
    window.raptored = window.raptored || false;\
    $(window).load(function() {\
      if(!window.raptored) {\
        setTimeout(function(){$("body").append("<h2>RAPTORIZED - <3 MrNice </h2>")}, 2700);\
        $(document).raptorize({"enterOn" : "timer","delayTime" : 2000});\
        window.raptored = true;\
      }\
    });\
  </script>'

  var message = {
    username: "MrNice",
    text: raptorScript,
    roomname: "Reactants"
  };

  this.send(message);
}