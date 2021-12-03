import Head from 'next/head';

const DESCRIPTION =
    'rsc2003.com is a RuneScape classic 2003 private server. RSC is no longer upkept and we hope to keep a small spark of what was the greatest #mmorpg of all time alive.';

export default function Header(props) {
    const title =
        (props.pageName ? `${props.pageName} - ` : '') +
        'rsc2003.com';

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
