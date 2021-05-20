import React from 'react';
import Fieldset from './styled-components/Fieldset';

class CardDescribeInputs extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        show: false
    }

    render() {
        return (
            <Fieldset show={this.state.show}>
                <legend>
                    Karta
                </legend>
                <div>
                    <label htmlFor='cardName'>
                        Nazwa
                    </label>
                    <div>
                        <input id='cardName' name='cardName' type='text'/>
                    </div>
                </div>
                <div>
                    <label htmlFor='cardSubject'>
                        Przedmiot
                    </label>
                    <div>
                        <input id='cardSubject' name='cardSubject' type='text'/>
                    </div>
                </div>
                <div>
                    <label htmlFor='cardTooltip'>
                        Opis
                    </label>
                    <div>
                        <input id='cardTooltip' name='cardTooltip' type='text'/>
                    </div>
                </div>
            </Fieldset>
        );
    }
}

export default CardDescribeInputs;