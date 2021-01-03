import ManualEntry from '../../../components/manual-entry';
import slug from 'slug';

const GUIDE_TITLES = [
    'Security Tips',
    'Reporting abuse',
    'Play Safely',
    'Responsible Gaming',
    'Health & Safety',
    'Avoid Scamming'
];

const UNSLUGGED_TITLES = {};

for (const title of GUIDE_TITLES) {
    UNSLUGGED_TITLES[slug(title)] = title;
}

export default function ManualControlsSection(props) {
    const guide = props.guide;

    return (
        <ManualEntry
            title={UNSLUGGED_TITLES[guide]}
            sectionName="Guides"
            section="guides"
            manual={guide}
        />
    );
}

export async function getStaticProps({ params }) {
    const guide = params.guide;

    return { props: { guide } };
}

export async function getStaticPaths() {
    return {
        paths: GUIDE_TITLES.map((title) => {
            return { params: { guide: slug(title) } };
        }),
        fallback: false
    };
}
