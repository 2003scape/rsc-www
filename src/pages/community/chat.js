import Container from '../../components/container';
import Header from '../../components/header';
import Link from 'next/link';
import PageName from '../../components/page-name';
import { SessionContext } from '../../contexts/session';
import { formatUsername } from '../../username';
import { useContext } from 'react';

const PAGE_TITLE = 'IRC';

export default function IRC() {
    const { user } = useContext(SessionContext);
    console.log(user);
    const nick = user && user.id ? formatUsername(user.username) : '';
    const ircURL =
        `https://kiwiirc.com/nextclient/irc.rizon.net/?nick=${nick}#2003scape`;

    return (
        <div>
            <Header pageName={`${PAGE_TITLE} - Community`} />
            <Container>
                <PageName pageName={PAGE_TITLE}>
                    <Link href="/community">
                        <a className="rsc-link rsc-small-block rsc-small-spaced">
                            Community
                        </a>
                    </Link>
                </PageName>
                <div className="rsc-row">
                    <div className="rsc-col rsc-col-100">
                        <iframe
                            className="rsc-box"
                            style={{ width: '100%', height: '532px' }}
                            src={ircURL}
                        />
                    </div>
                </div>
            </Container>
        </div>
    );
}
