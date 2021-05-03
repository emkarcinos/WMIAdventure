import React from 'react';
import StyledWrapper from './StyledWrapper';

function CardEffectCheckbox({name, label}) {
    return (
        <StyledWrapper>
            <label htmlFor={name}>
                {label}
            </label>
            <input id={name} type='checkbox' name={name}/>
        </StyledWrapper>
    );
}

export default CardEffectCheckbox;