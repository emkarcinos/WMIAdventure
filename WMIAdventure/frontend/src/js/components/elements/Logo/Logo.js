import React from 'react';
import './Logo.scss';

import logo from '../../../../assets/icons/logo.svg';

function Logo() {
    return (
        <div className="Logo">
            <img className="Logo__icon" src={logo} alt="Logo Wmi Adventure."/>
            <h1 className="Logo__header">
                WMI Adventure
            </h1>
        </div>
    );
}

export default Logo;