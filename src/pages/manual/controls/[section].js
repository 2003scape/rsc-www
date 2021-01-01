import ManualEntry from '../../../components/manual-entry';
import slug from 'slug';

const SECTION_TITLES = [
    'Movement',
    'Inventory',
    'Camera',
    'Map View',
    'Trading',
    'Stats',
    'Shops',
    'Friends',
    'Banks',
    'Options'
];

const UNSLUGGED_TITLES = {};

for (const title of SECTION_TITLES) {
    UNSLUGGED_TITLES[slug(title)] = title;
}

export default function ManualControlsSection(props) {
    const section = props.section;

    return (
        <ManualEntry
            title={UNSLUGGED_TITLES[section]}
            sectionName="Controls"
            section="controls"
            manual={section}
        />
    );
}

export async function getStaticProps({ params }) {
    const section = params.section;

    return { props: { section } };
}

export async function getStaticPaths() {
    return {
        paths: SECTION_TITLES.map((title) => {
            return { params: { section: slug(title) } };
        }),
        fallback: false
    };
}
