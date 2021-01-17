import Container from '../../../components/container';
import Header from '../../../components/header';
import Link from 'next/link';
import PageName from '../../../components/page-name';
import ListScrollList from '../../../components/list-scroll-list';

const PAGE_TITLE = 'Skills';

const BASIC_SKILLS = [
    'Cooking',
    'Crafting',
    'Fighting',
    'Firemaking',
    'Fishing',
    'Magic',
    'Mining',
    'Prayer',
    'Ranging',
    'Smithing',
    'Woodcutting',
    'Fatigue'
];

const MEMBERS_SKILLS = ['Agility', 'Herblaw', 'Fletching', 'Thieving'];

function getSkillEntry(skill) {
    return {
        name: skill,
        href: `/manual/skills/${skill.toLowerCase()}`
    };
}

export default function ManualSkills() {
    const content = (
        <div className="rsc-row">
            <div className="rsc-col rsc-col-50">
                <div className="rsc-list-scroll">
                    <div className="rsc-list-scroll-content">
                        <header className="rsc-list-scroll-header">
                            <img src="/basic-skills.png" alt="Basic Skills" />
                        </header>
                        <ListScrollList
                            items={BASIC_SKILLS.map(getSkillEntry)}
                        />
                    </div>
                </div>
            </div>
            <div className="rsc-col rsc-col-50">
                <div className="rsc-list-scroll">
                    <div className="rsc-list-scroll-content">
                        <header className="rsc-list-scroll-header">
                            <img
                                src="/member-skills.png"
                                alt="Member Only Skills"
                            />
                        </header>
                        <ListScrollList
                            items={MEMBERS_SKILLS.map(getSkillEntry)}
                        />
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div>
            <Header pageName={`${PAGE_TITLE} - RuneScape Manual`} />
            <Container>
                <PageName pageName={PAGE_TITLE}>
                    <Link href="/manual">
                        <a className="rsc-link rsc-small-block rsc-small-spaced">
                            Manual index
                        </a>
                    </Link>
                </PageName>
                <div className="rsc-row">
                    <div
                        className="rsc-col rsc-col-100"
                        style={{ maxWidth: '540px' }}
                    >
                        {content}
                    </div>
                </div>
            </Container>
        </div>
    );
}
