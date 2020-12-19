require('isomorphic-fetch');

import Container from '../../components/container';
import Header from '../../components/header';
import HiscoreControls from '../../components/hiscore-controls';
import HiscoreSkills from './skill/[skill]';
import PageName from '../../components/page-name';
import { formatUsername } from '../../username';
import Link from 'next/link';

const PAGE_TITLE = 'RuneScape Hiscores';
const EMPTY_SKILL_PROPS = { props: { ranks: [], pages: 0 } };

export default function Hiscores(props) {
    if (props.ranks) {
        return HiscoreSkills(props);
    }

    const username = formatUsername(props.username);
    const pageTitle = `${PAGE_TITLE} for ${username}`;

    return (
        <div>
            <Header pageName={pageTitle} />
            <Container>
                <PageName pageName={PAGE_TITLE}>
                    <Link href="/hiscores">
                        <a className="rsc-link">All Hiscores</a>
                    </Link>
                </PageName>
            </Container>
        </div>
    );
}

export async function getServerSideProps({ query }) {
    const name = query.name;

    if (name) {
        const opponent = query.opponent || null;

        return { props: { username: name, opponent } };
    }

    const res = await fetch('http://localhost:1338/api/hiscores/skill/overall');

    if (res.ok) {
        const { ranks, pages } = await res.json();
        return { props: { ranks, pages } };
    }

    return EMPTY_SKILL_PROPS;
}
