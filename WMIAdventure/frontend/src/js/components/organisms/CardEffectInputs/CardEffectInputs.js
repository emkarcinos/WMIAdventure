import React from 'react';
import StyledWrapper from './StyledWrapper';
import CardEffectCheckbox from '../../molecules/CardEffectCheckbox';
import effectsData from './effectsData';

function CardEffectInputs() {
    return (
        <StyledWrapper>
            <legend>
                Efekty karty
            </legend>
            {
                effectsData.map((elem) => {
                    return (
                        <CardEffectCheckbox key={`card-effect-${elem.id}`} name={elem.name} label={elem.label} power={elem.power} />
                    );
                })
            }
        </StyledWrapper>
    );
}

export default CardEffectInputs;