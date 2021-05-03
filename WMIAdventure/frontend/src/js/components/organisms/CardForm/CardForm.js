import React from 'react';
import StyledWrapper from './StyledWrapper';
import CardDescribeForm from './CardDescribeForm';
import CardEffectForm from './CardEffectForm/CardEffectForm';

function CardForm() {
    return (
        <StyledWrapper>
            <CardDescribeForm />
            <CardEffectForm />
        </StyledWrapper>
    );
}

export default CardForm;