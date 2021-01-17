import Container from '../components/container';
import Header from '../components/header';
import Link from 'next/link';
import PageName from '../components/page-name';
import formatDate from '../format-date';

const PAGE_TITLE = 'Message Centre';

function MessageRow(props) {
    return (
        <div className="rsc-row" key={props.id}>
            <div
                className="rsc-col rsc-col-25"
                style={{
                    padding: 0,
                    textAlign: 'left'
                }}
            >
                <img
                    src="/thread.png"
                    alt="Small scroll icon"
                    style={{
                        marginRight: '7px',
                        verticalAlign: 'middle'
                    }}
                />
                <time style={{ verticalAlign: 'middle' }}>
                    {formatDate(new Date(props.date * 1000))}
                </time>
            </div>
            <div className="rsc-col rsc-col-75" style={{ textAlign: 'left' }}>
                <Link href="/messages?id=0">
                    <a
                        className="rsc-link"
                        style={{
                            fontWeight: props.unread ? 'bold' : 'inherit'
                        }}
                    >
                        {props.subject}
                    </a>
                </Link>
            </div>
        </div>
    );
}

export default function Messages(props) {
    const { messages } = props;

    const content = messages.length ? (
        <>
            <div className="rsc-row rsc-hide-small">
                <div
                    className="rsc-col rsc-col-25"
                    style={{ padding: 0, textAlign: 'left' }}
                >
                    <strong style={{ marginLeft: '20px' }}>Date</strong>
                </div>
                <div
                    className="rsc-col rsc-col-75"
                    style={{ textAlign: 'left' }}
                >
                    <strong>Message</strong>
                </div>
                {messages.map((message, i) => {
                    return MessageRow({ ...message, id: i });
                })}
            </div>
        </>
    ) : (
        <p>No messages found.</p>
    );

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
                        <div className="rsc-box">{content}</div>
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

    return { props: { messages: [] } };
}
