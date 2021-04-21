import React from 'react';
import {Link} from 'react-router-dom';
import './MainMenuSmallerModule.scss';

function decorateHandler(decorate, alt) {
    if (decorate !== false) {
        return (
            <img className='MainMenuSmallerModule__decorate' src={decorate} alt={alt} />
        );
    }
}

function timeLabelHandler(time) {
    if (time !== false) {
        return (
            <p className='MainMenuSmallerModule__time'>
                {time}
            </p>
        );
    }
}

function MainMenuSmallerModule({label, decorate, alt, describe, time}) {
    return (
        <Link className='MainMenuSmallerModule'>
            <p className='MainMenuSmallerModule__label'>
                {label}
            </p>
            {decorateHandler(decorate, alt)}
            {timeLabelHandler(time)}
            <p className='MainMenuSmallerModule__describe'>
                {describe}
            </p>

        </Link>
    );
}

export default MainMenuSmallerModule;