require('isomorphic-fetch');

const skillNames = require('@2003scape/rsc-data/skill-names');

import Container from '../../../components/container';
import Header from '../../../components/header';
import HiscoreControls from '../../../components/hiscore-controls';
import Link from 'next/link';
import PageName from '../../../components/page-name';
import PaginationArrows from '../../../components/pagination-arrows';
import { useRouter } from 'next/router';
import SkillIcon from '../../../components/skill-icon';
import SkillList from '../../../components/skill-list';
import { formatUsername } from '../../../username';

const PAGE_TITLE = 'RuneScape Hiscores';
const SKILL_NAMES = new Set(['overall'].concat(skillNames));
const RANKS_PER_PAGE = 16;

function RankRow(props = {}) {
    return (
        <tr className={props.className} key={props.key}>
            <td className="rsc-col-rank">{props.rank || '-'}</td>
            <td className="rsc-col-name">
                {props.username ? (
                    <Link href={`/hiscores?name=${props.username}`}>
                        <a className="rsc-link">
                            {formatUsername(props.username) || '-'}
                        </a>
                    </Link>
                ) : (
                    <div>-</div>
                )}
            </td>
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

export default function HiscoreSkills(props) {
    const router = useRouter();
    const skill = router.query.skill || 'overall';

    const page = !Number.isNaN(+router.query.page)
        ? parseInt(router.query.page, 10)
        : 1;

    const rank = +(router.query.rank || -1);
    const formattedSkillName = skill[0].toUpperCase() + skill.slice(1);
    const pageTitle = `${PAGE_TITLE} for ${formattedSkillName}`;

    const playerRows = props.ranks.map((entry, i) => {
        return RankRow({
            ...entry,
            key: i,
            className: entry.rank === rank ? 'rsc-highlight-row' : ''
        });
    });

    for (let i = playerRows.length; i < RANKS_PER_PAGE; i += 1) {
        playerRows.push(RankRow({ key: i }));
    }

    const icon = skill !== 'overall' ? <SkillIcon name={skill} /> : undefined;

    return (
        <div>
            <Header pageName={pageTitle} />
            <Container>
                <PageName pageName={PAGE_TITLE} />
                <br />
                <div className="rsc-row">
                    <aside
                        className="rsc-col rsc-col-36"
                        style={{ alignSelf: 'center' }}
                    >
                        <h2>Select hiscore table</h2>
                        <SkillList selected={skill} />
                    </aside>
                    <main
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
                        <div className="rsc-box rsc-hiscores-table">
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
                                page={page}
                                hash="ranks"
                                totalPages={props.pages}
                            />
                        </div>
                    </main>
                </div>
                <br />
                <HiscoreControls />
            </Container>
        </div>
    );
}

export async function getServerSideProps({ params, query }) {
    const skill = query.skill ? ('' + query.skill).toLowerCase() : 'overall';

    if (!SKILL_NAMES.has(skill)) {
        return {
            redirect: {
                destination: '/hiscores/skill/overall',
                permanent: true
            }
        };
    }

    const page = query.page ? query.page : 1;
    const rank = query.rank ? query.rank : -1;

    const response = await fetch(
        `${process.env.url}api/hiscores/skill/${params.skill}?page=${page}` +
            `&rank=${rank}`
    );

    if (response.ok) {
        const { ranks, pages } = await response.json();

        if (page > pages) {
            return {
                redirect: {
                    destination: `/hiscores/skill/${params.skill}`,
                    permanent: false
                }
            };
        }

        return { props: { ranks, pages } };
    }

    return { notFound: true };
}
