import React from 'react';
import StyledFieldset from './StyledFieldset';
import CardEffectCheckbox from '../../molecules/CardEffectCheckbox';

function CardEffectInputs() {
    const [effects, setEffects] = React.useState([]);
    const API = process.env['REACT_APP_API_URL'];

    React.useEffect(() => {
        fetch(`http://${API}/api/cards/card-effect/`)
            .then(response => {
                return response.json();
            })
            .then(data => setEffects(data))
            .catch(error => console.log(error));
    }, [API]);

    return (
        <StyledFieldset>
            <legend>
                Efekty karty
            </legend>
            {
                effects.map((elem) => {
                    return (
                        <CardEffectCheckbox key={`card-effect-${elem.id}`} name={elem.name} label={elem.name} />
                    );
                })
            }
        </StyledFieldset>
    );
}

export default CardEffectInputs;