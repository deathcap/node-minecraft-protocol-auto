# minecraft-protocol-auto

Automatic protocol negotiation for [node-minecraft-protocol](https://github.com/PrismarineJS/node-minecraft-protocol) clients

Usage:

    var mc = require('minecraft-protocol-auto');

    mc.createClientAsync(options, function(err, client) {
        // do stuff with client
    });

`options` should include the host, port, and usual options for node-minecraft-protocol `createClient()`;
`client` is set to a created node-minecraft-protocol client object if successful. This
module attempts to automatically use the correct protocol, by first pinging the server
and enabling a matching protocol. Currently tested with:

* Minecraft 15w40b (protocol 76 - 1.9 snapshot in [minecraft-data](https://github.com/PrismarineJS/minecraft-data))
* Minecraft 1.8.9
* Minecraft Forge 1.8.9-11.15.0.1715 - automatically uses [node-minecraft-protocol-forge](https://github.com/deathcap/node-minecraft-protocol-forge) for `FML|HS` handshake

Other versions may work as they are added to node-minecraft-protocol.

## History

https://github.com/PrismarineJS/node-minecraft-protocol/issues/327

## License

MIT

