import React from 'react';
import StyledMoreOptions from './StyledMoreOptions';

function MoreOptions() {
    return (
        <StyledMoreOptions className='MoreOptions'>
            <StyledMoreOptions.List className='MoreOptions__list'>
                <StyledMoreOptions.Paragraph border>
                    Dźwięki&nbsp;&nbsp;&nbsp;&nbsp;Wł.
                </StyledMoreOptions.Paragraph>
                <StyledMoreOptions.Paragraph>
                    Zgłoś błąd
                </StyledMoreOptions.Paragraph>
                <StyledMoreOptions.Paragraph border>
                    Repozytorium
                </StyledMoreOptions.Paragraph>
                <StyledMoreOptions.Paragraph to={'/history-creator'}>
                    Edytor Historii
                </StyledMoreOptions.Paragraph>
                <StyledMoreOptions.Paragraph to={'/cards-creator'}>
                    Edytor Kart
                </StyledMoreOptions.Paragraph>
                <StyledMoreOptions.Paragraph border to={'/answer-creator'}>
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