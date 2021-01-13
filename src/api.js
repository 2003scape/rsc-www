const memoize = require('memoizee');
const mime = require('mime');

const skillNames = new Set(require('@2003scape/rsc-data/skill-names'));
skillNames.add('overall');

const NEWS_KEYS = [
    'id',
    'page',
    'category'
    /*'terms',
    'before',
    'after'*/
];

const MEMOIZE_OPTIONS = {
    maxAge: 1000 * 60 * 5,
    promise: true,
    normalizer: (args) => JSON.stringify(args)
};

function applyAPI(server, dataClient) {
    const getHiscoreRanks = memoize(
        dataClient.getHiscoreRanks.bind(dataClient),
        MEMOIZE_OPTIONS
    );

    const getPlayerRanks = memoize(
        dataClient.getPlayerRanks.bind(dataClient),
        MEMOIZE_OPTIONS
    );

    const getNews = memoize(
        dataClient.getNews.bind(dataClient),
        MEMOIZE_OPTIONS
    );

    const getGodLetter = memoize(
        dataClient.getGodLetter.bind(dataClient),
        MEMOIZE_OPTIONS
    );

    // we want to save files forever
    const getFile = memoize(dataClient.getFile.bind(dataClient), {
        promise: true,
        primitive: true
    });

    server.get('/api/hiscores/skill/:skill', (req, res, next) => {
        const skill = req.params.skill.toLowerCase();

        if (!skill || !skillNames.has(skill)) {
            return next();
        }

        const page = req.query.page ? parseInt(req.query.page, 10) - 1 : 0;
        const rank = req.query.rank ? parseInt(req.query.rank, 10) : -1;

        if (Number.isNaN(page) || page < 0 || Number.isNaN(rank) || rank < -1) {
            return next();
        }

        res.setHeader('content-type', 'application/json');

        getHiscoreRanks(skill, rank, page)
            .then(({ ranks, pages }) => {
                // don't cache empty pages
                if (!ranks.length) {
                    getHiscoreRanks.delete(skill, rank, page);
                }

                try {
                    res.end(JSON.stringify({ ranks, pages }));
                } catch (e) {
                    next(e);
                }
            })
            .catch((err) => next(err));
    });

    server.get('/api/hiscores', (req, res, next) => {
        const username =
            typeof req.query.username === 'string'
                ? req.query.username.toLowerCase()
                : undefined;

        if (!username) {
            return next();
        }

        res.setHeader('content-type', 'application/json');

        getPlayerRanks(username)
            .then(({ ranks }) => {
                if (!ranks) {
                    getPlayerRanks.delete(username);
                }

                try {
                    res.end(JSON.stringify({ ranks }));
                } catch (e) {
                    next(e);
                }
            })
            .catch((err) => next(err));
    });

    server.get('/api/news', (req, res, next) => {
        const query = {};
        NEWS_KEYS.forEach((key) => (query[key] = req.query[key]));

        if (typeof query.id !== 'undefined') {
            query.id = Number(query.id);
        }

        if (query.terms) {
            query.terms = query.terms.slice(0, 140);
        }

        query.page = query.page ? parseInt(query.page, 10) - 1 : -1;

        query.category =
            typeof query.category !== 'undefined'
                ? parseInt(query.category, 10)
                : -1;

        res.setHeader('content-type', 'application/json');

        getNews(query)
            .then(({ articles, pages }) => {
                if (
                    !articles ||
                    (Array.isArray(articles) && !articles.length)
                ) {
                    getNews.delete(query);
                }

                try {
                    res.end(JSON.stringify({ articles, pages }));
                } catch (e) {
                    next(e);
                }
            })
            .catch((err) => next(err));
    });

    server.post('/news/write', (req, res, next) => {
        if (!req.session.user || req.session.user.rank !== 3) {
            return next();
        }

        dataClient
            .addNews({
                title: req.body.title || 'Untitled',
                body: req.body.body || '<no body>',
                date: Math.floor(new Date(req.body.date) / 1000),
                category: Number.parseInt(req.body.category) || 0
            })
            .then(({ success }) => {
                if (success) {
                    getNews.clear();
                    res.redirect('/news');
                } else {
                    next();
                }
            })
            .catch((e) => {
                next(e);
            });
    });

    server.get('/api/god-letters', (req, res, next) => {
        const id =
            req.query.id && !Number.isNaN(+req.query.id)
                ? parseInt(req.query.id, 10)
                : undefined;

        res.setHeader('content-type', 'application/json');

        getGodLetter(id)
            .then(({ letters }) => {
                if (
                    typeof id === 'number' &&
                    (!letters || (Array.isArray(letters) && !letters.length))
                ) {
                    getGodLetter.delete(id);
                }

                try {
                    res.end(JSON.stringify({ letters }));
                } catch (e) {
                    next(e);
                }
            })
            .catch((err) => next(err));
    });

    server.get('/images/:name', (req, res, next) => {
        const name = req.params.name;

        getFile(name)
            .then((file) => {
                if (!file || !file.file) {
                    getFile.delete(name);
                    return next();
                }

                file = file.file;

                res.setHeader('content-type', mime.lookup(name));
                res.end(Buffer.from(file, 'base64'));
            })
            .catch((err) => next(err));
    });

    server.get('/api/session', (req, res, next) => {
        res.setHeader('content-type', 'application/json');

        try {
            res.end(
                JSON.stringify({
                    user: req.session.user || null,
                    token: req.csrfToken()
                })
            );
        } catch (e) {
            next(e);
        }
    });
}

module.exports = applyAPI;
