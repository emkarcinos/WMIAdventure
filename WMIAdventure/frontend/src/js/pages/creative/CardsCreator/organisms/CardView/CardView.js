import React from 'react';
import Section from './styled-components/Section';
import Close from './styled-components/Close';
import H2 from './styled-components/H2';
import Div from './styled-components/Div';
import Button from './styled-components/Button';
import LevelView from '../../molecules/LevelView';

class CardView extends React.Component {

    state = {
        activeCommon: false,
        activeGold: false,
        activeEpic: false,
    }

    componentDidUpdate(prevProps) {
        if(prevProps.show !== this.props.show) {
            if(this.props.cardEffects[2].length !== 0)
                this.setState({activeEpic: true, activeGold: false, activeCommon: false});
            if(this.props.cardEffects[1].length !== 0)
                this.setState({activeEpic: false, activeGold: true, activeCommon: false});
            if(this.props.cardEffects[0].length !== 0)
                this.setState({activeEpic: false, activeGold: false, activeCommon: true});
        }
    }

    setCommonToActive = () => {
        if(this.props.cardEffects[0].length !== 0)
            this.setState({activeEpic: false, activeGold: false, activeCommon: true});
    }

    setGoldToActive = () => {
        if(this.props.cardEffects[1].length !== 0)
            this.setState({activeEpic: false, activeGold: true, activeCommon: false});
    }

    setEpicToActive = () => {
        if(this.props.cardEffects[2].length !== 0)
            this.setState({activeEpic: true, activeGold: false, activeCommon: false});
    }

    closeCardViewHandler = (event) => {
        event.preventDefault();
        this.setState({activeEpic: false, activeGold: false, activeCommon: false});
        this.props.hideCardViewHandler(event);
    }

    render() {
        return (
            <Section show={this.props.show}>
                <H2>
                    Podgląd
                </H2>
                <LevelView show={this.state.activeCommon} common />
                <LevelView show={this.state.activeGold} gold />
                <LevelView show={this.state.activeEpic} epic />
                <Div>
                    <Button activeCommon={this.state.activeCommon} onClick={this.setCommonToActive}
                            access={this.props.cardEffects[0].length !== 0}>
                        Typowy
                    </Button>
                    <Button activeGold={this.state.activeGold} onClick={this.setGoldToActive}
                            access={this.props.cardEffects[1].length !== 0}>
                        Złoty
                    </Button>
                    <Button activeEpic={this.state.activeEpic} onClick={this.setEpicToActive}
                            access={this.props.cardEffects[2].length !== 0}>
                        Epicki
                    </Button>
                </Div>
                <Close onClick={this.closeCardViewHandler}>
                    {/*close icon*/}
                </Close>
            </Section>
        );
    }
}

export default CardView;