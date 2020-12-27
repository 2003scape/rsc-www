import Container from '../../../components/container';
import Header from '../../../components/header';
import Link from 'next/link';
import PageName from '../../../components/page-name';
import bestiary from '@2003scape/rsc-bestiary';
import slug from 'slug';

const PAGE_TITLE = 'Bestiary';

const LETTERS = [];

for (let i = 97; i <= 122; i += 1) {
    LETTERS.push(String.fromCharCode(i));
}

function LetterLink(props) {
    const { selected, letter } = props;

    return (
        <Link href={`/library/bestiary/${letter}`}>
            <a
                className={`rsc-link${
                    letter === selected ? ' rsc-strong-text' : ''
                }`}
                title={`View monsters beginning with ${letter.toUpperCase()}`}
            >
                {letter.toUpperCase()}
            </a>
        </Link>
    );
}

function LetterLinks(props) {
    return (
        <div className="rsc-row">
            <div className="rsc-col rsc-col-75">
                <br />
                <nav className="rsc-inline-links rsc-category-links">
                    <ul aria-label="Choose a letter">
                        {LETTERS.map((letter, i) => {
                            return (
                                <li key={i}>
                                    <LetterLink
                                        selected={props.letter}
                                        letter={letter}
                                    />
                                </li>
                            );
                        })}
                    </ul>
                </nav>
                <br />
            </div>
        </div>
    );
}

function NoneCatalogued(props) {
    return (
        <>
            <br />
            <br />
            <p>
                No creatures beginning with&nbsp;
                <strong>{props.letter.toUpperCase()}</strong> have been
                catalogued for the Library Of Varrock... yet.
            </p>
            <br />
            <br />
        </>
    );
}

function MonsterDescription(props) {
    const slugged = slug(props.name);
    const imageURL = `/bestiary/${slugged}.gif`;

    return (
        <article key={props.key} className="rsc-bestiary-info">
            <a href={`#${slugged}`}>
                <h3 id={slugged}>{props.name}</h3>
            </a>
            <img
                src={imageURL}
                alt={`Animated image of ${props.name}`}
            />
            <dl>
                <div className="rsc-spaced-dl">
                    <dt>Height:</dt>
                    <dd>{props.height}</dd>
                    <div style={{ clear: 'left' }} />
                    <dt>Weight:</dt>
                    <dd>{props.weight}</dd>
                    <div style={{ clear: 'left' }} />
                    <dt>Varieties:</dt>
                    <dd className="rsc-newline-dd">
                        {props.levels
                            .map((level) => `Level ${level}`)
                            .join('\n')}
                    </dd>
                    <div style={{ clear: 'left' }} />
                </div>
                <dt>Locations:</dt>
                <dd className="rsc-newline-dd">{props.locations.join('\n')}</dd>
                <div style={{ clear: 'left' }} />
                <dt>Appearance:</dt>
                <dd className="rsc-newline-dd">{props.appearance}</dd>
                <div style={{ clear: 'left' }} />
                <dt>Way of Life:</dt>
                <dd className="rsc-newline-dd">{props.description}</dd>
                <div style={{ clear: 'left' }} />
                <dt>Likes:</dt>
                <dd>{props.likes}</dd>
                <div style={{ clear: 'left' }} />
                <dt>Dislikes:</dt>
                <dd>{props.dislikes}</dd>
                <div style={{ clear: 'left' }} />
            </dl>
            <div style={{ clear: 'both' }} />
        </article>
    );
}

export default function Bestiary(props) {
    const { letter, monsters } = props;

    return (
        <div>
            <Header pageName={`${PAGE_TITLE} - Library of Varrock`} />
            <Container>
                <PageName pageName={PAGE_TITLE}>
                    <Link href="/library">
                        <a className="rsc-link">Library of Varrock</a>
                    </Link>
                </PageName>
                <LetterLinks letter={letter} />
                <div className="rsc-row">
                    <div className="rsc-col rsc-col-100">
                        <div className="rsc-tiled-scroll">
                            <div className="rsc-tiled-scroll-content">
                                {!monsters.length ? (
                                    <NoneCatalogued letter={letter} />
                                ) : (
                                    monsters.map((monster, i) => {
                                        return MonsterDescription({
                                            ...monster,
                                            key: i
                                        });
                                    })
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
}

export async function getStaticProps({ params }) {
    const letter = params.letter;

    const monsters = bestiary.filter((monster) => {
        return new RegExp(`^${letter}`, 'i').test(monster.name);
    });

    return { props: { letter, monsters } };
}

export async function getStaticPaths() {
    return {
        paths: LETTERS.map((letter) => {
            return { params: { letter } };
        }),
        fallback: false
    };
}
