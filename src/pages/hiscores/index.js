require('isomorphic-fetch');

const skillNames = new Set([
    'overall',
    ...require('@2003scape/rsc-data/skill-names')
]);

import Container from '../../components/container';
import Header from '../../components/header';
import HiscoreControls from '../../components/hiscore-controls';
import HiscoreSkills from './skill/[skill]';
import Link from 'next/link';
import PageName from '../../components/page-name';
import SkillIcon from '../../components/skill-icon';
import { formatUsername } from '../../username';

const PAGE_TITLE = 'RuneScape Hiscores';
const EMPTY_SKILL_PROPS = { props: { ranks: [], pages: 0 } };

function SkillRow(props) {
    const name = props.name;
    const icon = props.name !== 'overall' ? <SkillIcon name={name} /> : '';
    const formattedSkillName = name[0].toUpperCase() + name.slice(1);
    const username = props.username.toLowerCase();
    const rank = props.rank;
    const skillURL = `/hiscores/skill/${name}?name=${username}&rank=${rank}`;

    return (
        <tr key={props.key}>
            <td className="rsc-col-name">
                <Link href={skillURL}>
                    <a className="rsc-link">
                        {icon}
                        {formattedSkillName}
                    </a>
                </Link>
            </td>
            <td className="rsc-col-rank">{props.rank || '-'}</td>
            <td className="rsc-col-level">
                {props.level ? props.level.toLocaleString() : '-'}
            </td>
            <td className="rsc-col-xp">
                {typeof props.experience === 'number'
                    ? props.experience.toLocaleString()
                    : '-'}
            </td>
        </tr>
    );
}

export default function Hiscores(props) {
    if (props.ranks && !props.username) {
        return HiscoreSkills(props);
    }

    const username = formatUsername(props.username);
    const ranks = props.ranks;
    const pageTitle = `${PAGE_TITLE} for ${username}`;

    let content;

    if (!ranks) {
        content = (
            <div className="rsc-col-75 rsc-box">
                <p>Player <em>"{username}"</em> not found.</p>
            </div>
        );
    } else {
        const skillRows = Array.from(skillNames).map((name, i) => {
            return new SkillRow({
                username,
                name,
                rank: ranks[name].rank,
                level: ranks[name].level,
                experience: ranks[name].experience,
                key: i
            });
        });

        content = (
            <main className="rsc-col rsc-col-75">
                <h2>Pesonal scores for {username}</h2>
                <div className="rsc-box rsc-hiscores-table">
                    <table>
                        <thead>
                            <tr>
                                <th className="rsc-col-name">Skill</th>
                                <th className="rsc-col-rank">Rank</th>
                                <th className="rsc-col-level">Level</th>
                                <th className="rsc-col-xp">XP</th>
                            </tr>
                        </thead>
                        <tbody>{skillRows}</tbody>
                    </table>
                </div>
            </main>
        );
    }

    return (
        <div>
            <Header pageName={pageTitle} />
            <Container>
                <PageName pageName={PAGE_TITLE}>
                    <Link href="/hiscores">
                        <a className="rsc-link">All Hiscores</a>
                    </Link>
                </PageName>
                <div className="rsc-row">{content}</div>
                <br />
                <HiscoreControls />
            </Container>
        </div>
    );
}

export async function getServerSideProps({ query }) {
    const username = query.name;

    if (username) {
        const opponent = query.opponent || null;

        const res = await fetch(
            `http://localhost:1338/api/hiscores?username=${username}`
        );

        if (res.ok) {
            const { ranks } = await res.json();
            return { props: { username, opponent, ranks } };
        }

        return { props: { username, opponent, ranks: null } };
    }

    const res = await fetch('http://localhost:1338/api/hiscores/skill/overall');

    if (res.ok) {
        const { ranks, pages } = await res.json();
        return { props: { ranks, pages } };
    }

    return EMPTY_SKILL_PROPS;
}
