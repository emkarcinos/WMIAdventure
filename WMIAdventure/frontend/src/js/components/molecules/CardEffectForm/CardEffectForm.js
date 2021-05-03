import React from 'react';
import StyledWrapper from './StyledWrapper';
import CardEffectCheckbox from '../../atoms/CardEffectCheckbox';
import effectsData from './effectsData';

function CardEffectForm() {
    return (
        <StyledWrapper>
            <legend>
                Efekty karty
            </legend>
            {
                effectsData.map((elem) => {
                    return (
                        <CardEffectCheckbox key={`card-effect-${elem.id}`} name={elem.name} label={elem.label} />
                    );
                })
            }
        </StyledWrapper>
    );
}

export default CardEffectForm;