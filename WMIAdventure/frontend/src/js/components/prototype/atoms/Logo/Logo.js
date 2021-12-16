import React from 'react';
import Wrapper from './styled-components/Wrapper';
import Link from './styled-components/Link';
import Image from './styled-components/Image';
import Header from './styled-components/Header';
import logo from '../../../../../assets/icons/logo.svg';

function LogoImage() {
    return (
        <Wrapper className='Logo'>
            <Link to={'/'}>
                <Image src={logo} alt='LogoImage Wmi Adventure.'/>
                <Header>
                    WMI Adventure
                </Header>
            </Link>
        </Wrapper>
    );
}

export default Logo;