import Link from 'next/link';

export default function PageName(props) {
    return (
        <div className="rsc-row">
            <header className="rsc-box rsc-col rsc-header">
                <h1>{props.pageName}</h1>
                <Link href="/">
                    <a className="rsc-link rsc-small-block rsc-small-spaced">
                        Main menu
                    </a>
                </Link>
                {props.children ? ' - ' : ''}
                {props.children}
            </header>
        </div>
    );
}
