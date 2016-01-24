'use strict';

var mc = require('./');
var assert = require('assert');

if(process.argv.length < 4 || process.argv.length > 6) {
  console.log("Usage : node echo.js <host> <port> [<name>] [<password>]");
  process.exit(1);
}

var host = process.argv[2];
var port = parseInt(process.argv[3]);
var username =  process.argv[4] ? process.argv[4] : "echo";
var password = process.argv[5];

mc.createClientAsync({host, port, username, password}, function(err, client) {
  if (err) {
    console.log('failed to create client', err);
    throw err;
  }

  client.on('connect', function() {
    console.info('connected');
  });
  client.on('disconnect', function(packet) {
    console.log('disconnected: '+ packet.reason);
  });
  client.on('end', function(err) {
    console.log('Connection lost');
  });
  client.on('chat', function(packet) {
    console.log('received chat',packet);
  });

  client.on('forgeMods', function(mods) {
    console.log('Received forgeMods event:',mods);
  });
});
