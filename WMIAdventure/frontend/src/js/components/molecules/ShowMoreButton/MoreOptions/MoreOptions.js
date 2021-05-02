import React from 'react';
import {Link} from 'react-router-dom';
import './MoreOptions.scss';

function MoreOptions() {
    return (
        <div className='MoreOptions'>
            <ul className='MoreOptions__list'>
                <p className='MoreOptions__paragraph MoreOptions__paragraph--border'>
                    Dźwięki&nbsp;&nbsp;&nbsp;&nbsp;Wł.
                </p>
                <p className='MoreOptions__paragraph'>
                    Zgłoś błąd
                </p>
                <p className='MoreOptions__paragraph MoreOptions__paragraph--border'>
                    Repozytorium
                </p>
                <Link className='MoreOptions__paragraph' to={'/history-creator'}>
                    Edytor Historii
                </Link>
                <Link className='MoreOptions__paragraph' to={'/cards-creator'}>
                    Edytor Kart
                </Link>
                <Link className='MoreOptions__paragraph  MoreOptions__paragraph--border' to={'/answer-creator'}>
                    Edytor Quizu
                </Link>
                <p className='MoreOptions__paragraph MoreOptions__paragraph--last'>
                    Wyloguj
                </p>
            </ul>
        </div>
    );
}

export default MoreOptions;