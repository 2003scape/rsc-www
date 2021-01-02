import Container from '../../../components/container';
import Header from '../../../components/header';
import Link from 'next/link';
import ListScrollList from '../../../components/list-scroll-list';
import PageName from '../../../components/page-name';
import slug from 'slug';

const PAGE_TITLE = 'Game Controls';

const CONTROL_SECTIONS = [
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
].map((section) => {
    return { name: section, href: `/manual/controls/${slug(section)}` };
});

export default function ManualControls() {
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
                    <div className="rsc-col rsc-col-100">
                        <div className="rsc-list-scroll">
                            <div className="rsc-list-scroll-content">
                                <ListScrollList items={CONTROL_SECTIONS} />
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
}
