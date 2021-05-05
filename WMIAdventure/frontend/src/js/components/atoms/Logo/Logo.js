import React from 'react';
import StyledLogo from './StyledLogo/StyledLogo';
import logo from '../../../../assets/icons/logo.svg';

function Logo() {
    return (
        <StyledLogo className='Logo'>
            <StyledLogo.Link to={'/'}>
                <StyledLogo.Image src={logo} alt='Logo Wmi Adventure.'/>
                <StyledLogo.Header>
                    WMI Adventure
                </StyledLogo.Header>
            </StyledLogo.Link>
        </StyledLogo>
    );
}

export default Logo;