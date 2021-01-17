import CATEGORIES from '../../categories';
import Container from '../../components/container';
import Header from '../../components/header';
import Link from 'next/link';
import PageName from '../../components/page-name';
import PaginationArrows from '../../components/pagination-arrows';
import formatDate from '../../format-date';
import slug from 'slug';
import { SessionContext } from '../../contexts/session';
import { useContext } from 'react';
import { useRouter } from 'next/router';

const PAGE_TITLE = 'Latest News';

const CATEGORY_IDS = Object.keys(CATEGORIES).map(Number).sort();

function CategoryLink(props) {
    const { colour, name } = CATEGORIES[props.id];

    return (
        <Link href={`/news?category=${props.id}`}>
            <a
                className={`${
                    props.className || ''
                } rsc-category-link rsc-${colour}-text`}
            >
                {name}
            </a>
        </Link>
    );
}

function CategoryLinks(props) {
    const { selected } = props;

    return (
        <nav className="rsc-inline-links rsc-category-links">
            <ul aria-label="Choose a news category">
                {CATEGORY_IDS.map((id, i) => {
                    const className = selected === id ? 'rsc-strong-text' : '';

                    return (
                        <li key={i}>
                            <CategoryLink className={className} id={id} />
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}

function NewsArticle(props) {
    const articleURL = `/news/${slug(props.title)}/${props.id}`;

    return (
        <div key={props.id}>
            <article className="rsc-row">
                <CategoryLink
                    className="rsc-col rsc-col-25 rsc-article-category"
                    id={props.category + 1}
                />
                <div className="rsc-col rsc-col-50 rsc-left-text">
                    <Link href={articleURL}>
                        <a className="rsc-link">
                            <h2 style={{ marginTop: '8px' }}>{props.title}</h2>
                        </a>
                    </Link>
                    <p>
                        {props.summary.trim()}...&nbsp;
                        <Link href={articleURL}>
                            <a className="rsc-link">read more</a>
                        </Link>
                    </p>
                </div>
                <time className="rsc-col rsc-col-25 rsc-right-text rsc-article-date">
                    {formatDate(new Date(props.date * 1000))}
                </time>
            </article>
            <hr />
        </div>
    );
}

export default function News(props) {
    const router = useRouter();
    const { articles, pages: totalPages } = props;

    const page = !Number.isNaN(+router.query.page)
        ? Number.parseInt(router.query.page, 10)
        : 1;

    const selectedCategory = !Number.isNaN(+router.query.category)
        ? Number.parseInt(router.query.category, 10)
        : 0;

    const content = articles.length ? (
        <>
            <div className="rsc-row rsc-news-head">
                <strong className="rsc-col rsc-col-25 rsc-left-text">
                    Category
                </strong>
                <strong className="rsc-col rsc-col-50 rsc-left-text">
                    Article
                </strong>
                <strong className="rsc-col rsc-col-25 rsc-right-text">
                    Date
                </strong>
            </div>
            {articles.map((article) => NewsArticle(article))}
            <br />
            <PaginationArrows
                url="/news"
                page={page}
                totalPages={totalPages}
                query={{ category: selectedCategory }}
            />
            <br />
        </>
    ) : (
        <p>No articles found.</p>
    );

    const { user } = useContext(SessionContext);

    const addArticle =
        user && user.rank === 3 ? (
            <p className="rsc-centre-text" style={{ fontSize: '14px' }}>
                <Link href="/news/write">
                    <a className="rsc-link" style={{ display: 'block' }}>
                        ➕ Write news article
                    </a>
                </Link>
            </p>
        ) : undefined;

    return (
        <div>
            <Header pageName={PAGE_TITLE} />
            <Container>
                <PageName pageName={PAGE_TITLE} />
                <div className="rsc-row">
                    <div className="rsc-col rsc-col-100">
                        <div className="rsc-row">
                            <div className="rsc-col rsc-col-100">
                                <br />
                                <CategoryLinks selected={selectedCategory} />
                                <br />
                            </div>
                        </div>
                        <div className="rsc-box rsc-news-box">
                            {addArticle}
                            {content}
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
}

export async function getServerSideProps({ query }) {
    const response = await fetch(
        `${process.env.url}api/news?page=${query.page || -1}` +
            `&category=${query.category || -1}`
    );

    if (response.ok) {
        const { articles, pages } = await response.json();
        return { props: { articles, pages } };
    }

    return { notFound: true };
}
