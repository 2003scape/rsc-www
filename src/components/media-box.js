import Link from 'next/link';
import React from 'react';

export default function MediaBox(props) {
    const smallImage = !!props.smallImage;

    const content = (
        <div className="rsc-box" style={{ padding: '8px' }}>
            {props.children[0]}
            <div className="rsc-row">
                {props.src ? (
                    <div
                        className={`rsc-col rsc-col-${smallImage ? 36 : 50}`}
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        <img src={props.src} alt={props.alt} />
                    </div>
                ) : undefined}
                <div
                    className={`rsc-col rsc-col-${
                        props.src ? (smallImage ? 64 : 50) : 100
                    }`}
                    style={{
                        textAlign: props.src ? 'left' : 'center'
                    }}
                >
                    {props.children.slice(1)}
                </div>
            </div>
        </div>
    );

    const wrapProps = {
        className: 'rsc-col rsc-col-50 rsc-media-box',
        style: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }
    };

    const wrap = props.href
        ? React.createElement('a', wrapProps, content)
        : React.createElement('div', wrapProps, content);

    return props.href ? <Link href={props.href}>{wrap}</Link> : wrap;
}
