const markdown = require('markdown-it')({
    breaks: true,
    html: true,
    linkify: true
});

const slug = require('slug');

import Container from '../../../../components/container';
import Header from '../../../../components/header';
import Link from 'next/link';
import PageName from '../../../../components/page-name';

const PAGE_TITLE = 'Letter Archives';

export default function GodLetter(props) {
    const { letter } = props;
    const letterTitle = `Letters #${letter.id} - ${letter.title}`;
    const pageTitle = `${letterTitle} - ${PAGE_TITLE}`;
    const letterHTML = { __html: markdown.render(letter.body) };

    return (
        <div>
            <Header pageName={pageTitle} />
            <Container>
                <PageName pageName={letterTitle}>
                    <Link href="/library/letters">
                        <a className="rsc-link rsc-small-block rsc-small-spaced">
                            Archive Index
                        </a>
                    </Link>
                </PageName>
                <div className="rsc-row">
                    <div className="rsc-col rsc-col-75">
                        <div
                            className="rsc-box rsc-article-box"
                            dangerouslySetInnerHTML={letterHTML}
                        />
                    </div>
                </div>
            </Container>
        </div>
    );
}

export async function getServerSideProps({ query }) {
    if (!query.letter || query.letter.length !== 2) {
        return { notFound: true };
    }

    const id = !Number.isNaN(+query.letter[1])
        ? parseInt(query.letter[1], 10)
        : undefined;

    if (typeof id !== 'number') {
        return { notFound: true };
    }

    const response = await fetch(`${process.env.url}api/god-letters?id=${id}`);

    if (response.ok) {
        const json = await response.json();

        if (!json) {
            return { notFound: true };
        }

        const letter = json.letters;

        if (!letter) {
            return { notFound: true };
        }

        const urlSlug = query.letter[0];
        const letterSlug = slug(letter.title);

        if (letterSlug !== urlSlug) {
            return {
                redirect: {
                    destination: `/library/letters/letter/${letterSlug}/${id}`,
                    permanent: true
                }
            };
        }

        return { props: { letter } };
    }

    return { notFound: true };
}
