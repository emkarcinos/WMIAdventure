import React from 'react';
import StyledWrapper from './StyledWrapper';

function CardEffectForm() {
    return (
        <StyledWrapper>
            <legend>
                Efekty karty
            </legend>
            <div>
                <label htmlFor='damage-enemy'>
                    zadawanie obr. przeciwnikowi
                </label>
                <input id='damage-enemy' type='checkbox' name='damage-enemy'/>
            </div>
            <div>
                <label htmlFor='damage-self'>
                    zadawanie obr. sobie
                </label>
                <input id='damage-self' type='checkbox' name='damage-self'/>
            </div>
        </StyledWrapper>
    );
}

export default CardEffectForm;