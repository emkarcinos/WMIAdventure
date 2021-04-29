import React from 'react';
import './NotificationButton.scss';

import notification from '../../../../assets/icons/notification.svg';

function NotificationButton() {
    return (
        <button className='NotificationButton' onClick={() => {console.log('notification button clicked');}}>
            <img className='NotificationButton__icon' src={notification} alt='Ikona powiadomień - dzwoneczek.'/>
        </button>
    );
}

export default NotificationButton;