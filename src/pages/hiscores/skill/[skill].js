require('isomorphic-fetch');

const skillNames = require('@2003scape/rsc-data/skill-names');

import Container from '../../../components/container';
import Header from '../../../components/header';
import HiscoreControls from '../../../components/hiscore-controls';
import Link from 'next/link';
import PageName from '../../../components/page-name';
import PaginationArrows from '../../../components/pagination-arrows';
import Router, { useRouter } from 'next/router';
import SkillIcon from '../../../components/skill-icon';
import SkillList from '../../../components/skill-list';
import { formatUsername } from '../../../username';
import { useState } from 'react';

const PAGE_TITLE = 'RuneScape Hiscores';
const SKILL_NAMES = new Set(['overall'].concat(skillNames));
const RANKS_PER_PAGE = 16;
const EMPTY_PROPS = { props: { ranks: [], pages: 0 } };

function RankRow(row = {}, key) {
    return (
        <tr key={key}>
            <td className="rsc-col-rank">{row.rank || '-'}</td>
            <td className="rsc-col-name">
                {row.username ? (
                    <Link href={`/hiscores?name=${row.username}`}>
                        <a className="rsc-link">
                            {formatUsername(row.username) || '-'}
                        </a>
                    </Link>
                ) : (
                    <div>-</div>
                )}
            </td>
            <td className="rsc-col-level">
                {row.level ? row.level.toLocaleString() : '-'}
            </td>
            <td className="rsc-col-xp">
                {typeof row.experience === 'number'
                    ? row.experience.toLocaleString()
                    : '-'}
            </td>
        </tr>
    );
}

export default function HiscoreSkills(props) {
    const router = useRouter();
    const skill = router.query.skill || 'overall';
    const page = !Number.isNaN(+router.query.page) ? +router.query.page : 1;
    const formattedSkillName = skill[0].toUpperCase() + skill.slice(1);
    const pageTitle = `${PAGE_TITLE} for ${formattedSkillName}`;

    const playerRows = props.ranks.map((entry, i) => {
        return RankRow(entry, i);
    });

    for (let i = playerRows.length; i < RANKS_PER_PAGE; i += 1) {
        playerRows.push(RankRow({}, i));
    }

    const icon = skill !== 'overall' ? <SkillIcon name={skill} /> : '';

    return (
        <div>
            <Header pageName={pageTitle} />
            <Container>
                <PageName pageName={PAGE_TITLE} />
                <div className="rsc-row">
                    <aside className="rsc-col rsc-col-36">
                        <h2>Select hiscore table</h2>
                        <div className="rsc-box rsc-hiscores-skills">
                            <SkillList selected={skill} />
                        </div>
                    </aside>
                    <section
                        id="ranks"
                        className="rsc-col rsc-col-64"
                        style={{ alignSelf: 'center' }}
                    >
                        <h2>
                            {icon}
                            <span style={{ verticalAlign: 'middle' }}>
                                {formattedSkillName} Hiscores
                            </span>
                        </h2>
                        <div className="rsc-box rsc-hiscores-ranks">
                            <table>
                                <thead>
                                    <tr>
                                        <th className="rsc-col-rank">Rank</th>
                                        <th className="rsc-col-name">Name</th>
                                        <th className="rsc-col-level">Level</th>
                                        <th className="rsc-col-xp">XP</th>
                                    </tr>
                                </thead>
                                <tbody>{playerRows}</tbody>
                            </table>
                            <PaginationArrows
                                url={`/hiscores/skill/${skill}`}
                                hash="ranks"
                                page={page}
                                totalPages={props.pages}
                            />
                        </div>
                    </section>
                </div>
                <br />
                <HiscoreControls />
            </Container>
        </div>
    );
}

export async function getServerSideProps({ res, params, query }) {
    const skill = query.skill ? ('' + query.skill).toLowerCase() : 'overall';

    if (!SKILL_NAMES.has(skill)) {
        res.setHeader('location', `/hiscores/skill/overall`);
        res.statusCode = 303;
        res.end();
        return EMPTY_PROPS;
    }

    const page = query.page ? query.page : 1;

    const response = await fetch(
        `http://localhost:1338/api/hiscores/skill/${params.skill}?page=${page}`
    );

    if (response.ok) {
        const { ranks, pages } = await response.json();

        if (page > pages) {
            res.setHeader('location', `/hiscores/skill/${params.skill}`);
            res.statusCode = 303;
            res.end();
            return EMPTY_PROPS;
        }

        return { props: { ranks, pages } };
    }

    return EMPTY_PROPS;
}
