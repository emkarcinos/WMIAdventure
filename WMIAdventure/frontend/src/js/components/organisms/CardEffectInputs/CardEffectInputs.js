import React from 'react';
import StyledFieldset from './StyledFieldset';
import CardEffectCheckbox from '../../molecules/CardEffectCheckbox';
import effectsData from './effectsData';

function CardEffectInputs() {
    return (
        <StyledFieldset>
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
        </StyledFieldset>
    );
}

export default CardEffectInputs;