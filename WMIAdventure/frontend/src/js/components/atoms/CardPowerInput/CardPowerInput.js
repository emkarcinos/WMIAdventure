import React from 'react';

function CardPowerInput({parentName}) {
    return (
        <fieldset>
            <legend>
                Moc:
            </legend>
            <div>
                <label htmlFor={`${parentName}-min-power`}>
                    Minimalna wartość efektu
                </label>
                <input id={`${parentName}-min-power`} name={`${parentName}-min-power`} type='number'/>
            </div>
            <div>
                <label htmlFor={`${parentName}-max-power`}>
                    Maksymalna wartość efektu
                </label>
                <input id={`${parentName}-max-power`} name={`${parentName}-max-power`} type='number'/>
            </div>
        </fieldset>
    );
}

export default CardPowerInput;