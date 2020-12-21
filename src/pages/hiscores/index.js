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
import { USERNAME_REGEX, formatUsername } from '../../username';
import { useState } from 'react';

const PAGE_TITLE = 'RuneScape Hiscores';
const EMPTY_SKILL_PROPS = { props: { ranks: [], pages: 0 } };

const WINNER_ALTS = {
    winner: 'Green arrow facing upwards',
    failure: 'Red arrow facing downwards',
    equal: 'Equals sign'
};

function getWinner(playerExperience, opponentExperience) {
    if (playerExperience > opponentExperience) {
        return 'success';
    }

    if (opponentExperience > playerExperience) {
        return 'failure';
    }

    return 'equal';
}

function WinnerArrow(props) {
    return (
        <img
            className="rsc-winner-arrow"
            src={`./arrow-${props.winner}.png`}
            alt={WINNER_ALTS[props.winner]}
        />
    );
}

function SkillRow(props) {
    const name = props.name;
    const icon = props.name !== 'overall' ? <SkillIcon name={name} /> : '';
    const formattedSkillName = name[0].toUpperCase() + name.slice(1);
    const username = props.username.toLowerCase();
    const rank = props.rank;
    const skillURL = `/hiscores/skill/${name}?name=${username}&rank=${rank}#ranks`;
    const { setHighlightedRow, highlightedRow } = props;

    let onMouseOver;

    if (setHighlightedRow) {
        onMouseOver = () => {
            setHighlightedRow(
                props.key < skillNames.size
                    ? props.key + skillNames.size
                    : props.key - skillNames.size
            );
        };
    }

    return (
        <tr
            className={highlightedRow === props.key ? 'rsc-hover-row' : ''}
            key={props.key}
            onMouseOver={onMouseOver}
        >
            <td className="rsc-col-name">
                <Link href={skillURL}>
                    <a className="rsc-link">
                        {icon}
                        {formattedSkillName}
                    </a>
                </Link>
            </td>
            <td className="rsc-col-rank">{props.rank || '-'}</td>
            <td className="rsc-col-level" style={{ textAlign: 'right' }}>
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

function CompareRow(props) {
    const { skill, username, opponentName, key } = props;

    const { level, experience, rank } = props.rank;

    const {
        level: opponentLevel,
        experience: opponentExperience,
        rank: opponentRank
    } = props.opponentRank;

    const icon = skill !== 'overall' ? <SkillIcon name={skill} /> : '';
    const formattedSkillName = skill[0].toUpperCase() + skill.slice(1);
    const skillURL =
        `/hiscores/skill/${skill}?name=${username.toLowerCase()}&rank=` +
        `${rank}#ranks`;

    const opponentSkillURL =
        `/hiscores/skill/${skill}?name=${opponentName.toLowerCase()}&rank=` +
        `${opponentRank}#ranks`;

    return (
        <tr key={key}>
            <td className="rsc-col-compare-name">
                <Link href={skillURL}>
                    <a className="rsc-link">
                        {icon}
                        {formattedSkillName}
                    </a>
                </Link>
            </td>
            <td className="rsc-col-compare-rank">{rank || '-'}</td>
            <td className="rsc-col-compare-level">
                {level ? level.toLocaleString() : '-'}
            </td>
            <td className="rsc-col-compare-xp">
                {typeof experience === 'number'
                    ? experience.toLocaleString()
                    : '-'}
            </td>
            <td className="rsc-col-compare-winner">
                <WinnerArrow
                    winner={getWinner(experience, opponentExperience)}
                />
            </td>
            <td className="rsc-col-compare-name">
                <Link href={opponentSkillURL}>
                    <a className="rsc-link">
                        {icon}
                        {formattedSkillName}
                    </a>
                </Link>
            </td>
            <td className="rsc-col-compare-rank">{opponentRank}</td>
            <td className="rsc-col-compare-level">{opponentLevel}</td>
            <td className="rsc-col-compare-xp">
                {typeof opponentExperience === 'number'
                    ? opponentExperience.toLocaleString()
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
    const opponentName = formatUsername(props.opponent);
    const opponentRanks = props.opponentRanks;
    const pageTitle = `${PAGE_TITLE} for ${username}`;

    let content;

    if (!ranks || (opponentName && !opponentRanks)) {
        content = (
            <div className="rsc-col rsc-col-75 rsc-box">
                <p>
                    Player <em>"{!ranks ? username : opponentName}"</em> not
                    found.
                </p>
            </div>
        );
    } else if (username === opponentName || (ranks && !opponentRanks)) {
        const skillRows = Array.from(skillNames).map((name, i) => {
            return new SkillRow({ ...ranks[name], username, name, key: i });
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
                                <th
                                    className="rsc-col-level"
                                    style={{ textAlign: 'right' }}
                                >
                                    Level
                                </th>
                                <th className="rsc-col-xp">XP</th>
                            </tr>
                        </thead>
                        <tbody>{skillRows}</tbody>
                    </table>
                </div>
            </main>
        );
    } else if (ranks && opponentRanks) {
        const compareRows = Array.from(skillNames).map((name, i) => {
            return new CompareRow({
                skill: name,
                username,
                opponentName,
                rank: ranks[name],
                opponentRank: opponentRanks[name],
                key: i
            });
        });

        content = (
            <main className="rsc-col rsc-col-100">
                <h2>
                    Comparing&nbsp;
                    <Link href={`/hiscores?name=${username.toLowerCase()}`}>
                        <a className="rsc-link">{username}</a>
                    </Link>{' '}
                    with&nbsp;
                    <Link href={`/hiscores?name=${opponentName.toLowerCase()}`}>
                        <a className="rsc-link">{opponentName}</a>
                    </Link>
                </h2>
                <div className="rsc-box rsc-hiscores-compare-box">
                    <div className="rsc-table rsc-hiscores-table rsc-compare-table">
                        <table>
                            <thead>
                                <tr>
                                    <th className="rsc-col-compare-name">
                                        Skill
                                    </th>
                                    <th className="rsc-col-compare-rank">
                                        Rank
                                    </th>
                                    <th className="rsc-col-compare-level">
                                        Level
                                    </th>
                                    <th className="rsc-col-compare-xp">XP</th>
                                    <th className="rsc-col-compare-winner">
                                        &nbsp;
                                    </th>
                                    <th className="rsc-col-compare-name">
                                        Skill
                                    </th>
                                    <th className="rsc-col-compare-rank">
                                        Rank
                                    </th>
                                    <th className="rsc-col-compare-level">
                                        Level
                                    </th>
                                    <th className="rsc-col-compare-xp">XP</th>
                                </tr>
                            </thead>
                            <tbody>{compareRows}</tbody>
                        </table>
                    </div>
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

export async function getServerSideProps({ res, query }) {
    let username = query.name;

    if (username) {
        username = username.trim().toLowerCase();

        let opponent = query.opponent || null;
        const props = { props: { username, opponent, ranks: null } };

        const response = await fetch(
            `http://localhost:1338/api/hiscores?username=${username}`
        );

        if (response.ok) {
            const { ranks } = await response.json();
            props.props.ranks = ranks;
        }

        if (opponent) {
            opponent = opponent.trim().toLowerCase();

            if (opponent === username) {
                props.props.opponentRanks = props.props.ranks;
                return props;
            }

            const response = await fetch(
                `http://localhost:1338/api/hiscores?username=${opponent}`
            );

            if (response.ok) {
                const { ranks } = await response.json();
                props.props.opponentRanks = ranks;
            }
        }

        return props;
    }

    const response = await fetch(
        'http://localhost:1338/api/hiscores/skill/overall'
    );

    if (response.ok) {
        const { ranks, pages } = await response.json();
        return { props: { ranks, pages } };
    }

    return EMPTY_SKILL_PROPS;
}
