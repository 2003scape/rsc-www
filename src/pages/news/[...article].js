const markdown = require('markdown-it')({
    breaks: true,
    html: true,
    linkify: true
});

import Container from '../../components/container';
import Header from '../../components/header';
import Link from 'next/link';
import PageName from '../../components/page-name';
import slug from 'slug';

const PAGE_TITLE = 'Latest News';

function formateDate(date) {
    return date.toLocaleString('en-gb', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

export default function NewsArticle(props) {
    const pageTitle = `${props.article.title} - ${PAGE_TITLE}`;
    const articleHTML = { __html: markdown.render(props.article.body) };

    return (
        <div>
            <Header pageName={pageTitle} />
            <Container>
                <PageName pageName={PAGE_TITLE}>
                    <Link href="/news">
                        <a className="rsc-link rsc-small-block rsc-small-spaced">
                            All News
                        </a>
                    </Link>
                </PageName>
                <div className="rsc-row">
                    <div className="rsc-col rsc-col-100">
                        <main className="rsc-box rsc-article-box">
                            <h1>
                                <time>
                                    {formateDate(
                                        new Date(props.article.date * 1000)
                                    )}
                                </time>
                                &nbsp;-&nbsp;
                                {props.article.title}
                            </h1>
                            <div dangerouslySetInnerHTML={articleHTML} />
                            <div style={{ clear: 'both' }} />
                        </main>
                    </div>
                </div>
            </Container>
        </div>
    );
}

export async function getServerSideProps({ query }) {
    if (!query.article || query.article.length !== 2) {
        return { notFound: true };
    }

    const id = !Number.isNaN(+query.article[1])
        ? parseInt(query.article[1], 10)
        : undefined;

    if (typeof id !== 'number') {
        return { notFound: true };
    }

    const response = await fetch(`${process.env.url}api/news?id=${id}`);

    if (response.ok) {
        const json = await response.json();

        if (!json) {
            return { notFound: true };
        }

        const article = json.articles;

        if (!article) {
            return { notFound: true };
        }

        const urlSlug = query.article[0];
        const articleSlug = slug(article.title);

        if (articleSlug !== urlSlug) {
            return {
                redirect: {
                    destination: `/news/article/${articleSlug}/${id}`,
                    permanent: true
                }
            };
        }

        return { props: { article } };
    }

    return { notFound: true };
}
