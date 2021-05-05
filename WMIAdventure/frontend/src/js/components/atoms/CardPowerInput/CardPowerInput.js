import React from 'react';
import StyledFieldset from './StyledFieldset';
import Label from './StyledFieldset/Label';

function CardPowerInput({parentName}) {
    return (
        <StyledFieldset>
            <legend>
                Moc:
            </legend>
            <StyledFieldset.Container>
                <Label htmlFor={`${parentName}-power`}>
                    Wartość efektu
                </Label>
                <input id={`${parentName}-power`} name={`${parentName}-power`} type='number'/>
            </StyledFieldset.Container>
            <StyledFieldset.Container last>
                <Label last htmlFor={`${parentName}-range`}>
                    Zasięg efektu
                </Label>
                <input id={`${parentName}-range`} name={`${parentName}-range`} type='number'/>
            </StyledFieldset.Container>
        </StyledFieldset>
    );
}

export default CardPowerInput;