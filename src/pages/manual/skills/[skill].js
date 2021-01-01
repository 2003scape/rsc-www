import ManualEntry from '../../../components/manual-entry';
import slug from 'slug';

const SKILLS = [
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
    'Fatigue',
    'Agility',
    'Herblaw',
    'Fletching',
    'Thieving'
];

const UNSLUGGED_TITLES = {};

for (const title of SKILLS) {
    UNSLUGGED_TITLES[slug(title)] = title;
}

export default function ManualControlsSection(props) {
    const skill = props.skill;

    return (
        <ManualEntry
            title={UNSLUGGED_TITLES[skill]}
            sectionName="Skills"
            section="skills"
            manual={skill}
        />
    );
}

export async function getStaticProps({ params }) {
    return { props: { skill: params.skill } };
}

export async function getStaticPaths() {
    return {
        paths: SKILLS.map((skill) => {
            return { params: { skill: slug(skill) } };
        }),
        fallback: false
    };
}
