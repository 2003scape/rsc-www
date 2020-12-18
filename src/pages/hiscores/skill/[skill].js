const skillNames = require('@2003scape/rsc-data/skill-names');

import Container from '../../../components/container';
import Header from '../../../components/header';
import Link from 'next/link';
import PageName from '../../../components/page-name';
import Router, { useRouter } from 'next/router';
import { useState } from 'react';

const PAGE_TITLE = 'RuneScape Hiscores';
const SKILL_NAMES = ['overall'].concat(skillNames);

function SkillList(props) {
    const skillList = SKILL_NAMES.map((name, i) => {
        const formattedSkillName = name[0].toUpperCase() + name.slice(1);

        const icon =
            i !== 0 ? (
                <img
                    style={{ verticalAlign: 'middle', marginRight: '4px' }}
                    src={`/skills/${name}.png`}
                    alt={`${formattedSkillName} icon`}
                />
            ) : (
                ''
            );

        const fontWeight = name === props.selected ? 'bold' : 'normal';

        return (
            <li key={i}>
                <Link href={`/hiscores/skill/${name}`}>
                    <a
                        className="rsc-link"
                        title={`Top players in ${formattedSkillName}`}
                        style={{ fontWeight }}
                    >
                        {icon}
                        <span style={{ verticalAlign: 'middle' }}>
                            {formattedSkillName}
                        </span>
                    </a>
                </Link>
            </li>
        );
    });

    return (
        <aside className="rsc-col rsc-col-36">
            <h2>Select hiscore table</h2>
            <div className="rsc-box rsc-hiscores-skills">
                <ul>{skillList}</ul>
            </div>
        </aside>
    );
}

function HiscoreInputWrap(props) {
    return (
        <div className="rsc-stone-box" onSubmit={props.onSubmit}>
            <form method="get" action={props.action}>
                {props.children}
                <br />
                <input class="rsc-input" type="submit" value="Search" />
            </form>
        </div>
    );
}

function RankSearch(props) {
    const router = useRouter();
    const skill = router.query.skill || 'overall';

    const action = `/hiscores/${skill}`;

    return (
        <HiscoreInputWrap onSubmit={props.onSubmit} action={action}>
            <label htmlFor="rsc-search-rank">Search by rank</label>
            <input
                class="rsc-input"
                id="rsc-search-rank"
                name="rank"
                type="number"
                min="1"
                defaultValue={props.rank}
            />
        </HiscoreInputWrap>
    );
}

function NameSearch(props) {
    return (
        <HiscoreInputWrap onSubmit={props.onSubmit} action="/hiscores">
            <label htmlFor="rsc-search-name">Search by name</label>
            <input
                class="rsc-input"
                id="rsc-search-name"
                name="name"
                type="text"
                maxLength="12"
                defaultValue={props.username}
            />
        </HiscoreInputWrap>
    );
}

function NameCompare(props) {
    return (
        <HiscoreInputWrap onSubmit={props.onSubmit} action="/hiscores/compare">
            <label htmlFor="rsc-search-name-compare">Compare users</label>
            <input
                class="rsc-input"
                id="rsc-search-name-compare"
                name="name"
                type="text"
                maxLength="12"
                defaultValue={props.username}
            />
            <input
                class="rsc-input"
                id="rsc-search-opponent"
                name="opponent"
                type="text"
                maxLength="12"
                defaultValue={props.opponent}
            />
        </HiscoreInputWrap>
    );
}

function RankRow(row = {}, key) {
    return (
        <tr key={key}>
            <td className="rsc-col-rank">{row.rank || '-'}</td>
            <td className="rsc-col-name">
                {row.name ? (
                    <Link href={`/hiscores?name=${row.name}`}>
                        <a className="rsc-link">{row.name || '-'}</a>
                    </Link>
                ) : (
                    '-'
                )}
            </td>
            <td className="rsc-col-level">
                {row.level ? row.level.toLocaleString() : '-'}
            </td>
            <td className="rsc-col-xp">
                {row.xp ? row.xp.toLocaleString() : '-'}
            </td>
        </tr>
    );
}

export default function HiscoreSkills(props) {
    const router = useRouter();
    const skill = router.query.skill || 'overall';
    const rank = router.query.rank || 1;
    const username = router.query.name || '';
    const opponent = router.query.opponent || '';
    const formattedSkillName = skill[0].toUpperCase() + skill.slice(1);
    const pageTitle = `${PAGE_TITLE} for ${formattedSkillName}`;

    const playerRows = [];

    playerRows.push(
        RankRow({ rank: 1, name: 'tks', level: 1535, xp: 83052000 }, 0)
    );

    for (let i = 0; i < 15; i += 1) {
        playerRows.push(RankRow({}, i + 1));
    }

    const onRankSubmit = (e) => {
        e.preventDefault();

        const submittedRank = +e.target[0].value;

        Router.push({
            pathname: window.location.pathname,
            query: { rank: submittedRank }
        });
    };

    const onNameSubmit = (e) => {
        e.preventDefault();

        const submittedName = e.target[0].value;

        Router.push({
            pathname: '/hiscores',
            query: { name: submittedName }
        });
    };

    const onCompareSubmit = (e) => {
        e.preventDefault();

        const submittedName = e.target[0].value;

        Router.push({
            pathname: '/hiscores',
            query: { name: submittedName }
        });
    };

    return (
        <div>
            <Header pageName={pageTitle} />
            <Container>
                <PageName pageName={PAGE_TITLE} />
                <div className="rsc-row">
                    <SkillList selected={skill} />
                    <section className="rsc-col rsc-col-64">
                        <h2>{formattedSkillName} Hiscores</h2>
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
                        </div>
                    </section>
                </div>
                <br />
                <div className="rsc-row">
                    <div className="rsc-col rsc-col-50">
                        <RankSearch rank={rank} onSubmit={onRankSubmit} />
                    </div>
                    <div className="rsc-col rsc-col-50">
                        <NameSearch
                            username={username}
                            onSubmit={onNameSubmit}
                        />
                    </div>
                </div>
                <br />
                <div className="rsc-row">
                    <NameCompare
                        username={username}
                        opponent={opponent}
                        onSubmit={onCompareSubmit}
                    />
                </div>
            </Container>
        </div>
    );
}

export async function getServerSideProps() {
    return {
        props: { test: Math.random() }
    };
}
