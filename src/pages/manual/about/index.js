import Container from '../../../components/container';
import Header from '../../../components/header';
import Link from 'next/link';
import MediaBox from '../../../components/media-box';
import PageName from '../../../components/page-name';

const PAGE_TITLE = 'About RuneScape';

export default function ManualAbout() {
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
                    <div
                        className="rsc-col rsc-col-100"
                        style={{ maxWidth: '540px' }}
                    >
                        <div className="rsc-row">
                            <MediaBox
                                href="/manual/about/what-is-runescape"
                                src="/manual-images/about.jpg"
                                alt="Air rune"
                            >
                                <h2 className="rsc-stone-box">
                                    What is RuneScape?
                                </h2>
                                <p>
                                    Information on RuneScape the game.
                                    <br />
                                    <span className="rsc-link">Click here</span>
                                </p>
                            </MediaBox>
                            <MediaBox
                                href="/manual/about/what-is-a-virtual-world"
                                src="/manual-images/earth.jpg"
                                alt="Globe"
                            >
                                <h2 className="rsc-stone-box">
                                    What is a virtual world?
                                </h2>
                                <p>
                                    Information on virtual worlds.
                                    <br />
                                    <span className="rsc-link">Click here</span>
                                </p>
                            </MediaBox>
                        </div>
                        <div className="rsc-row">
                            <MediaBox
                                href="/manual/about/screenshots"
                                src="/manual-images/screenshots.jpg"
                                alt="Castle wall in grassy field with small house"
                            >
                                <h2 className="rsc-stone-box">
                                    Game Screenshots
                                </h2>
                                <p>
                                    A selection of in game screenshots of RuneScape.
                                    <br />
                                    <span className="rsc-link">Click here</span>
                                </p>
                            </MediaBox>
                            <MediaBox
                                href="/manual/about/getting-started"
                                src="/manual-images/getting-started.jpg"
                                alt="Full helmet and scimitar on a table"
                            >
                                <h2 className="rsc-stone-box">
                                    Getting Started
                                </h2>
                                <p>
                                    How to take the first step to playing RuneScape!
                                    <br />
                                    <span className="rsc-link">Click here</span>
                                </p>
                            </MediaBox>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
}
