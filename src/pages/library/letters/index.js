import Container from '../../../components/container';
import Header from '../../../components/header';
import Link from 'next/link';
import PageName from '../../../components/page-name';
import slug from 'slug';

const BULLET = '●';
const PAGE_TITLE = 'Letter Archives';

function LetterRow(props) {
    const slugged = slug(props.title);
    const url = `/library/letters/letter/${slugged}/${props.id}`;

    return (
        <div key={props.key} className="rsc-row rsc-letters-row">
            <span className="rsc-col rsc-col-20 rsc-left-text">
                <Link href={url}>
                    <a className="rsc-link rsc-small-block">
                        {BULLET} Issue {props.id}
                    </a>
                </Link>
            </span>
            <span className="rsc-col rsc-col-50 rsc-left-text rsc-letters-name">
                {props.title}
            </span>
            <time className="rsc-col rsc-col-30 rsc-right-text">
                {new Date(props.date * 1000).toLocaleString('en-gb', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                })}
            </time>
        </div>
    );
}

export default function LetterArchives(props) {
    const content = props.letters.length ? (
        <>
            <p>
                Letters will normally appear in the archive every month.
            </p>
            {props.letters.map((letter, i) => LetterRow({ ...letter, key: i }))}
        </>
    ) : (
        <p>No letters found.</p>
    );

    return (
        <div>
            <Header pageName={`${PAGE_TITLE} - Library of Varrock`} />
            <Container>
                <PageName pageName={PAGE_TITLE}>
                    <Link href="/library">
                        <a className="rsc-link rsc-small-block rsc-small-spaced">
                            Library of Varrock
                        </a>
                    </Link>
                </PageName>
                <div className="rsc-row">
                    <div
                        className="rsc-col rsc-col-100"
                        style={{ maxWidth: '540px' }}
                    >
                        <div className="rsc-box rsc-letters-box">{content}</div>
                    </div>
                </div>
            </Container>
        </div>
    );
}

export async function getServerSideProps() {
    const response = await fetch(`${process.env.url}api/god-letters`);

    if (response.ok) {
        const { letters } = await response.json();
        return { props: { letters } };
    }

    return { props: { letters: [] } };
}
