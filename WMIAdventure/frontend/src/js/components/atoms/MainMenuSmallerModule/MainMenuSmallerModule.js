import React from 'react';
import StyledLink from './StyledLink';

function decorateHandler(decorate, alt) {
    if (decorate !== false) {
        return (
            <StyledLink.Decorate src={decorate} alt={alt} />
        );
    }
}

function timeLabelHandler(time) {
    if (time !== false) {
        return (
            <StyledLink.Time>
                {time}
            </StyledLink.Time>
        );
    }
}

function MainMenuSmallerModule({link, label, decorate, alt, describe, time}) {
    return (
        <StyledLink to={link}>
            <StyledLink.Label>
                {label}
            </StyledLink.Label>
            {decorateHandler(decorate, alt)}
            {timeLabelHandler(time)}
            <StyledLink.Paragraph>
                {describe}
            </StyledLink.Paragraph>
        </StyledLink>
    );
}

export default MainMenuSmallerModule;