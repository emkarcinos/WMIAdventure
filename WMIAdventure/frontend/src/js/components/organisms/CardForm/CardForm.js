import React from 'react';
import StyledWrapper from './StyledWrapper';
import CardDescribeForm from '../../molecules/CardDescribeForm';
import CardEffectForm from '../../molecules/CardEffectForm/CardEffectForm';

function CardForm() {
    return (
        <StyledWrapper>
            <CardDescribeForm />
            <CardEffectForm />
        </StyledWrapper>
    );
}

export default CardForm;