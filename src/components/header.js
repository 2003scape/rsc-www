import Head from 'next/head';

const DESCRIPTION =
    'Runescape is a massive 3d multiplayer adventure, with monsters to kill, ' +
    'quests to complete, and treasure to win.';

export default function Header(props) {
    const title =
        (props.pageName ? `${props.pageName} - ` : '') +
        'RuneScape by Jagex Ltd';

    return (
        <div>
            <Head>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
                <meta name="description" content={DESCRIPTION} />
                <title>{title}</title>
            </Head>
        </div>
    );
}
