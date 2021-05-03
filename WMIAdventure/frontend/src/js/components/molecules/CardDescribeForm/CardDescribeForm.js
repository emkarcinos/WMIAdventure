import React from 'react';
import StyledWrapper from './StyledWrapper';
import StyledTextareaLabel from './StyledTextareaLabel';

function CardDescribeForm() {
    return (
        <StyledWrapper>
            <legend>
                Karta
            </legend>
            <p>
                <label htmlFor='name'>
                    Nazwa:
                </label>
                <input id='name' type='text' name='name'/>
            </p>
            <p>
                <label htmlFor='category'>
                    Kategoria:
                </label>
                <input id='category' type='text' name='category'/>
            </p>
            <p>
                <label htmlFor='rarity'>
                    Rzadkość:
                </label>
                <input id='rarity' type='text' name='rarity'/>
            </p>
            <StyledTextareaLabel htmlFor='describe'>
                Opis Karty:
            </StyledTextareaLabel>
            <textarea id='describe' name='describe'>

            </textarea>
        </StyledWrapper>
    );
}

export default CardDescribeForm;