import React from 'react';
import './Logo.scss';
import {Link} from 'react-router-dom';

import logo from '../../../../assets/icons/logo.svg';

function Logo() {
    return (
        <div className='Logo'>
            <Link className='Logo__link' to={'/'}>
                <img className='Logo__icon' src={logo} alt='Logo Wmi Adventure.'/>
                <h1 className='Logo__header'>
                    WMI Adventure
                </h1>
            </Link>
        </div>
    );
}

export default Logo;