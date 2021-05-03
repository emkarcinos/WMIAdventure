import React from 'react';
import './Notifications.scss';

const notifications = [
    {
        header: 'Zgłoszona zawartość',
        paragraph: 'Zgłoszona przez Ciebie karta “Całka Riennmana” została zaakceptowana! Możesz ją teraz zdobyć w aplikacji!'
    },
    {
        header: 'Zgłoszona zawartość',
        paragraph: 'Zgłoszona przez Ciebie karta “Całka Riennmana” została zaakceptowana! Możesz ją teraz zdobyć w aplikacji!'
    },
    {
        header: 'Quizy',
        paragraph: 'Dzisiejszy Quiz jest dostępny! Rozwiąż go i zdobąć Punkty Umiejętności!'
    },
    {
        header: 'Event',
        paragraph: 'Dzisiejszy event jest dostępny! Zdobądź PU i unikalną kartę!'
    },
];

function Notifications() {
    return (
        <div className='Notifications'>
            <ul className='Notifications__list'>
                {notifications.map((elem, index) => {
                    return (
                        <li className='Notifications__item' key={`notifaction-${index}`}>
                            <p className='Notifications__header'>
                                {elem.header}
                            </p>
                            <p className='Notifications__paragraph'>
                                {elem.paragraph}
                            </p>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default Notifications;