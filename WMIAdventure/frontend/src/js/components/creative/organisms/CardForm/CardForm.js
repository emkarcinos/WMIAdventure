import React from 'react';
import Form from './styled-components/Form';
import Label from './styled-components/Label';
import useInput from './useInput';
import Fieldset from './styled-components/Fieldset';
import Paragraph from './styled-components/Paragraph';
import Div from './styled-components/Div';

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

    function sendCard(event) {
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


        for (let i = 0; i < levelsArray.length; i++) {
            if (levelsArray[i]) {
                newLevels.push(
                    {
                        level: levelsArray[i],
                        next_level_cost: costs[i],
                        effects: mapEffects[i]
                    }
                );
            }
        }

        try {
            let result = fetch(`http://${API}/api/cards/`, {
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
        <Form>
            <Fieldset>
                <legend>
                    Karta
                </legend>
                <Paragraph>
                    <Label htmlFor='name'>
                        Nazwa:
                    </Label>
                    <input id='name' type='text' name='name' onChange={handleCardNameChange}/>
                </Paragraph>
                <Paragraph>
                    <Label htmlFor='subject'>
                        Przedmiot:
                    </Label>
                    <input id='subject' type='text' name='subject' onChange={handleCardSubjectChange}/>
                </Paragraph>
                <Paragraph>
                    <Label htmlFor='image'>
                        Ikona karty:
                    </Label>
                    <input id='image' type='file' name='image' onChange={handleCardImageChange}/>
                </Paragraph>
                <Paragraph>
                    <Label>
                        Opis Karty:
                    </Label>
                    <textarea name='tooltip' onChange={handleCardTooltipChange}>
                        {/*textarea*/}
                    </textarea>
                </Paragraph>
            </Fieldset>
            <Fieldset>
                <legend>
                    Poziom karty
                </legend>
                {
                    levels.map((level) => {
                        return (
                            <React.Fragment key={`levels-${level.level}`}>
                                <div>
                                    <Paragraph>
                                        <Label htmlFor={`${level.level}-level`}>
                                            {level.name}
                                        </Label>
                                        <input id={`${level.level}-level`} name='level' type='checkbox' value={level.level} onChange={handleLevelsArrayChange}/>
                                    </Paragraph>
                                    <Paragraph>
                                        <Label htmlFor={`${level.level}-cost`}>
                                            Koszt ulepszenia na następny poziom:
                                        </Label>
                                        <input id={`${level.level}-cost`} name='next_level_cost' type='number' onChange={handleCostsChange}/>
                                    </Paragraph>
                                    <Fieldset>
                                        <legend>
                                            Efekty karty
                                        </legend>
                                        {
                                            effects.map((effect) => {
                                                return (
                                                    <React.Fragment key={`effect-${effect.id}`}>
                                                        <Div>
                                                            <Label htmlFor={`${level.level}-${effect.id}-effect`}>
                                                                {effect.name}
                                                            </Label>
                                                            <input id={`${level.level}-${effect.id}-effect`} name='card_effect' type='checkbox' value={effect.id} onChange={handleCardEffectsChange}/>
                                                        </Div>
                                                        <Fieldset>
                                                            <legend>
                                                                Cel:
                                                            </legend>
                                                            <Paragraph>
                                                                <Label htmlFor='target'>
                                                                    przeciwnik
                                                                </Label>
                                                                <input id={`${level.level}-${effect.id}-target`} name='target' value='1' type='radio' onChange={handleCardTargetsChange}/>
                                                            </Paragraph>
                                                            <Paragraph>
                                                                <Label htmlFor='target'>
                                                                    właściciel
                                                                </Label>
                                                                <input id={`${level.level}-${effect.id}-target`} name='target' value='2' type='radio' onChange={handleCardTargetsChange}/>
                                                            </Paragraph>
                                                        </Fieldset>
                                                        <Fieldset>
                                                            <legend>
                                                                Moc:
                                                            </legend>
                                                            <Paragraph>
                                                                <Label htmlFor='power'>
                                                                    Wartość efektu
                                                                </Label>
                                                                <input id={`${level.level}-${effect.id}-power`} name='power' type='number' onChange={handleCardPowersChange}/>
                                                            </Paragraph>
                                                            <Paragraph>
                                                                <Label last htmlFor='range'>
                                                                    Zasięg efektu
                                                                </Label>
                                                                <input id={`${level.level}-${effect.id}-range`} name='range' type='number' onChange={handleCardRangesChange}/>
                                                            </Paragraph>
                                                        </Fieldset>
                                                    </React.Fragment>
                                                );
                                            })
                                        }
                                    </Fieldset>
                                </div>
                            </React.Fragment>
                        );
                    })
                }
            </Fieldset>
            <button type='submit' onClick={sendCard}>
                Wyślij do administracji.
            </button>
        </Form>
    );
}

export default CardForm;