const markdown = require('markdown-it')({
    breaks: true,
    html: true,
    linkify: true
});

import Container from './container';
import Header from './header';
import Link from 'next/link';
import PageName from './page-name';
import manuals from '@2003scape/rsc-manuals';

export default function ManualEntry(props) {
    const pageTitle = `${props.title} - About RuneScape - RuneScape Manual`;

    const manualHTML = {
        __html: markdown.render(manuals[props.section][props.manual])
    };

    return (
        <div>
            <Header pageName={pageTitle} />
            <Container>
                <PageName pageName={props.title}>
                    <Link href={`/manual/${props.section}`}>
                        <a className="rsc-link rsc-small-block rsc-small-spaced">
                            {props.sectionName}
                        </a>
                    </Link>
                </PageName>
                <div className="rsc-row">
                    <div className="rsc-col rsc-col-75">
                        <div
                            className="rsc-box rsc-article-box"
                            dangerouslySetInnerHTML={manualHTML}
                        />
                    </div>
                </div>
            </Container>
        </div>
    );
}
