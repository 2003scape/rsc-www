const markdown = require('markdown-it')({
    breaks: true,
    html: true,
    linkify: true
});

import CATEGORIES from '../../categories';
import Container from '../../components/container';
import Header from '../../components/header';
import Link from 'next/link';
import PageName from '../../components/page-name';
import dynamic from 'next/dynamic';
import { SessionContext } from '../../contexts/session';
import { useContext, useState } from 'react';

import 'react-markdown-editor-lite/lib/index.css';

const MDEditor = dynamic(() => import('react-markdown-editor-lite'), {
    ssr: false
});

const PAGE_TITLE = 'Write Article';

export default function NewsWrite(props) {
    const { token } = useContext(SessionContext);

    const article = props.article || {};
    const title = article.title || '';
    const category = article.category || 0;
    const [body, setBody] = useState(article.body || '');

    const date = new Date(
        article.date ? article.date * 1000 : Date.now()
    ).toLocaleDateString('en-ca');

    const onSubmit = (event) => {
        setTimeout(() => {
            event.target.querySelector('input[type="submit"]').disabled = true;
            document.body.style.cursor = 'busy';
        }, 2);
    };

    const editForm = (
        <div className="rsc-form">
            <form action="/news/write" method="post" onSubmit={onSubmit}>
                <input type="hidden" name="_csrf" value={token} />
                <input type="hidden" name="id" value={article.id} />
                <div className="rsc-row">
                    <label
                        htmlFor="rsc-news-title"
                        className="rsc-col rsc-col-50 rsc-form-label"
                        style={{ textAlign: 'center' }}
                    >
                        Title:
                    </label>
                    <div className="rsc-col rsc-col-50">
                        <input
                            className="rsc-input"
                            name="title"
                            id="rsc-news-title"
                            type="text"
                            required={true}
                            defaultValue={title}
                        />
                    </div>
                </div>
                <div className="rsc-row">
                    <label
                        htmlFor="rsc-news-category"
                        className="rsc-col rsc-col-50 rsc-form-label"
                        style={{ textAlign: 'center' }}
                    >
                        Category:
                    </label>
                    <div className="rsc-col rsc-col-50">
                        <select
                            className="rsc-input"
                            id="rsc-news-category"
                            name="category"
                            defaultValue={category}
                        >
                            {Object.entries(CATEGORIES)
                                .filter(([id]) => id > 0)
                                .map(([id, { name }]) => (
                                    <option key={id} defaultValue={id - 1}>
                                        {name}
                                    </option>
                                ))}
                        </select>
                    </div>
                </div>
                <div className="rsc-row">
                    <label
                        htmlFor="rsc-news-date"
                        className="rsc-col rsc-col-50 rsc-form-label"
                        style={{ textAlign: 'center' }}
                    >
                        Date:
                    </label>
                    <div className="rsc-col rsc-col-50">
                        <input
                            className="rsc-input"
                            id="rsc-news-date"
                            defaultValue={date}
                            type="date"
                            name="date"
                        />
                    </div>
                </div>
                <br />
                <div className="rsc-row">
                    <div className="rsc-col rsc-col-100">
                        <MDEditor
                            name="body"
                            style={{ height: '400px' }}
                            renderHTML={(text) => markdown.render(text)}
                            onChange={({ text }) => setBody(text)}
                            config={{
                                htmlClass:
                                    'custom-html-style rsc-markdown-preview'
                            }}
                            value={body}
                        />
                    </div>
                </div>
                <br />
                <div className="rsc-row">
                    <div className="rsc-col rsc-col-100">
                        <input
                            className="rsc-input"
                            type="submit"
                            value="Post Article"
                        />
                    </div>
                </div>
            </form>
        </div>
    );

    return (
        <div>
            <Header pageName={`${PAGE_TITLE} - Latest News`} />
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
                        <div className="rsc-box">
                            {editForm}
                            <br />
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
}

export async function getServerSideProps({ req, query }) {
    if (!req.session.user || req.session.user.rank !== 3) {
        return { notFound: true };
    }

    const props = {};

    const id =
        query.id && !Number.isNaN(+query.id)
            ? Number.parseInt(query.id, 10)
            : undefined;

    if (id) {
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

            props.article = article;
        } else {
            return { notFound: true };
        }
    }

    return { props };
}
