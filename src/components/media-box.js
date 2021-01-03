import Link from 'next/link';
import React from 'react';

export default function MediaBox(props) {
    const smallImage = !!props.smallImage;

    const content = (
        <div className="rsc-box">
            <div>
                {props.children[0]}
                <div className="rsc-row">
                    {props.src ? (
                        <div
                            className={`rsc-col rsc-col-${
                                smallImage ? 36 : 50
                            }`}
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                padding: '4px'
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
                            textAlign: props.src ? 'left' : 'center',
                            padding: '0 4px 0 0'
                        }}
                    >
                        {props.children.slice(1)}
                    </div>
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
