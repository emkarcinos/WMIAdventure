import React from 'react';
import Fieldset from './styled-components/Fieldset';
import Div from './styled-components/Div';
import P from './styled-components/P';
import Button from './styled-components/Button';
import CreateLevel from '../../atoms/CreateLevel';
import Level from '../../atoms/Level';

class CardProperties extends React.Component {
    state = {
        showLevelChoose: false,
        createCommonLevel: false,
        createGoldLevel: false,
        createEpicLevel: false
    }

    showLevelChooseHandler = (event) => {
        event.preventDefault();
        this.setState({showLevelChoose: true});
    }

    hideLevelChooseHandler = (event) => {
        event.preventDefault();
        this.setState({showLevelChoose: false});
    }

    createCommonLevelHandler = (event) => {
        event.preventDefault();
        this.hideLevelChooseHandler(event);
        this.setState({createCommonLevel: true});
    }

    createGoldLevelHandler = (event) => {
        event.preventDefault();
        this.hideLevelChooseHandler(event);
        this.setState({createGoldLevel: true});
    }

    createEpicLevelHandler = (event) => {
        event.preventDefault();
        this.hideLevelChooseHandler(event);
        this.setState({createEpicLevel: true});
    }

    render() {
        return (
            <Fieldset>
                <Div>
                    <P>
                        Poziomy:
                    </P>
                    <Level createCommonLevel={this.state.createCommonLevel}/>
                    <Level createGoldLevel={this.state.createGoldLevel}/>
                    <Level createEpicLevel={this.state.createEpicLevel}/>
                    <Button onClick={this.showLevelChooseHandler}>
                        {/*ikona plusa*/}
                    </Button>
                </Div>
                <CreateLevel
                    show={this.state.showLevelChoose}
                    hideLevelChooseHandler={this.hideLevelChooseHandler}
                    createCommonLevelHandler = {this.createCommonLevelHandler}
                    createGoldLevelHandler = {this.createGoldLevelHandler}
                    createEpicLevelHandler = {this.createEpicLevelHandler}
                />
            </Fieldset>
        );
    }
}

export default CardProperties;