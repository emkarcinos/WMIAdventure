import React from 'react';
import StyledWrapper from './StyledWrapper';
import CardDescribeInputs from '../../molecules/CardDescribeInputs';
import CardEffectInputs from '../CardEffectInputs/CardEffectInputs';

function CardForm() {
    const API_URL = process.env['REACT_APP_API_URL'];
    return (
        <StyledWrapper method='post' action={API_URL}>
            <CardDescribeInputs />
            <CardEffectInputs />
            <button type='submit'>
                Wyślij do administracji.
            </button>
        </StyledWrapper>
    );
}

export default CardForm;