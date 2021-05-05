import React from 'react';
import StyledFieldset from './StyledFieldset';

function CardTargetInput({parentName}) {
    return (
        <StyledFieldset>
            <legend>
                Cel:
            </legend>
            <StyledFieldset.Container>
                <StyledFieldset.Label htmlFor={`${parentName}-enemy`}>
                    przeciwnik
                </StyledFieldset.Label>
                <input id={`${parentName}-enemy`} name='target' value={`${parentName}-enemy`} type='radio'/>
            </StyledFieldset.Container>
            <StyledFieldset.Container last>
                <StyledFieldset.Label htmlFor={`${parentName}-owner`}>
                    właściciel
                </StyledFieldset.Label>
                <input id={`${parentName}-owner`} name='target' value={`${parentName}-owner`} type='radio'/>
            </StyledFieldset.Container>
        </StyledFieldset>
    );
}

export default CardTargetInput;