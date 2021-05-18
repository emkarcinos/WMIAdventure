import React from 'react';
import StyledForm from './StyledForm';
import Label from '../../atoms/CardPowerInput/StyledFieldset/Label';

function useInput(initialValue) {
    const [value, setValue] = React.useState(initialValue);

    const handleChange = (event) => {
        event.preventDefault();
        setValue(event.target.value);
    };

    return [value, handleChange];
}

function CardForm() {
    const API = process.env['REACT_APP_API_URL'];
    const [levels, setLevels] = React.useState([]);
    const [effects, setEffects] = React.useState([]);

    React.useEffect(() => {
        fetch(`http://${API}/api/cards/card-level/`)
            .then(response => {
                return response.json();
            })
            .then(data => setLevels(data))
            .catch(error => console.log(error));
    }, [API]);

    React.useEffect(() => {
        fetch(`http://${API}/api/cards/card-effect/`)
            .then(response => {
                return response.json();
            })
            .then(data => setEffects(data))
            .catch(error => console.log(error));
    }, [API]);

    const [cardName, handleCardNameChange] = useInput('');
    const [cardSubject, handleCardSubjectChange] = useInput('');
    const [cardTooltip, handleCardTooltipChange] = useInput('');
    const [cardImage, handleCardImageChange] = useInput(null);
    const [newLevels, handleNewLevelsChange] = useInput([]);
    const [costs, handleCostsChange] = useInput([]);
    const [newEffects, handleNewEffectsChange] = useInput([]);

    async function sendCard(event) {
        event.preventDefault();
        try {
            let result = await fetch(`http://${API}/api/cards/`, {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({
                    name: cardName,
                    subject: cardSubject,
                    image: cardImage,
                    tooltip: cardTooltip,
                    levels: [
                        {
                            level: 1,
                            next_level_cost: 1,
                            effects: [

                            ]
                        },
                        {
                            level: 2,
                            next_level_cost: 1,
                            effects: [

                            ]
                        },
                        {
                            level: 3,
                            next_level_cost: 1,
                            effects: [

                            ]
                        }
                    ]
                })
            });

            console.log('Result: ' + result);
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <StyledForm>
            <fieldset>
                <legend>
                    Karta
                </legend>
                <p>
                    <label htmlFor='name'>
                        Nazwa:
                    </label>
                    <input id='name' type='text' name='name' onChange={handleCardNameChange}/>
                </p>
                <p>
                    <label htmlFor='subject'>
                        Przedmiot:
                    </label>
                    <input id='subject' type='text' name='subject' onChange={handleCardSubjectChange}/>
                </p>
                <p>
                    <label htmlFor='image'>
                        Ikona karty:
                    </label>
                    <input id='image' type='file' name='image' onChange={handleCardImageChange}/>
                </p>
                <p>
                    <label>
                        Opis Karty:
                    </label>
                    <textarea name='tooltip' onChange={handleCardTooltipChange}>
                        {/*textarea*/}
                    </textarea>
                </p>
            </fieldset>
            <fieldset>
                <legend>
                    Poziom karty
                </legend>
                {
                    levels.map((level) => {
                        return (
                            <React.Fragment key={`level-${level.level}`}>
                                <fieldset>
                                    <p>
                                        <label htmlFor={level.level}>
                                            {level.name}
                                        </label>
                                        <input id={level.level} name='level' type='checkbox' />
                                    </p>
                                    <p>
                                        <label htmlFor='next_level_cost'>
                                            Koszt ulepszenia na następny poziom:
                                        </label>
                                        <input id='next_level_cost' name='next_level_cost' type='number' />
                                    </p>
                                    <fieldset>
                                        <legend>
                                            Efekty karty
                                        </legend>
                                        {
                                            effects.map((effect) => {
                                                return (
                                                    <React.Fragment key={`effect-${effect.id}`}>
                                                        <div>
                                                            <label htmlFor={effect.id}>
                                                                {effect.name}
                                                            </label>
                                                            <input id={effect.id} name='card_effect' type='checkbox' />
                                                        </div>
                                                        <fieldset>
                                                            <legend>
                                                                Cel:
                                                            </legend>
                                                            <p>
                                                                <label htmlFor='target'>
                                                                    przeciwnik
                                                                </label>
                                                                <input id='target' name='target' type='radio' />
                                                            </p>
                                                            <p>
                                                                <label htmlFor='target'>
                                                                    właściciel
                                                                </label>
                                                                <input id='target' name='target' value='' type='radio'/>
                                                            </p>
                                                        </fieldset>
                                                        <fieldset>
                                                            <legend>
                                                                Moc:
                                                            </legend>
                                                            <p>
                                                                <Label htmlFor='power'>
                                                                    Wartość efektu
                                                                </Label>
                                                                <input id='power' name='power' type='number'/>
                                                            </p>
                                                            <p>
                                                                <Label last htmlFor='range'>
                                                                    Zasięg efektu
                                                                </Label>
                                                                <input id='range' name='range' type='number'/>
                                                            </p>
                                                        </fieldset>
                                                    </React.Fragment>
                                                );
                                            })
                                        }
                                    </fieldset>
                                </fieldset>
                            </React.Fragment>
                        );
                    })
                }
            </fieldset>
            <button type='submit' onClick={sendCard}>
                Wyślij do administracji.
            </button>
        </StyledForm>
    );
}

export default CardForm;