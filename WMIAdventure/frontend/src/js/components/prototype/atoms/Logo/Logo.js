import React from 'react';
import Wrapper from './styled-components/Wrapper';
import Link from './styled-components/Link';
import Image from './styled-components/Image';
import Header from './styled-components/Header';
import logo from '../../../../../assets/icons/logo.svg';

function Logo() {
    return (
        <Wrapper className='Logo'>
            <Link to={'/'}>
                <Image src={logo} alt='Logo Wmi Adventure.'/>
                <Header>
                    WMI Adventure
                </Header>
            </Link>
        </Wrapper>
    );
}

export default Logo;