import Link from 'next/link';
import React, { useState } from 'react';

export default function DropDown(props) {
    const [isVisible, setVisible] = useState(false);

    const [oldButton] = props.children;

    const button = React.cloneElement(oldButton, {
        onClick: () => setVisible(!isVisible)
    });

    return (
        <div className="rsc-drop-down">
            {button}
            <ul
                className="rsc-drop-down-links"
                style={{
                    display: isVisible ? 'block' : 'none'
                }}
            >
                {props.children.slice(1).map((a, i) => {
                    a = React.cloneElement(
                        a,
                        {
                            ...a.props,
                            className: (a.props.className || '') + ' rsc-link'
                        },
                        a.props.children
                    );

                    return (
                        <li key={i}>
                            <Link href={a.props.href}>{a}</Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
