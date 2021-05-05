import React from 'react';
import StyledFieldset from './StyledFieldset';

function CardDescribeInputs() {
    return (
        <StyledFieldset>
            <StyledFieldset.Legend>
                Karta
            </StyledFieldset.Legend>
            <StyledFieldset.Paragraph>
                <StyledFieldset.Label htmlFor='name'>
                    Nazwa:
                </StyledFieldset.Label>
                <input id='name' type='text' name='name'/>
            </StyledFieldset.Paragraph>
            <StyledFieldset.Paragraph>
                <StyledFieldset.Label htmlFor='category'>
                    Kategoria:
                </StyledFieldset.Label>
                <input id='category' type='text' name='category'/>
            </StyledFieldset.Paragraph>
            <StyledFieldset.Paragraph>
                <StyledFieldset.Label htmlFor='rarity'>
                    Rzadkość:
                </StyledFieldset.Label>
                <input id='rarity' type='text' name='rarity'/>
            </StyledFieldset.Paragraph>
            <StyledFieldset.Label textarea htmlFor='describe'>
                Opis Karty:
            </StyledFieldset.Label>
            <StyledFieldset.Textarea id='describe' name='describe'>
                {/*textarea*/}
            </StyledFieldset.Textarea>
        </StyledFieldset>
    );
}

export default CardDescribeInputs;