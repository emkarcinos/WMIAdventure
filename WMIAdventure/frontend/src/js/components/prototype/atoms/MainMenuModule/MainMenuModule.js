import React from 'react';
import Wrapper from './styled-components/Wrapper';
import Image from './styled-components/Image';
import Header from './styled-components/Header';
import Describe from './styled-components/Describe';

function MainMenuModule({img, alt, header, describe, link}) {
    return (
        <Wrapper to={link}>
            <Image src={img} alt={alt}/>
            <Header>
                {header}
            </Header>
            <Describe>
                {describe}
            </Describe>
        </Wrapper>
    );
}

export default MainMenuModule;