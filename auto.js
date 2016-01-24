'use strict';

var mc = require('minecraft-protocol-forge');
var ping = require('minecraft-protocol').ping;
var assert = require('assert');

function createClientAuto(options) {
  assert.ok(options, 'options is required');
  var client = mc.createClient(options);

  ping(options, function(err, response) {
    if (err) throw err;
    console.log('ping response',response);
    if (!response.modinfo || response.modinfo.type !== 'FML') {
      // TODO: handle non-FML servers
      throw new Error('not an FML server, aborting connection');
      // TODO: gracefully connect non-FML
      // TODO: could also use ping pre-connect to save description, type, negotiate protocol etc.
      //  ^ see https://github.com/PrismarineJS/node-minecraft-protocol/issues/327 
    }
    // Use the list of Forge mods from the server ping, so client will match server
    var forgeMods = response.modinfo.modList;
    console.log('Using forgeMods:',forgeMods);

    client.forgeMods = forgeMods; // for fmlHandshakeStep TODO: refactor
  });

  return client;
}

module.exports = {
  createClient: createClientAuto
};
