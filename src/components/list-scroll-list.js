import Link from 'next/link';

export default function ListScrollList(props) {
    const items = props.items;

    return (
        <ul class="rsc-list-scroll-list">
            {items.map(({ name, href }, i) => {
                return <li key={i}><Link href={href}>{name}</Link></li>;
            })}
        </ul>
    );
}

