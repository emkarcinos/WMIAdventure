import React from 'react';
import Section from './styled-components/Section';
import Close from './styled-components/Close';
import H2 from './styled-components/H2';
import Div from './styled-components/Div';
import Button from './styled-components/Button';
import LevelView from '../../molecules/LevelView';

class CardView extends React.Component {

    state = {
        showCommon: true,
        showGold: false,
    }

    accessLevelCommonHandler = () => {
        return this.props.cardEffects[0].length !== 0;
    }

    accessLevelGoldHandler = () => {
        return this.props.cardEffects[1].length !== 0;
    }

    accessLevelEpicHandler = () => {
        return this.props.cardEffects[2].length !== 0;
    }

    render() {
        return (
            <Section show={this.props.show}>
                <H2>
                    Podgląd
                </H2>
                <LevelView show={false} common />
                <LevelView show gold />
                <LevelView show={false} epic />
                <Div>
                    <Button access={this.accessLevelCommonHandler}>
                        Typowy
                    </Button>
                    <Button access={this.accessLevelGoldHandler}>
                        Złoty
                    </Button>
                    <Button access={this.accessLevelEpicHandler}>
                        Epicki
                    </Button>
                </Div>
                <Close onClick={this.props.hideCardViewHandler}>
                    {/*close icon*/}
                </Close>
            </Section>
        );
    }
}

export default CardView;