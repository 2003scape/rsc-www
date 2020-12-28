import Link from 'next/link';

export default function PageName(props) {
    return (
        <header className="rsc-box rsc-header">
            <h1>{props.pageName}</h1>
            <Link href="/">
                <a className="rsc-link rsc-small-block">Main menu</a>
            </Link>
            {props.children ? ' - ' : ''}
            {props.children}
        </header>
    );
}
