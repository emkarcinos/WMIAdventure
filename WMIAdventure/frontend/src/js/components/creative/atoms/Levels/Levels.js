import React from 'react';
import ButtonCommon from './styled-components/ButtonCommon';
import ButtonGold from './styled-components/ButtonGold';
import ButtonEpic from './styled-components/ButtonEpic';

class Levels extends React.Component {
    state = {
        activeCommon: false,
        activeGold: false,
        activeEpic: false
    }

    activeCommonStyleHandler = (event) => {
        event.preventDefault();
        if(this.state.activeGold)
            this.setState({activeGold: false});
        if(this.state.activeEpic)
            this.setState({activeEpic: false});
        this.setState({activeCommon: true});
    }

    activeGoldStyleHandler = (event) => {
        event.preventDefault();
        if(this.state.activeCommon)
            this.setState({activeCommon: false});
        if(this.state.activeEpic)
            this.setState({activeEpic: false});
        this.setState({activeGold: true});
    }

    activeEpicStyleHandler = (event) => {
        event.preventDefault();
        if(this.state.activeCommon)
            this.setState({activeCommon: false});
        if(this.state.activeGold)
            this.setState({activeGold: false});
        this.setState({activeEpic: true});
    }

    render() {
        return (
            <>
                <ButtonCommon
                    show={this.props.createCommonLevel}
                    active={this.state.activeCommon}
                    onClick={this.activeCommonStyleHandler}>
                    TYPOWA
                </ButtonCommon>
                <ButtonGold
                    show={this.props.createGoldLevel}
                    active={this.state.activeGold}
                    onClick={this.activeGoldStyleHandler}>
                    ZŁOTA
                </ButtonGold>
                <ButtonEpic
                    show={this.props.createEpicLevel}
                    active={this.state.activeEpic}
                    onClick={this.activeEpicStyleHandler}>
                    EPICKA
                </ButtonEpic>
            </>
        );
    }
}

export default Levels;