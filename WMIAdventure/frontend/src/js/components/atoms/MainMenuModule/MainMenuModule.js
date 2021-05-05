import React from 'react';
import StyledLink from './StyledLink';

function MainMenuModule({img, alt, header, describe, link}) {
    return (
        <StyledLink to={link}>
            <StyledLink.Image src={img} alt={alt}/>
            <StyledLink.Header>
                {header}
            </StyledLink.Header>
            <StyledLink.Describe>
                {describe}
            </StyledLink.Describe>
        </StyledLink>
    );
}

export default MainMenuModule;