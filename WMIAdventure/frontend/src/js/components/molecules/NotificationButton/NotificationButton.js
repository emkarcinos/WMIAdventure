import React from 'react';
import './NotificationButton.scss';

import notification from '../../../../assets/icons/notification.svg';
import Notifications from '../Notifications';

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
            <button className='NotificationButton' onClick={() => {toggleNotifications();}}>
                <img className='NotificationButton__icon' src={notification} alt='Ikona powiadomień - dzwoneczek.'/>
            </button>
            {showNotificatios()}
        </>
    );
}

export default NotificationButton;