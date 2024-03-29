import Link from 'next/link';

export default function ButtonWheel(props) {
    const buttons = props.links.map(({ href, name, title }, i) => {
        return (
            <Link key={i} href={href}>
                <a className="rsc-button rsc-stone-button" title={title}>
                    {name}
                </a>
            </Link>
        );
    });

    buttons.unshift(
        <Link key={buttons.length} href="/play">
            <a
                className="rsc-button rsc-play-button"
                title="Start or continue your RuneScape adventure"
            >
                Play Game
            </a>
        </Link>
    );

    return <nav className="rsc-button-wheel">{buttons}</nav>;
}
