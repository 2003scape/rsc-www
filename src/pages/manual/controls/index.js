import Container from '../../../components/container';
import Header from '../../../components/header';
import Link from 'next/link';
import PageName from '../../../components/page-name';
import manuals from '@2003scape/rsc-manuals';

const PAGE_TITLE = 'Game Controls';

const CONTROL_SECTIONS = [
    { name: 'Movement', href: '/manual/controls/movement' },
    { name: 'Inventory', href: '/manual/controls/inventory' },
    { name: 'Camera', href: '/manual/controls/camera' },
    { name: 'Map View', href: '/manual/controls/map-view' },
    { name: 'Trading', href: '/manual/controls/trading' },
    { name: 'Stats', href: '/manual/controls/stats' },
    { name: 'Shops', href: '/manual/controls/shops' },
    { name: 'Friends', href: '/manual/controls/friends' },
    { name: 'Banks', href: '/manual/controls/banks' },
    { name: 'Options', href: '/manual/controls/options' }
];

function ListScrollList(props) {
    const items = props.items;

    return (
        <ul class="rsc-list-scroll-list">
            {items.map(({ name, href }) => {
                return <li><Link href={href}>{name}</Link></li>;
            })}
        </ul>
    );
}

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
