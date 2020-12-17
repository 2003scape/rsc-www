import Link from 'next/link';

export default function PageName(props) {
    return (
        <header className="rsc-box rsc-header">
            <h1>{props.pageName}</h1>
            <Link href="./">
                <a className="rsc-link">Main menu</a>
            </Link>
        </header>
    );
}
