import React from 'react';
import Fieldset from './styled-components/Fieldset';
import Div from './styled-components/Div';
import P from './styled-components/P';
import Button from './styled-components/Button';
import LevelChoose from '../../atoms/LevelChoose';

class CardProperties extends React.Component {
    state = {
        showLevelChoose: false,
    }

    showLevelChooseHandler = (event) => {
        event.preventDefault();
        this.setState({showLevelChoose: true});
    }

    hideLevelChooseHandler = (event) => {
        event.preventDefault();
        this.setState({showLevelChoose: false});
    }

    render() {
        return (
            <Fieldset>
                <Div>
                    <P>
                        Poziomy:
                    </P>
                    <Button onClick={this.showLevelChooseHandler}>
                        {/*ikona plusa*/}
                    </Button>
                </Div>
                <LevelChoose show={this.state.showLevelChoose} hideLevelChooseHandler={this.hideLevelChooseHandler} />
            </Fieldset>
        );
    }
}

export default CardProperties;