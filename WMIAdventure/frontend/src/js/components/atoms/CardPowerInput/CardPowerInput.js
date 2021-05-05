import React from 'react';

function CardPowerInput({parentName}) {
    return (
        <fieldset>
            <legend>
                Moc:
            </legend>
            <div>
                <label htmlFor={`${parentName}-power`}>
                    Wartość efektu
                </label>
                <input id={`${parentName}-power`} name={`${parentName}-power`} type='number'/>
            </div>
            <div>
                <label htmlFor={`${parentName}-range`}>
                    Zasięg efektu
                </label>
                <input id={`${parentName}-range`} name={`${parentName}-range`} type='number'/>
            </div>
        </fieldset>
    );
}

export default CardPowerInput;