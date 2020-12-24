const slug = require('slug');

import Container from '../../components/container';
import Header from '../../components/header';
import Link from 'next/link';
import PageName from '../../components/page-name';
import PaginationArrows from '../../components/pagination-arrows';
import Router, { useRouter } from 'next/router';

const PAGE_TITLE = 'Latest News';

const CATEGORIES = {
    0: { name: 'All Categories', colour: 'white' },
    1: { name: 'Game Updates', colour: 'red' },
    2: { name: 'Website', colour: 'light-blue' },
    3: { name: 'Customer Support', colour: 'yellow' },
    4: { name: 'Technical', colour: 'dark-blue' },
    5: { name: 'Community', colour: 'green' },
    6: { name: 'Behind the Scenes', colour: 'purple' },
    7: { name: 'Polls', colour: 'pink' }
};

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
    const selected = props.selected;

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

function NewsArticle(props, i) {
    const articleURL =`/news/article/${slug(props.title)}/${props.id}`;

    return (
        <div key={i}>
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
                            <a className="rsc-link">Read more</a>
                        </Link>
                    </p>
                </div>
                <time className="rsc-col rsc-col-25 rsc-right-text rsc-article-date">
                    {new Date(props.date * 1000)
                        .toLocaleString('en-gb', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                        })
                        .replace(/ /g, '-')
                        .replace(/,/g, '')}
                </time>
            </article>
            <hr />
        </div>
    );
}

export default function News(props) {
    const router = useRouter();
    const articles = props.articles;

    const page = !Number.isNaN(+router.query.page)
        ? parseInt(router.query.page, 10)
        : 1;

    const selectedCategory = !Number.isNaN(+router.query.category)
        ? parseInt(router.query.category, 10)
        : 0;

    const content = articles.length ? (
        <div>
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
            {articles.map(NewsArticle)}
            <br />
            <PaginationArrows
                url={`/news`}
                page={page}
                totalPages={10}
                hash={`&category=${selectedCategory}`}
            />
            <br />
        </div>
    ) : (
        <p>No articles found</p>
    );

    return (
        <div>
            <Header pageName={PAGE_TITLE} />
            <Container>
                <PageName pageName={PAGE_TITLE} />
                <div className="rsc-row">
                    <div className="rsc-col rsc-col-100">
                        <div className="rsc-row">
                            <div className="rsc-col rsc-col-75">
                                <br />
                                <CategoryLinks selected={selectedCategory} />
                                <br />
                            </div>
                        </div>
                        <div className="rsc-box rsc-news-box">
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
        const { articles } = await response.json();
        return { props: { articles } };
    }

    return { notFound: true };
}
