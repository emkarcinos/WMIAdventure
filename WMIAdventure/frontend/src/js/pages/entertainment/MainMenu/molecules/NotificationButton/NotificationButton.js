import React from 'react';

import notificationIcon from '../../../../../../assets/icons/notification.svg';
import Notifications from '../Notifications';
import StyledButton from './StyledButton';

function NotificationButton() {

    const [notifications, setNotifications] = React.useState(false);

    function toggleNotifications() {
        let newNotifications = !notifications;
        setNotifications(newNotifications);
    }

    function showNotificatios() {
        if(notifications) {
            return (
                <Notifications />
            );
        }
    }

    return (
        <>
            <StyledButton onClick={() => {toggleNotifications();}}>
                <StyledButton.Image src={notificationIcon} alt='Ikona powiadomień - dzwoneczek.'/>
            </StyledButton>
            {showNotificatios()}
        </>
    );
}

export default NotificationButton;