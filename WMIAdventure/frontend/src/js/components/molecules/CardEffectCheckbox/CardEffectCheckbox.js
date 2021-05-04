import React from 'react';
import StyledWrapper from './StyledWrapper';
import CardTargetInput from '../../atoms/CardTargetInput';
import CardPowerInput from '../../atoms/CardPowerInput';

function CardEffectCheckbox({name, label, power}) {

    const [checked, setChecked] = React.useState(false);

    const handleChange = (event) => {
        setChecked(event.target.checked);
    };

    function cardTargetInputRender() {
        if (checked) {
            return (
                <CardTargetInput parentName={name} />
            );
        }
    }

    function cardPowerInputRender() {
        if (checked && power) {
            return (
                <CardPowerInput parentName={name} />
            );
        }
    }

    return (
        <StyledWrapper>
            <div>
                <label htmlFor={name}>
                    {label}
                </label>
                <input id={name} type='checkbox' name={name} onChange={handleChange}/>
            </div>
            {cardTargetInputRender()}
            {cardPowerInputRender()}
        </StyledWrapper>
    );
}

export default CardEffectCheckbox;