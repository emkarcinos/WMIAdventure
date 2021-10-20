import React from 'react';
import TransparentBack from './styled-components/TransparentBack';
import Ul from './styled-components/Ul';
import Li from './styled-components/Li';
import Button from './styled-components/Button';
import { Transition } from 'react-transition-group';

/* Transition timeout values */
const timeout = {
    appear: 50,
    enter: 50,
    exit: 500
};

class LevelChoose extends React.Component {
    state = {
        listHover: false,
    }

    hoverTrue = () => {
        this.setState({listHover: true});
    }

    hoverFalse = () => {
        this.setState({listHover: false});
    }

    handleHiding = (event) => {
        if(!this.state.listHover)
            this.props.hideLevelChooseHandler(event);
    }

    render() {
        return (
            <Transition in={this.props.show} timeout={timeout}>
                {state =>(
                    <TransparentBack onClick={this.handleHiding} transitionState={state}>
                        <Ul onMouseEnter={this.hoverTrue} onMouseLeave={this.hoverFalse}>
                            <Li>
                                <Button disabled={this.props.commonLevelChosen} rank={1} onClick={(event) => {this.props.createLevelHandler(event, 1)}}>
                                    Typowy
                                </Button>
                            </Li>
                            <Li>
                                <Button disabled={this.props.goldLevelChosen} rank={2} onClick={(event) => {this.props.createLevelHandler(event, 2)}}>
                                    Złoty
                                </Button>
                            </Li>
                            <Li last>
                                <Button disabled={this.props.epicLevelChosen} rank={3} onClick={(event) => {this.props.createLevelHandler(event, 3)}}>
                                    Epicki
                                </Button>
                            </Li>
                        </Ul>
                    </TransparentBack>
                )}
            </Transition>
        );
    }
}

export default LevelChoose;