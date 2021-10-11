import React from 'react';
import Section from './styled-components/Section';
import Close from './styled-components/Close';
import H2 from './styled-components/H2';
import MobileLevelsMenu from './styled-components/MobileLevelsMenu';
import Button from './styled-components/Button';
import LevelCardView from '../../molecules/LevelCardView';
import Media from 'react-media';
import DesktopContainer from './styled-components/DesktopContainer';
import {mobile} from '../../../../../utils/globals';

class CardView extends React.Component {

    state = {
        activeCommon: false,
        activeGold: false,
        activeEpic: false,

        commonDescription: '',
        goldDescription: '',
        epicDescription: '',
    }

    setDescriptions = () => {
        this.setState({
            commonDescription: this.props.levelDescriptions[0],
            goldDescription: this.props.levelDescriptions[1],
            epicDescription: this.props.levelDescriptions[2]
        });
    }

    componentDidUpdate(prevProps) {
        if(prevProps.show !== this.props.show) {
            if(this.props.cardEffects[2].length !== 0)
                this.setState({activeEpic: true, activeGold: false, activeCommon: false});
            if(this.props.cardEffects[1].length !== 0)
                this.setState({activeEpic: false, activeGold: true, activeCommon: false});
            if(this.props.cardEffects[0].length !== 0)
                this.setState({activeEpic: false, activeGold: false, activeCommon: true});

            this.setDescriptions();
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
                <DesktopContainer>
                    <LevelCardView common
                                   show={this.state.activeCommon}
                                   exist={this.props.cardEffects[0].length !== 0}
                                   cardName={this.props.cardName}
                                   cardSubject={this.props.cardSubject}
                                   cardImage={this.props.cardImage}
                                   cardTooltip={this.props.cardTooltip}
                                   description={this.state.commonDescription} />
                    <LevelCardView gold
                                   show={this.state.activeGold}
                                   exist={this.props.cardEffects[1].length !== 0}
                                   cardName={this.props.cardName}
                                   cardSubject={this.props.cardSubject}
                                   cardImage={this.props.cardImage}
                                   cardTooltip={this.props.cardTooltip}
                                   description={this.state.goldDescription} />
                    <LevelCardView epic
                                   show={this.state.activeEpic}
                                   exist={this.props.cardEffects[2].length !== 0}
                                   cardName={this.props.cardName}
                                   cardSubject={this.props.cardSubject}
                                   cardImage={this.props.cardImage}
                                   cardTooltip={this.props.cardTooltip}
                                   description={this.state.epicDescription} />
                    <Media query={mobile}>
                        <MobileLevelsMenu>
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
                        </MobileLevelsMenu>
                    </Media>
                    <Close onClick={this.closeCardViewHandler}>
                        {/*close icon*/}
                    </Close>
                </DesktopContainer>
            </Section>
        );
    }
}

export default CardView;