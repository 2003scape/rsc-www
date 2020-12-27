import Container from '../../components/container';
import Header from '../../components/header';
import Link from 'next/link';
import PageName from '../../components/page-name';

const PAGE_TITLE = 'Library of Varrock';

export default function Library() {
    return (
        <div>
            <Header pageName={PAGE_TITLE} />
            <Container>
                <PageName pageName={PAGE_TITLE} />
                <div className="rsc-row">
                    <div className="rsc-col rsc-col-100">
                        <div className="rsc-tiled-scroll">
                            <div class="rsc-tiled-scroll-content">
                                <Link href="/library/letters">
                                    <a className="rsc-box rsc-library-box rsc-library-right">
                                        <div className="rsc-stone-box ">
                                            <h2>Letters</h2>
                                        </div>
                                        <img src="/letter.jpg" />
                                        <br />
                                        The RuneScape gods answer your
                                        questions.
                                    </a>
                                </Link>
                                <Link href="/library/bestiary/a">
                                    <a className="rsc-box rsc-library-box rsc-library-left">
                                        <div className="rsc-stone-box ">
                                            <h2>Bestiary</h2>
                                        </div>
                                        <img src="/bestiary.jpg" />
                                        <br />
                                        See the mysterious creatures of
                                        RuneScape.
                                    </a>
                                </Link>
                                <div style={{ clear: 'both' }} />
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
}
