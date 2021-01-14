import Container from '../components/container';
import Header from '../components/header';
import Link from 'next/link';
import PageName from '../components/page-name';

const PAGE_TITLE = 'Message Centre';

export default function Messages() {
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
                        <div className="rsc-box">
                            <div className="rsc-row rsc-hide-small">
                                <div
                                    className="rsc-col rsc-col-25"
                                    style={{ padding: 0, textAlign: 'left' }}
                                >
                                    <strong style={{ marginLeft: '20px' }}>
                                        Date
                                    </strong>
                                </div>
                                <div
                                    className="rsc-col rsc-col-75"
                                    style={{ textAlign: 'left' }}
                                >
                                    <strong>Message</strong>
                                </div>
                            </div>
                            <div className="rsc-row">
                                <div
                                    className="rsc-col rsc-col-25"
                                    style={{
                                        padding: 0,
                                        textAlign: 'left'
                                    }}
                                >
                                    <img
                                        src="/thread.png"
                                        alt="Scroll icon"
                                        style={{
                                            marginRight: '7px',
                                            verticalAlign: 'middle'
                                        }}
                                    />
                                    <time style={{ verticalAlign: 'middle' }}>
                                        29 Mar 2005
                                    </time>
                                </div>
                                <div
                                    className="rsc-col rsc-col-75"
                                    style={{ textAlign: 'left' }}
                                >
                                    <Link href="/messages?id=0">
                                        <a className="rsc-link">
                                            Re: Your Recent Support Query
                                        </a>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
}

export async function getServerSideProps({ req }) {
    if (!req.session || !req.session.user) {
        return {
            redirect: { destination: '/login?to=/messages', permanent: false }
        };
    }

    return { props: {} };
}
