import React from 'react';

import notificationIcon from '../../../../../assets/icons/notification.svg';
import Notifications from '../Notifications';
import Wrapper from './styled-components/Wrapper';
import Image from './styled-components/Image';

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
            <Wrapper onClick={() => {toggleNotifications();}}>
                <Image src={notificationIcon} alt='Ikona powiadomień - dzwoneczek.'/>
            </Wrapper>
            {showNotificatios()}
        </>
    );
}

export default NotificationButton;