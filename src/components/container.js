import Link from 'next/link';

const SOCIAL_LINKS = [
    {
        name: 'GitHub',
        href: 'https://github.com/2003scape',
        image: '/social/github.png',
        title: 'Fork us on GitHub!'
    },
    {
        name: 'Discord',
        href: 'https://discord.gg/zbZAXRAg2p',
        image: '/social/discord.png',
        title: 'Chat with the 2003Scape community on Discord'
    },
    {
        name: 'Reddit',
        href: 'https://reddit.com/r/2003scape',
        image: '/social/reddit.png',
        title: 'Subscribe to /r/2003scape'
    },
    {
        name: 'YouTube',
        href: 'https://www.youtube.com/channel/UCOVznMz6bUC-v2zzy7d2m3w',
        image: '/social/youtube.png',
        title: 'Watch the latest 2003Scape videos'
    },
    {
        name: 'RuneScape Classic Wiki',
        href: 'https://classic.runescape.wiki',
        image: '/social/wiki.png',
        title: 'Collaborate with other RuneScape Classic enthusaists'
    }
];

function SocialLinks(props) {
    return (
        <nav className="rsc-inline-links rsc-social-links">
            <ul aria-label="Social media links">
                {props.links.map((props, i) => {
                    return (
                        <li key={i}>
                            <a href={props.href} title={props.title}>
                                <img
                                    src={props.image}
                                    alt={`Logo for ${props.name}`}
                                />
                            </a>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}

export default function Container(props) {
    return (
        <div className="rsc-container">
            <div className="rsc-border-top rsc-border-bar"></div>
            <div className="rsc-wrap">
                <div className="rsc-row">
                    <div className="rsc-col rsc-col-100">
                        <div className="rsc-box rsc-header-box">
                            <SocialLinks links={SOCIAL_LINKS} />
                            <Link href="/login">
                                <a
                                    className="rsc-link"
                                    title="Log into or create a RuneScape account."
                                    style={{ lineHeight: '24px' }}
                                >
                                    Login
                                </a>
                            </Link>
                            <div style={{ clear: 'left' }} />
                        </div>
                    </div>
                </div>
                {props.children}
            </div>
            <footer className="rsc-footer">
                This webpage and its contents is copyright 2003 Jagex Ltd
                <br />
                <a className="rsc-link" href="https://github.com/2003scape">
                    2003scape source code
                </a>
                &nbsp; - Licensed under the&nbsp;
                <a
                    className="rsc-link"
                    href="https://www.gnu.org/licenses/agpl-3.0.html"
                >
                    AGPL-3.0+
                </a>
            </footer>
            <div className="rsc-border-bottom rsc-border-bar"></div>
        </div>
    );
}
