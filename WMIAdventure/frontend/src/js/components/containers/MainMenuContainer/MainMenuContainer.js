import React from 'react';
import './MainMenuContainer.scss';

function MainMenuContainer({children}) {
    return (
        <div className='MainMenuContainer'>
            {children}
        </div>
    );
}

export default MainMenuContainer;