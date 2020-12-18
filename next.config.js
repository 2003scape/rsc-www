module.exports = {
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
