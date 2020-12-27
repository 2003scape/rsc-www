import Container from '../components/container';
import Header from '../components/header';
import PageName from '../components/page-name';

const PAGE_TITLE = '404 - Page not found';

export default function NotFound() {
    return (
        <div>
            <Header pageName={PAGE_TITLE} />
            <Container>
                <PageName pageName={PAGE_TITLE} />
                <div className="rsc-row">
                    <div className="rsc-col rsc-col-75">
                        <div className="rsc-box">
                            <p>Nothing interesting happens.</p>
                            <p>Page not found.</p>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
}
