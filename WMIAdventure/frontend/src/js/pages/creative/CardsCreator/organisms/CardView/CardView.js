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

        commonDescription: '',
        goldDescription: '',
        epicDescription: '',
    }

    getDescriptions = () => {
        const API = process.env['REACT_APP_API_URL'];

        if(this.props.cardEffects[0].length !== 0) {
            try {
                fetch(`http://${API}/api/cards/descriptions/`, {
                    method: 'post',
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json',
                    },
                    body: JSON.stringify(this.props.cardEffects[0])
                })
                    .then (response => {
                        return response.json();
                    })
                    .then(data => this.setState({commonDescription: data}))

            } catch(e) {
                console.log(e);
            }
        }

        if(this.props.cardEffects[1] !== 0) {
            try {
                fetch(`http://${API}/api/cards/descriptions/`, {
                    method: 'post',
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json',
                    },
                    body: JSON.stringify(this.props.cardEffects[1])
                })
                    .then (response => {
                        return response.json();
                    })
                    .then(data => this.setState({goldDescription: data}))

            } catch(e) {
                console.log(e);
            }
        }

        if(this.props.cardEffects[2] !== 0) {
            try {
                fetch(`http://${API}/api/cards/descriptions/`, {
                    method: 'post',
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json',
                    },
                    body: JSON.stringify(this.props.cardEffects[2])
                })
                    .then (response => {
                        return response.json();
                    })
                    .then(data => this.setState({epicDescription: data}))

            } catch(e) {
                console.log(e);
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
                <LevelView common
                           show={this.state.activeCommon}
                           cardName={this.props.cardName}
                           cardSubject={this.props.cardSubject}
                           cardImage={this.props.cardImage}
                           cardTooltip={this.props.cardTooltip}
                           description={this.state.commonDescription} />
                <LevelView gold
                           show={this.state.activeGold}
                           cardName={this.props.cardName}
                           cardSubject={this.props.cardSubject}
                           cardImage={this.props.cardImage}
                           cardTooltip={this.props.cardTooltip}
                           description={this.state.goldDescription} />
                <LevelView epic
                           show={this.state.activeEpic}
                           cardName={this.props.cardName}
                           cardSubject={this.props.cardSubject}
                           cardImage={this.props.cardImage}
                           cardTooltip={this.props.cardTooltip}
                           description={this.state.epicDescription} />
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