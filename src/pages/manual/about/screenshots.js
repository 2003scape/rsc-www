import Container from '../../../components/container';
import Header from '../../../components/header';
import Link from 'next/link';
import ModalImage from 'react-modal-image';
import PageName from '../../../components/page-name';
import screenshots from '@2003scape/rsc-manuals/screenshots';

const PAGE_TITLE = 'Screenshots';

function ScreenshotThumbnails(props) {
    const { screenshots } = props;

    return (
        <>
            {screenshots.map(({ section, images }) => {
                return (
                    <>
                        <h2>{section}</h2>
                        <section className="rsc-box rsc-thumbnails">
                            {images.map(({ src, caption }) => {
                                src = `/manual-images/screenshots/${src}`;

                                return (
                                    <figure className="rsc-image-thumbnail">
                                        <ModalImage
                                            small={src}
                                            large={src}
                                            alt={caption}
                                        />
                                        <figcaption>
                                            <em>{caption}</em>
                                        </figcaption>
                                    </figure>
                                );
                            })}
                        </section>
                    </>
                );
            })}
        </>
    );
}

export default function ManualScreenshots() {
    const pageTitle = `${PAGE_TITLE} - About RuneScape - RuneScape Manual`;

    return (
        <div>
            <Header pageName={pageTitle} />
            <Container>
                <PageName pageName={PAGE_TITLE}>
                    <Link href="/manual/about">
                        <a className="rsc-link rsc-small-block rsc-small-spaced">
                            About RuneScape
                        </a>
                    </Link>
                </PageName>
                <div className="rsc-row">
                    <div className="rsc-col rsc-col-75">
                        <ScreenshotThumbnails screenshots={screenshots} />
                    </div>
                </div>
            </Container>
        </div>
    );
}
