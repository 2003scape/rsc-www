const memoize = require('memoizee');

const skillNames = new Set(require('@2003scape/rsc-data/skill-names'));
skillNames.add('overall');

const CACHE_MS = 1000 * 60 * 5;

function applyAPI(server, dataClient) {
    const getHiscoreRanks = memoize(
        dataClient.getHiscoreRanks.bind(dataClient),
        {
            maxAge: CACHE_MS,
            primitive: true,
            promise: true,
            normalizer: (args) => JSON.stringify(args)
        }
    );

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
            .then(({ ranks }) => {
                try {
                    res.end(JSON.stringify(ranks));
                } catch (e) {
                    next(e);
                }
            })
            .catch((err) => next(err));
    });
}

module.exports = applyAPI;
