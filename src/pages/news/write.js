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
    const { token, user } = useContext(SessionContext);

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
                        >
                            {Object.entries(CATEGORIES)
                                .filter(([id]) => id > 0)
                                .map(([id, { name }]) => (
                                    <option key={id} value={id - 1}>
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
                            defaultValue={new Date().toLocaleDateString(
                                'en-ca'
                            )}
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
                            style={{
                                height: '400px',
                                filter: 'invert(100%)'
                            }}
                            renderHTML={(text) => markdown.render(text)}
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
                            Latest News
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

export function getServerSideProps({ req, query }) {
    if (!req.session.user || req.session.user.rank !== 3) {
        return { notFound: true };
    }

    return { props: {} };
}
