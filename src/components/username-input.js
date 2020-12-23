import { USERNAME_REGEX } from '../username';
import React from 'react';

export default function UsernameInput(props) {
    return React.createElement('input', {
        ...props,
        className: `${props.className ? props.className + ' ' : '' }rsc-input`,
        type: 'text',
        required: true,
        pattern: USERNAME_REGEX,
        minLength: 3,
        maxLength: 12
    });
}
