import Container from '../../components/container';
import Header from '../../components/header';
import MediaBox from '../../components/media-box';
import PageName from '../../components/page-name';

const PAGE_TITLE = 'Community';

export default function Community() {
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
                                href="/community/chat"
                                src="/chat.png"
                                alt="Speech bubble"
                            >
                                <h2 className="rsc-stone-box">Web Chat</h2>
                                <p>
                                    Chat with players via&nbsp;
                                    <abbr title="Internet Relay Chat">IRC</abbr>
                                    .
                                    <br />
                                    <span className="rsc-link">Click here</span>
                                </p>
                            </MediaBox>
                            <MediaBox
                                href="https://discord.gg/zbZAXRAg2p"
                                src="/discord.png"
                                alt="Discord icon"
                            >
                                <h2 className="rsc-stone-box">Discord</h2>
                                <p>
                                    Join our Discord channel.
                                    <br />
                                    <span className="rsc-link">Click here</span>
                                </p>
                            </MediaBox>
                        </div>
                        <div className="rsc-row">
                            <MediaBox
                                href="https://reddit.com/r/2003scape"
                                src="/reddit.png"
                                alt="Reddit icon"
                            >
                                <h2 className="rsc-stone-box">Reddit</h2>
                                <p>
                                    Subscribe to /r/2003scape on Reddit.
                                    <br />
                                    <span className="rsc-link">Click here</span>
                                </p>
                            </MediaBox>
                            <MediaBox
                                href="https://classic.runescape.wiki"
                                src="/wiki.png"
                                alt="RuneScape Classic Wiki icon"
                            >
                                <h2 className="rsc-stone-box">Wiki</h2>
                                <p>
                                    Collaborate with other RuneScape Classic
                                    enthusaists.
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
