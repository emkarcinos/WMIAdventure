import React from 'react';
import './FlexCenterContainer.scss';

function FlexCenterContainer({children}) {
    return (
        <div className='FlexCenterContainer'>
            {children}
        </div>
    );
}

export default FlexCenterContainer;