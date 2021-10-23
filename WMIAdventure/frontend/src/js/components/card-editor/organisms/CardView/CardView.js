import React from 'react';
import Section from './styled-components/Section';
import Close from './styled-components/Close';
import H2 from './styled-components/H2';
import MobileLevelsMenu from './styled-components/MobileLevelsMenu';
import Button from './styled-components/Button';
import LevelCardView from '../../molecules/LevelCardView';
import Media from 'react-media';
import DesktopContainer from './styled-components/DesktopContainer';
import CardsAPIGateway from '../../../../api/gateways/CardsAPIGateway';
import {mobile} from '../../../../utils/globals';

class CardView extends React.Component {

    state = {
        activeCommon: false,
        activeGold: false,
        activeEpic: false,

        /**
         * index 0 - effects description of common card level
         *
         * index 1 - effects description of gold card level
         *
         * index 2 - effects description of epic card level
         */
        descriptions: [null, null, null]
    }

    /**
     * Sets new description for given card level.
     * @param level Card level that will have new description attached.
     * @param newDescription
     */
    setNewDescription = (level, newDescription) => {
        let newDescriptions = this.state.descriptions.slice();
        newDescriptions[level] = newDescription;
        this.setState({descriptions: newDescriptions});
    }

    /**
     * Gets effects descriptions from API and saves them.
     */
    getDescriptions = () => {
        for (let i = 0; i < 3; i++) {
            if(this.props.cardEffects[i].length !== 0) {
                CardsAPIGateway.getEffectsDescription(this.props.cardEffects[i])
                    .then(data => this.setNewDescription(i, data))
                    .catch(err => console.log(err))
            }
        }
    }

    componentDidUpdate(prevProps) {
        if(prevProps.show !== this.props.show) {
            if(this.props.cardEffects[2].length !== 0)
                this.setState({activeEpic: true, activeGold: false, activeCommon: false});
            if(this.props.cardEffects[1].length !== 0)
                this.setState({activeEpic: false, activeGold: true, activeCommon: false});
            if(this.props.cardEffects[0].length !== 0)
                this.setState({activeEpic: false, activeGold: false, activeCommon: true});

            this.getDescriptions();
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
                                   description={this.state.descriptions[0]} />
                    <LevelCardView gold
                                   show={this.state.activeGold}
                                   exist={this.props.cardEffects[1].length !== 0}
                                   cardName={this.props.cardName}
                                   cardSubject={this.props.cardSubject}
                                   cardImage={this.props.cardImage}
                                   cardTooltip={this.props.cardTooltip}
                                   description={this.state.descriptions[1]} />
                    <LevelCardView epic
                                   show={this.state.activeEpic}
                                   exist={this.props.cardEffects[2].length !== 0}
                                   cardName={this.props.cardName}
                                   cardSubject={this.props.cardSubject}
                                   cardImage={this.props.cardImage}
                                   cardTooltip={this.props.cardTooltip}
                                   description={this.state.descriptions[2]} />
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