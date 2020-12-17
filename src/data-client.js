// communicate with https://github.com/2003scape/rsc-data-server

const JSONSocket = require('json-socket');
const config = require('../config');
const log = require('bole')('data-client');
const net = require('net');
const uid = require('rand-token').uid;

const TIMEOUT = 10000;

class DataClient {
    constructor() {
        this.connected = false;

        this.socket = new JSONSocket(new net.Socket());
        this.socket.on('error', (err) => log.error(err));
        this.socket.on('message', (message) => this.handleMessage(message));

        this.socket.on('close', (hadError) => {
            this.socket._socket.removeAllListeners('ready');

            this.connected = false;
            log.error(`data-client closed. hadError: ${hadError}`);
            log.info('reconnecting in 5 seconds...');

            setTimeout(async () => {
                try {
                    await this.init();
                } catch (e) {
                    // pass
                }
            }, 5000);
        });
    }

    connect() {
        return new Promise((resolve, reject) => {
            this.socket._socket.once('error', reject);

            this.socket._socket.once('ready', () => {
                this.socket._socket.removeListener('error', reject);
                resolve();
                this.connected = true;
                log.info('connected');
            });

            if (config.dataServerFile) {
                this.socket.connect(config.dataServerFile);
            } else {
                const [host, port] = config.dataServerTCP.split(':');
                this.socket.connect(+port, host);
            }
        });
    }

    async init() {
        await this.connect();
        await this.authenticate();
        await this.worldConnect();
    }

    end() {
        this.socket.end();
    }

    handleMessage(message) {
        log.debug('received message', message);

        switch (message.handler) {
        }
    }

    send(message) {
        if (!this.connected) {
            return;
        }

        const token = uid(64);
        message.token = token;

        log.debug('sending message', message);

        this.socket.sendMessage(message);
    }

    sendAndReceive(message) {
        if (!this.connected) {
            return;
        }

        const token = uid(64);
        message.token = token;

        log.debug('sending message', message);

        return new Promise((resolve) => {
            let onMessage, onError, messageTimeout;

            onMessage = (receivedMessage) => {
                if (receivedMessage.token !== token) {
                    return;
                }

                clearTimeout(messageTimeout);
                this.socket._socket.removeListener('message', onMessage);
                this.socket._socket.removeListener('error', onError);

                delete receivedMessage.token;
                receivedMessage.handler = message.handler;
                resolve(receivedMessage);
            };

            onError = () => {
                clearTimeout(messageTimeout);
                this.socket._socket.removeListener('message', onMessage);
                this.socket._socket.removeListener('error', onError);
            };

            this.socket.on('message', onMessage);
            this.socket.on('error', onError);

            messageTimeout = setTimeout(() => {
                this.socket._socket.removeListener('error', onError);
                this.socket._socket.removeListener('message', onMessage);
                log.error(
                    new Error(`timeout on response for ${message.handler}`)
                );
            }, TIMEOUT);

            this.socket.sendMessage(message);
        });
    }

    async authenticate() {
        const result = await this.sendAndReceive({
            handler: 'authenticate',
            password: config.dataServerPassword
        });

        if (!result.success) {
            throw new Error(result.error);
        }

        log.info('authenticated');
    }
}

module.exports = DataClient;
