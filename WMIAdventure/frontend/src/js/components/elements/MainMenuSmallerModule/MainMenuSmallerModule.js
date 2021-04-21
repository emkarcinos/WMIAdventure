import React from 'react';
import {Link} from 'react-router-dom';
import './MainMenuSmallerModule.scss';

function MainMenuSmallerModule({label, decorate, alt, describe, time}) {
    return (
        <Link className='MainMenuSmallerModule'>
            <p className='MainMenuSmallerModule__label'>
                {label}
            </p>
            <img className='MainMenuSmallerModule__decorate' src={decorate} alt={alt} />
            <p className='MainMenuSmallerModule__describe'>
                {describe}
            </p>
            <p className='MainMenuSmallerModule__time'>
                {time}
            </p>
        </Link>
    );
}

export default MainMenuSmallerModule;