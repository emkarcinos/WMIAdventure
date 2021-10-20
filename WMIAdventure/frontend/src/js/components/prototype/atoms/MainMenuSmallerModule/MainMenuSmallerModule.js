import React from 'react';
import Wrapper from './styled-components/Wrapper';
import Label from './styled-components/Label';
import Paragraph from './styled-components/Paragraph';
import Decorate from './styled-components/Decorate';
import Time from './styled-components/Time';

function decorateHandler(decorate, alt) {
    if (decorate !== false) {
        return (
            <Decorate src={decorate} alt={alt} />
        );
    }
}

function timeLabelHandler(time) {
    if (time !== false) {
        return (
            <Time>
                {time}
            </Time>
        );
    }
}

function MainMenuSmallerModule({link, label, decorate, alt, describe, time}) {
    return (
        <Wrapper to={link}>
            <Label>
                {label}
            </Label>
            {decorateHandler(decorate, alt)}
            {timeLabelHandler(time)}
            <Paragraph>
                {describe}
            </Paragraph>
        </Wrapper>
    );
}

export default MainMenuSmallerModule;