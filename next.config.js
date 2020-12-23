module.exports = {
    env: {
        url: 'http://localhost:1338/'
    },
    async redirects() {
        return [
            {
                source: '/hiscores/skill',
                destination: '/hiscores/skill/overall',
                permanent: true
            }
        ];
    }
};
