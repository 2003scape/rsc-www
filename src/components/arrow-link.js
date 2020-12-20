import Link from 'next/link';
import React from 'react';

export default function ArrowLink(props) {
    const child = React.createElement(props.href ? 'a' : 'button', {
        className:
            (props.className ? props.className + ' ' : '') +
            'rsc-arrow' +
            (props.direction === 'back' ? ' rsc-arrow-back' : '') +
            (props.disabled ? ' rsc-disabled' : ''),
        ...props,
        direction: null
    });

    return props.href ? <Link href={props.href}>{child}</Link> : child;
}
