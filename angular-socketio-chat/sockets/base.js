var apiai = require('apiai');

var app2 = apiai("58e09ac9c9ee46e8abb5e160e90ebd2f");


module.exports = function (io) {
  'use strict';
  io.on('connection', function (socket) {
    socket.broadcast.emit('user connected');

    socket.on('message', function (from, msg) {

      console.log('recieved message from', from, 'msg', JSON.stringify(msg));

      console.log('broadcasting message');
      console.log('payload is', msg);
      io.sockets.emit('broadcast', {
        payload: msg,
        source: from
      });
      var request = app2.textRequest(msg, {
          sessionId: 'as12345649848'
      });

      request.on('response', function(response) {
          console.log(response);
          io.sockets.emit('broadcast', {
            payload: response['result']['fulfillment']['speech'],
            source: 'bot'

          });
      });

      request.on('error', function(error) {
          console.log(error);
      });

      request.end();
      console.log('broadcast complete');
    });
  });
};
