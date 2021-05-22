import React from 'react';
import Fieldset from './styled-components/Fieldset';
import Div from './styled-components/Div';
import P from './styled-components/P';
import Button from './styled-components/Button';
import CreateLevel from '../../atoms/CreateLevel';
import Levels from '../../atoms/Levels';

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

    removeCommonLevelHandler = (event) => {
        event.preventDefault();
        this.setState({createCommonLevel: false});
    }

    removeGoldLevelHandler = (event) => {
        event.preventDefault();
        this.setState({createGoldLevel: false});
    }

    removeEpicLevelHandler = (event) => {
        event.preventDefault();
        this.setState({createEpicLevel: false});
    }

    render() {
        return (
            <>
                <Fieldset>
                    {/*upgradeCostInput*/}
                    {/*effectsInputs*/}
                    <Div>
                        <P>
                            Poziomy:
                        </P>
                        <Levels
                            createCommonLevel={this.state.createCommonLevel}
                            createGoldLevel={this.state.createGoldLevel}
                            createEpicLevel={this.state.createEpicLevel}
                            removeCommonLevelHandler={this.removeCommonLevelHandler}
                            removeGoldLevelHandler={this.removeGoldLevelHandler}
                            removeEpicLevelHandler={this.removeEpicLevelHandler}
                        />
                        <Button onClick={this.showLevelChooseHandler}>
                            {/*ikona plusa*/}
                        </Button>
                    </Div>
                </Fieldset>
                <CreateLevel
                    show={this.state.showLevelChoose}
                    hideLevelChooseHandler={this.hideLevelChooseHandler}
                    createCommonLevelHandler = {this.createCommonLevelHandler}
                    createGoldLevelHandler = {this.createGoldLevelHandler}
                    createEpicLevelHandler = {this.createEpicLevelHandler}
                />
            </>
        );
    }
}

export default CardProperties;