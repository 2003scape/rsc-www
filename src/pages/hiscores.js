const skillNames = require('@2003scape/rsc-data/skill-names');

import Container from '../components/container';
import Header from '../components/header';
import Link from 'next/link';
import PageName from '../components/page-name';

const PAGE_TITLE = 'RuneScape Hiscores';
const SKILL_NAMES = ['overall'].concat(skillNames);

export default function Hiscores() {
    const selectedSkill = 'overall';

    const pageTitle =
        selectedSkill[0].toUpperCase() +
        selectedSkill.slice(1) +
        ' ' +
        PAGE_TITLE;

    const skillList = SKILL_NAMES.map((name, i) => {
        const formattedName = name[0].toUpperCase() + name.slice(1);
        const icon =
            i !== 0 ? (
                <img
                    style={{ verticalAlign: 'middle', marginRight: '4px' }}
                    src={`skills/${name}.png`}
                    alt={`${formattedName} icon`}
                />
            ) : (
                ''
            );

        return (
            <li key={i}>
                <Link href={`./hiscores/skill/${name}`}>
                    <a
                        class="rsc-link"
                        title={`Top players in ${formattedName}`}
                    >
                        {icon}
                        <span style={{ verticalAlign: 'middle' }}>
                            {formattedName}
                        </span>
                    </a>
                </Link>
            </li>
        );
    });

    const playerRows = [];
    playerRows.push(
        <tr>
            <td class="rsc-col-rank">1</td>
            <td class="rsc-col-name">tks</td>
            <td class="rsc-col-level">1,535</td>
            <td class="rsc-col-xp">83,052,000</td>
        </tr>
    );

    for (let i = 0; i < 15; i += 1) {
        playerRows.push(
            <tr>
                <td class="rsc-col-rank">-</td>
                <td class="rsc-col-name">-</td>
                <td class="rsc-col-level">-</td>
                <td class="rsc-col-xp">-</td>
            </tr>
        );
    }

    return (
        <div>
            <Header pageName={pageTitle} />
            <Container>
                <PageName pageName={PAGE_TITLE} />
                <div class="rsc-row">
                    <aside class="rsc-col rsc-col-36">
                        <h2>Select hiscore table</h2>
                        <div class="rsc-box rsc-hiscores-skills">
                            <ul>{skillList}</ul>
                        </div>
                    </aside>
                    <section class="rsc-col rsc-col-64">
                        <h2>Overall Hiscores</h2>
                        <div class="rsc-box rsc-hiscores-ranks">
                            <table>
                                <thead>
                                    <tr>
                                        <th className="rsc-col-rank">Rank</th>
                                        <th className="rsc-col-name">Name</th>
                                        <th className="rsc-col-level">Level</th>
                                        <th className="rsc-col-xp">XP</th>
                                    </tr>
                                </thead>
                                {playerRows}
                            </table>
                        </div>
                    </section>
                </div>
            </Container>
        </div>
    );
}
