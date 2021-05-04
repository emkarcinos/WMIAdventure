import React from 'react';

function CardTargetInput({parentName}) {
    return (
        <fieldset>
            <legend>
                Cel:
            </legend>
            <div>
                <label htmlFor={`${parentName}-enemy`}>
                    przeciwnik
                </label>
                <input id={`${parentName}-enemy`} name='target' value={`${parentName}-enemy`} type='radio'/>
            </div>
            <div>
                <label htmlFor={`${parentName}-owner`}>
                    właściciel
                </label>
                <input id={`${parentName}-owner`} name='target' value={`${parentName}-owner`} type='radio'/>
            </div>
        </fieldset>
    );
}

export default CardTargetInput;