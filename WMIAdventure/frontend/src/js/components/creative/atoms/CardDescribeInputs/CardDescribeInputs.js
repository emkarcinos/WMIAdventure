import React from 'react';
import Fieldset from './styled-components/Fieldset';
import TransparentBack from './styled-components/TransparentBack';

class CardDescribeInputs extends React.Component {
    render() {
        return (
            <TransparentBack show={this.props.show}>
                <Fieldset>
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
                    <button onClick={this.props.hideInputs}>
                        x
                    </button>
                </Fieldset>
            </TransparentBack>
        );
    }
}

export default CardDescribeInputs;