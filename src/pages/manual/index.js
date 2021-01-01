import Container from '../../components/container';
import Header from '../../components/header';
import MediaBox from '../../components/media-box';
import PageName from '../../components/page-name';

const PAGE_TITLE = 'Runescape Manual';
const DOWNLOADABLE_CLIENT = 'https://github.com/2003scape/mudclient204';

export default function Manual() {
    return (
        <div>
            <Header pageName={PAGE_TITLE} />
            <Container>
                <PageName pageName={PAGE_TITLE} />
                <div className="rsc-row">
                    <div
                        className="rsc-col rsc-col-100"
                        style={{ maxWidth: '540px' }}
                    >
                        <div className="rsc-row">
                            <MediaBox
                                href="/manual/about"
                                src="/manual-images/about.jpg"
                                alt="Air rune"
                            >
                                <h2 className="rsc-stone-box">
                                    About RuneScape
                                </h2>
                                <p>
                                    Information on RuneScape the game.
                                    <br />
                                    <span className="rsc-link">Click here</span>
                                </p>
                            </MediaBox>
                            <MediaBox
                                href="/manual/rules/"
                                src="/manual-images/rules.png"
                                alt="Rule book"
                            >
                                <h2 className="rsc-stone-box">Rules</h2>
                                <p>
                                    Please&nbsp;
                                    <span className="rsc-link">Click here</span>
                                    &nbsp;to learn our rules
                                </p>
                            </MediaBox>
                        </div>
                        <div className="rsc-row">
                            <MediaBox
                                href="/manual/controls"
                                src="/manual-images/controls.jpg"
                                alt="Computer and joystick"
                            >
                                <h2 className="rsc-stone-box">Controls</h2>
                                <p>
                                    Learn how to move around the world.
                                    <br />
                                    <span className="rsc-link">Click here</span>
                                </p>
                            </MediaBox>
                            <MediaBox
                                href="/manual/skills"
                                src="/manual-images/skills.jpg"
                                alt="Hand wielding sword"
                            >
                                <h2 className="rsc-stone-box">Skills</h2>
                                <p>
                                    See what skills you can learn in the game.
                                    <br />
                                    <span className="rsc-link">Click here</span>
                                </p>
                            </MediaBox>
                        </div>
                        <div className="rsc-row">
                            <MediaBox
                                href="/manual/quests"
                                src="/manual-images/quests.jpg"
                                alt="Knight grasping golden chalice"
                            >
                                <h2 className="rsc-stone-box">Quests</h2>
                                <p>
                                    View details on all the Quests in RuneScape.
                                    <br />
                                    <span className="rsc-link">Click here</span>
                                </p>
                            </MediaBox>
                            <MediaBox
                                href="/manual/guides"
                                src="/manual-images/guides.jpg"
                                alt="Player with '?' staff"
                            >
                                <h2 className="rsc-stone-box">Guides</h2>
                                <p>
                                    <span className="rsc-link">Click here</span>
                                    &nbsp;to read our useful guides.
                                </p>
                            </MediaBox>
                        </div>
                        <div className="rsc-row">
                            <MediaBox
                                href="/manual/map"
                                src="/manual-images/map.jpg"
                                alt="Tattered map scroll"
                            >
                                <h2 className="rsc-stone-box">World Map</h2>
                                <p>
                                    <span className="rsc-link">Click here</span>
                                    &nbsp;for a full map of the world.
                                </p>
                            </MediaBox>
                            <MediaBox href={DOWNLOADABLE_CLIENT}>
                                <h2 className="rsc-stone-box">Java Client</h2>
                                <p>
                                    <span className="rsc-link">Click here</span>
                                    &nbsp;for a Java version of the game client.
                                </p>
                            </MediaBox>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
}
