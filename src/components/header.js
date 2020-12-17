import Head from 'next/head';

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
                <title>{title}</title>
            </Head>
        </div>
    );
}
