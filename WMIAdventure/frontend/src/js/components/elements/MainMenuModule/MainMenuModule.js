import React from 'react';
import {Link} from 'react-router-dom';
import './MainMenuModule.scss';

function MainMenuModule({img, alt, header, describe, link}) {
    return (
        <Link className='MainMenuModule' to={link}>
            <img className='MainMenuModule__image' src={img} alt={alt}/>
            <p className='MainMenuModule__header'>
                {header}
            </p>
            <p className='MainMenuModule__describe'>
                {describe}
            </p>
        </Link>
    );
}

export default MainMenuModule;