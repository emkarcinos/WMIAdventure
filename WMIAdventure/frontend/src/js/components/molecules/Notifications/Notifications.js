import React from 'react';
import StyledNotifications from './StyledNotifications';

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
        <StyledNotifications>
            <StyledNotifications.List>
                {notifications.map((elem, index) => {
                    return (
                        <StyledNotifications.Item key={`notifaction-${index}`}>
                            <StyledNotifications.Header>
                                {elem.header}
                            </StyledNotifications.Header>
                            <StyledNotifications.Paragraph>
                                {elem.paragraph}
                            </StyledNotifications.Paragraph>
                        </StyledNotifications.Item>
                    );
                })}
            </StyledNotifications.List>
        </StyledNotifications>
    );
}

export default Notifications;