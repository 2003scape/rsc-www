import Container from '../../components/container';
import Header from '../../components/header';
import Link from 'next/link';
import MediaBox from '../../components/media-box';
import PageName from '../../components/page-name';
import chunk from 'chunk';
import rules from '@2003scape/rsc-manuals/rules';

const PAGE_TITLE = 'Rules of Conduct';

function RuleMediaBoxes(props) {
    const { rules } = props;
    let rule = 0;

    return (
        <>
            {chunk(rules, 2).map((row, i) => {
                return (
                    <div className="rsc-row" key={i}>
                        {row.map(({ name, body, image }) => {
                            image = `/manual-images/${image}`;
                            rule += 1;

                            return (
                                <MediaBox
                                    src={image}
                                    smallImage={true}
                                    key={rule}
                                >
                                    <h2 className="rsc-stone-box">{name}</h2>
                                    <strong>Rule {rule}.</strong>
                                    <br />
                                    {body}
                                </MediaBox>
                            );
                        })}
                    </div>
                );
            })}
        </>
    );
}

export default function ManualRules() {
    const pageTitle = `${PAGE_TITLE} - RuneScape Manual`;

    return (
        <div>
            <Header pageName={pageTitle} />
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
                        <p>
                            To keep RuneScape enjoyable for everyone there
                            are&nbsp;<strong>eleven</strong> rules you must
                            observe.
                            <br />
                            We won't tolerate disruptive players, and if you
                            break our rules you will be banned. <br />
                            Members who are banned for breaking our rules are
                            not entitled to any sort of refund.
                        </p>
                    </div>
                </div>
                <div className="rsc-row">
                    <div
                        className="rsc-col rsc-col-100"
                        style={{ maxWidth: '540px' }}
                    >
                        <RuleMediaBoxes rules={rules} />
                    </div>
                </div>
            </Container>
        </div>
    );
}
