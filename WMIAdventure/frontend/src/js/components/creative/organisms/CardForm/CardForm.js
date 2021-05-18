import React from 'react';
import StyledForm from './StyledForm';
import Label from '../../atoms/CardPowerInput/StyledFieldset/Label';
import useInput from './useInput';

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
    const [levelsArray, handleLevelsArrayChange] = useInput([]);
    const [costs, handleCostsChange] = useInput([]);
    const [cardEffects, handleCardEffectsChange] = useInput([[],[],[]]);
    const [cardTargets, handleCardTargetsChange] = useInput([[],[],[]]);
    const [cardPowers, handleCardPowersChange] = useInput([[],[],[]]);
    const [cardRanges, handleCardRangesChange] = useInput([[],[],[]]);

    async function sendCard(event) {
        event.preventDefault();
        const newLevels = [];
        const mapEffects = [[], [], []];

        for(let i = 0; i < cardEffects.length; i++) {
            for(let j = 0; j < cardEffects[i].length; j++) {
                if(cardEffects[i][j]) {
                    mapEffects[i].push (
                        {
                            card_effect: cardEffects[i][j],
                            target: cardTargets[i][j],
                            power: cardPowers[i][j],
                            range: cardRanges[i][j]
                        }
                    );
                }
            }
        }

        let i = 0;
        while (levelsArray[i]) {
            newLevels.push(
                {
                    level: levelsArray[i],
                    next_level_cost: costs[i],
                    effects: mapEffects[i]
                }
            );
            i++;
        }

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
                    levels: newLevels
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
                            <React.Fragment key={`levels-${level.level}`}>
                                <fieldset>
                                    <p>
                                        <label htmlFor={`${level.level}-level`}>
                                            {level.name}
                                        </label>
                                        <input id={`${level.level}-level`} name='level' type='checkbox' value={level.level} onChange={handleLevelsArrayChange}/>
                                    </p>
                                    <p>
                                        <label htmlFor={`${level.level}-cost`}>
                                            Koszt ulepszenia na następny poziom:
                                        </label>
                                        <input id={`${level.level}-cost`} name='next_level_cost' type='number' onChange={handleCostsChange}/>
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
                                                            <label htmlFor={`${level.level}-${effect.id}-effect`}>
                                                                {effect.name}
                                                            </label>
                                                            <input id={`${level.level}-${effect.id}-effect`} name='card_effect' type='checkbox' value={effect.id} onChange={handleCardEffectsChange}/>
                                                        </div>
                                                        <fieldset>
                                                            <legend>
                                                                Cel:
                                                            </legend>
                                                            <p>
                                                                <label htmlFor='target'>
                                                                    przeciwnik
                                                                </label>
                                                                <input id={`${level.level}-${effect.id}-target`} name='target' value='1' type='radio' onChange={handleCardTargetsChange}/>
                                                            </p>
                                                            <p>
                                                                <label htmlFor='target'>
                                                                    właściciel
                                                                </label>
                                                                <input id={`${level.level}-${effect.id}-target`} name='target' value='2' type='radio' onChange={handleCardTargetsChange}/>
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
                                                                <input id={`${level.level}-${effect.id}-power`} name='power' type='number' onChange={handleCardPowersChange}/>
                                                            </p>
                                                            <p>
                                                                <Label last htmlFor='range'>
                                                                    Zasięg efektu
                                                                </Label>
                                                                <input id={`${level.level}-${effect.id}-range`} name='range' type='number' onChange={handleCardRangesChange}/>
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