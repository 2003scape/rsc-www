import Container from '../../components/container';
import Header from '../../components/header';
import Link from 'next/link';
import PageName from '../../components/page-name';
import dynamic from 'next/dynamic';

const PAGE_TITLE = 'Map of the RuneScape World';

const WorldMap = dynamic(() => import('../../components/world-map'), {
    ssr: false
});

export default function ManualMap() {
    const pageTitle = `${PAGE_TITLE} - RuneScape Manual`;

    return (
        <div>
            <Header pageName={pageTitle} />
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
                        className="rsc-col rsc-col-75 rsc-box"
                        style={{ padding: 0 }}
                    >
                        <WorldMap />
                    </div>
                </div>
                <div className="rsc-row">
                    <div className="rsc-col rsc-col-75 rsc-box">
                        <p className="rsc-centre-text">
                            <a
                                style={{ lineHeight: '16px' }}
                                className="rsc-link"
                                href="/world-map.png"
                            >
                                <img
                                    style={{ verticalAlign: 'middle' }}
                                    src="/download.png"
                                    alt="Download arrow"
                                />
                                Download the world map
                            </a>
                        </p>
                    </div>
                </div>
            </Container>
        </div>
    );
}
