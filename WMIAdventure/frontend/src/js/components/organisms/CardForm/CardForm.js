import React from 'react';
import StyledWrapper from './StyledWrapper';
import CardDescribeInputs from '../../molecules/CardDescribeInputs';
import CardEffectInputs from '../CardEffectInputs/CardEffectInputs';

function CardForm() {
    return (
        <StyledWrapper>
            <CardDescribeInputs />
            <CardEffectInputs />
        </StyledWrapper>
    );
}

export default CardForm;