import Container from '../../../components/container';
import Header from '../../../components/header';
import Link from 'next/link';
import PageName from '../../../components/page-name';
import quests from '@2003scape/rsc-manuals/quests';
import slug from 'slug';

const SLUGGED_QUESTS = {};

[...quests.free, ...quests.members].forEach((quest, i) => {
    quest.members = i >= quests.free.length;
    SLUGGED_QUESTS[slug(quest.name)] = quest;
});

const PAGE_TITLE = 'Quests';

function QuestSummaryBox(props) {
    const imageColClasses = [
        'rsc-col',
        'rsc-col-60',
        'rsc-quest-summary-col',
        'rsc-quest-summary-image'
    ];

    const imageSrc = `/manual-images/quests/${slug(props.name)}.png`;

    return (
        <div className="rsc-box">
            <div className="rsc-row">
                <div className="rsc-col rsc-col-40 rsc-quest-summary-col">
                    <p>{props.summary}</p>
                </div>
                <div className={imageColClasses.join(' ')}>
                    <a href={imageSrc}>
                        <img
                            src={imageSrc}
                            alt={`Game screenshot of ${props.name}`}
                        />
                    </a>
                </div>
            </div>
        </div>
    );
}

export default function QuestEntry(props) {
    const quest = SLUGGED_QUESTS[props.quest];

    return (
        <div>
            <Header pageName={`${quest.name} - ${PAGE_TITLE}`} />
            <Container>
                <PageName pageName={quest.name}>
                    <Link href={`/manual/quests`}>
                        <a className="rsc-link rsc-small-block rsc-small-spaced">
                            Quests
                        </a>
                    </Link>
                </PageName>
                <div className="rsc-row">
                    <div className="rsc-col rsc-col-75">
                        <QuestSummaryBox
                            name={quest.name}
                            summary={quest.summary}
                        />
                    </div>
                </div>
                <div className="rsc-row">
                    <div className="rsc-col rsc-col-75">
                        <div className="rsc-box" style={{ paddingTop: '12px' }}>
                            <dl className="rsc-full-dl rsc-quest-dl">
                                <dt>Start point:</dt>
                                <dd>{quest.start}</dd>
                                <div style={{ clear: 'left' }} />
                                <dt>Speak to:</dt>
                                <dd>{quest.npc}</dd>
                                <div style={{ clear: 'left' }} />
                                <dt>Mission length:</dt>
                                <dd>{quest.length}</dd>
                                <div style={{ clear: 'left' }} />
                                <dt>Minimum requirements:</dt>
                                <dd>{quest.requirements}</dd>
                                <div style={{ clear: 'left' }} />
                                <dt>Members only:</dt>
                                <dd>{quest.members ? 'Yes' : 'No'}</dd>
                                <div style={{ clear: 'left' }} />
                            </dl>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
}

export async function getStaticProps({ params }) {
    const quest = params.quest;

    return { props: { quest } };
}

export async function getStaticPaths() {
    return {
        paths: [...quests.free, ...quests.members].map(({ name }) => {
            return { params: { quest: slug(name) } };
        }),
        fallback: false
    };
}
