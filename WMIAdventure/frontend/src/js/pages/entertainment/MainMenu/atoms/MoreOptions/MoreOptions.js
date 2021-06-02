import React from 'react';
import StyledMoreOptions from './StyledMoreOptions';
import {Link} from 'react-router-dom';

function MoreOptions() {
    return (
        <StyledMoreOptions>
            <StyledMoreOptions.List>
                <StyledMoreOptions.Paragraph border>
                    Dźwięki&nbsp;&nbsp;&nbsp;&nbsp;Wł.
                </StyledMoreOptions.Paragraph>
                <StyledMoreOptions.Paragraph>
                    Zgłoś błąd
                </StyledMoreOptions.Paragraph>
                <StyledMoreOptions.Paragraph border>
                    Repozytorium
                </StyledMoreOptions.Paragraph>
                <StyledMoreOptions.Paragraph as={Link} to={'/history-creator'}>
                    Edytor Historii
                </StyledMoreOptions.Paragraph>
                <StyledMoreOptions.Paragraph as={Link} to={'/cards-creator-start'}>
                    Edytor Kart
                </StyledMoreOptions.Paragraph>
                <StyledMoreOptions.Paragraph as={Link} border to={'/answer-creator'}>
                    Edytor Quizu
                </StyledMoreOptions.Paragraph>
                <StyledMoreOptions.Paragraph last>
                    Wyloguj
                </StyledMoreOptions.Paragraph>
            </StyledMoreOptions.List>
        </StyledMoreOptions>
    );
}

export default MoreOptions;