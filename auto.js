'use strict';

var mcf = require('minecraft-protocol-forge');
var ping = require('minecraft-protocol').ping;
var assert = require('assert');

function createClientAuto(options) {
  assert.ok(options, 'options is required');
  var client = mcf.createClient(options); // try to use Forge, it is safe even on vanilla

  ping(options, function(err, response) {
    if (err) throw err;
    console.log('ping response',response);
    // TODO: could also use ping pre-connect to save description, type, negotiate protocol etc.
    //  ^ see https://github.com/PrismarineJS/node-minecraft-protocol/issues/327

    if (response.modinfo) {
      if (response.modinfo.type === 'FML') {
        // Use the list of Forge mods from the server ping, so client will match server
        var forgeMods = response.modinfo.modList;
        console.log('Using forgeMods:',forgeMods);
        client.forgeMods = forgeMods; // for fmlHandshakeStep TODO: refactor
      }
    }
  });

  return client;
}

module.exports = {
  createClient: createClientAuto
};
