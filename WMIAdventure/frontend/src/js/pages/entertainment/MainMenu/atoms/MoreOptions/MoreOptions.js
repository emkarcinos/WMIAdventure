import React from 'react';
import {Link} from 'react-router-dom';
import Wrapper from './styled-components/Wrapper';
import List from './styled-components/List';
import Paragraph from './styled-components/Paragraph';

function MoreOptions() {
    return (
        <Wrapper>
            <List>
                <Paragraph border>
                    Dźwięki&nbsp;&nbsp;&nbsp;&nbsp;Wł.
                </Paragraph>
                <Paragraph>
                    Zgłoś błąd
                </Paragraph>
                <Paragraph border>
                    Repozytorium
                </Paragraph>
                <Paragraph as={Link} to={'/history-creator'}>
                    Edytor Historii
                </Paragraph>
                <Paragraph as={Link} to={'/cards-creator-start'}>
                    Edytor Kart
                </Paragraph>
                <Paragraph as={Link} border to={'/answer-creator'}>
                    Edytor Quizu
                </Paragraph>
                <Paragraph last>
                    Wyloguj
                </Paragraph>
            </List>
        </Wrapper>
    );
}

export default MoreOptions;