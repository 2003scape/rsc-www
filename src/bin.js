#!/usr/bin/env node

const DataClient = require('./data-client');
const applyAPI = require('./api');
const bodyParser = require('body-parser');
const bole = require('bole');
const cookieSession = require('cookie-session');
const csrf = require('csurf');
const express = require('express');
const fs = require('fs').promises;
const next = require('next');
const pkg = require('../package');
const yargs = require('yargs');

const log = bole('bin');

function formatIPAddress(ip) {
    if (ip === '::1') {
        return '127.0.0.1';
    }

    ip = ip.split(':');

    return ip[ip.length - 1];
}

const argv = yargs
    .scriptName('rsc-www')
    .alias('h', 'help')
    .option('c', {
        alias: 'config',
        type: 'string',
        describe: 'use a specific config.json file',
        default: './config.json'
    })
    .option('v', {
        alias: 'verbose',
        type: 'string',
        describe: 'the logging verbosity level',
        default: 'info',
        choices: ['debug', 'info', 'warn', 'error']
    })
    .version(pkg.version).argv;

bole.output({
    level: argv.verbose,
    stream: process.stdout
});

(async () => {
    let config;

    try {
        config = JSON.parse(await fs.readFile(argv.config));
    } catch (e) {
        process.exitCode = 1;
        log.error(e);
        return;
    }

    const dataClient = new DataClient();

    try {
        await dataClient.connect();
        await dataClient.authenticate();
    } catch (e) {
        process.exit(1);
        return;
    }

    const app = next({ dev: config.development });
    await app.prepare();

    const server = express();
    const handle = app.getRequestHandler();

    server.use(cookieSession({ name: 'session', secret: require('./secret') }));
    server.use(bodyParser.urlencoded({ extended: true }));
    server.use(csrf());

    server.use((_, res, next) => {
        res.setHeader('X-Content-Type-Options', 'nosniff');
        res.setHeader('X-Frame-Options', 'DENY');
        res.setHeader('X-XSS-Protection', '1');
        next();
    });

    server.post('/login', (req, res, next) => {
        const ip = formatIPAddress(
            req.headers['x-forwarded-for'] || req.connection.remoteAddress
        );

        if (!req.body.username || !req.body.password) {
            return next();
        }

        const username = String(req.body.username).trim().toLowerCase();

        dataClient
            .login(username, req.body.password, ip)
            .then(({ success, player }) => {
                if (success) {
                    const { id, rank } = player;

                    if (req.body.remember) {
                        req.sessionOptions.maxAge = 365 * 24 * 60 * 60 * 1000;
                    }

                    req.session.user = { username, id, rank };
                    res.redirect(req.body.redirect || '/');
                    return;
                }

                req.errorMessage = 'Invalid username or password';
                handle(req, res, next);
            })
            .catch((err) => log.error(err));
    });

    server.get('/logout', (req, res) => {
        delete req.session.user;
        res.redirect('/');
    });

    applyAPI(server, dataClient);

    server.all('*', handle);

    server.listen(config.port, (err) => {
        if (err) {
            log.error(err);
            process.exitCode = 1;
            return;
        }

        log.info(
            `listening for HTTP connections on http://localhost:${config.port}`
        );
    });
})();
