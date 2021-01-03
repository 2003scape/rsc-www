import Container from '../../../components/container';
import Header from '../../../components/header';
import Link from 'next/link';
import MediaBox from '../../../components/media-box';
import PageName from '../../../components/page-name';
import chunk from 'chunk';
import slug from 'slug';

const GUIDE_SECTIONS = [
    {
        name: 'Security Tips',
        body: 'For advice on how to keep your account secure',
        image: 'locked-computer.jpg'
    },
    {
        name: 'Reporting abuse',
        body: 'Dealing with and reporting abusive players',
        image: 'report-abuse.jpg'
    },
    {
        name: 'Play Safely',
        body: 'Helpful hints so you can be both safe and have fun',
        image: 'player-safety.jpg'
    },
    {
        name: 'Responsible Gaming',
        body: 'Maintain a balanced life whilst playing RuneScape.',
        image: 'responsible-gaming.jpg'
    },
    {
        name: 'Health & Safety',
        body: 'Please read this guide before playing RuneScape.',
        image: 'health-safety.jpg'
    },
    {
        name: 'Avoid Scamming',
        body: ' What is a scam and how do you avoid being scammed?',
        image: 'avoid-scamming.jpg'
    }
];

const PAGE_TITLE = 'RuneScape Guides';

function GuideMediaBoxes(props) {
    const { guides } = props;

    return (
        <>
            {chunk(guides, 2).map((row, i) => {
                return (
                    <div className="rsc-row" key={Math.random()}>
                        {row.map(({ name, body, image }, j) => {
                            return (
                                <MediaBox
                                    href={`/manual/guides/${slug(name)}`}
                                    src={`/manual-images/${image}`}
                                    key={`${i}-${j}`}
                                >
                                    <h2 className="rsc-stone-box">{name}</h2>
                                    <p>
                                        {body}
                                        <br />
                                        <span className="rsc-link">
                                            Click here
                                        </span>
                                    </p>
                                </MediaBox>
                            );
                        })}
                    </div>
                );
            })}
        </>
    );
}

export default function ManualGuides() {
    return (
        <div>
            <Header pageName={`${PAGE_TITLE} - RuneScape Manual`} />
            <Container>
                <PageName pageName={PAGE_TITLE}>
                    <Link href="/manual">
                        <a className="rsc-link rsc-small-block rsc-small-spaced">
                            Manual index
                        </a>
                    </Link>
                </PageName>
                <div className="rsc-row">
                    <div className="rsc-col rsc-col-100" style={{maxWidth:'540px'}}>
                        <GuideMediaBoxes guides={GUIDE_SECTIONS} />
                    </div>
                </div>
            </Container>
        </div>
    );
}
