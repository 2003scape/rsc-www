import DropDown from './drop-down';
import Link from 'next/link';
import { SessionContext } from '../contexts/session';
import { formatUsername } from '../username';
import { useContext } from 'react';

const SOCIAL_LINKS = [
    {
        name: 'Home',
        href: '/',
        image: 'home.png',
        title: 'Homepage'
    },
    {
        name: 'GitHub',
        href: 'https://github.com/rsc2003',
        image: '/social/github.png',
        title: 'Find us on GitHub!'
    },
    {
        name: 'Discord',
        href: 'https://discord.gg/GgwXrxjxNa',
        image: '/social/discord.png',
        title: 'Chat with the rsc2003 community on Discord'
    },
    {
        name: 'Twitter',
        href: 'https://twitter.com/rsc2003',
        image: '/social/twitter.png',
        title: 'rsc2003.com on twitter'
    }
];

function SocialLinks(props) {
    return (
        <nav className="rsc-inline-links rsc-social-links">
            <ul>
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
    const { user } = useContext(SessionContext);
    const isLoggedIn = user && user.id;
    const isModerator = user && user.rank === 3;

    const crown = isModerator ? (
        <>
            <img
                style={{ verticalAlign: 'middle' }}
                src="/moderator-crown.png"
                alt="Moderator crown"
            />
            &nbsp;
        </>
    ) : undefined;

    const userLink = isLoggedIn ? (
        <>
            Logged in as&nbsp;
            <DropDown>
                <button className="rsc-link">
                    {crown}
                    {formatUsername(user.username)}
                </button>
                <a href="/support">Account Support</a>
                <a href={`/hiscores?name=${user.username}`}>Hiscores</a>
                <a href="/logout">Logout</a>
            </DropDown>
            .
        </>
    ) : (
        <>
            <Link href="/login">
                <a
                    className="rsc-link rsc-small-block rsc-small-spaced"
                    title="Securely log in to the website."
                >
                    Login
                </a>
            </Link>
            <Link href="/register">
                <a
                    className="rsc-register-link rsc-small-block rsc-small-spaced"
                    title="Create a RuneScape account."
                >
                    Connect Wallet
                </a>
            </Link>
        </>
    );

    return (
        <div className="rsc-container">
            <div className="rsc-border-top rsc-border-bar"></div>
            <div className="rsc-wrap">
                <div className="rsc-row">
                    <div className="rsc-col rsc-col-100">
                        <div className="rsc-box rsc-header-box">
                            <SocialLinks links={SOCIAL_LINKS} />
                            <span style={{ lineHeight: '16px' }}>
                                {userLink}
                            </span>
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
                &nbsp;copyright {new Date().getFullYear()} and licensed under
                the&nbsp;
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
