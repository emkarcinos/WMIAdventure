import React from 'react';
import TransparentBack from './styled-components/TransparentBack';
import Search from '../../atoms/Search';
import Ul from './styled-components/Ul';
import Card from '../../atoms/Card';
import { Transition } from 'react-transition-group';

/* Transition timeout values */
const timeout = {
    appear: 0,
    enter: 0,
    exit: 500
};

class CardChoose extends React.Component {
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
            this.props.hideCardChooseHandler(event);
    }

    render() {
        return (
            <Transition in={this.props.showCardChoose} timeout={timeout}>
                {state => (
                    <TransparentBack transitionState={state} onClick={this.handleHiding}>
                        <Ul onMouseEnter={this.hoverTrue}
                            onMouseLeave={this.hoverFalse}>
                            <Search />
                            {
                                this.props.cardsFromAPI.map((card) => {
                                    return (
                                        <React.Fragment key={`card-${card.id}`}>
                                            <Card id={card.id} name={card.name}
                                                  subject={card.subject}
                                                  tooltip={card.tooltip}
                                                  levels={card.levels}
                                                  chosenCardHandler={this.props.chosenCardHandler} />
                                        </React.Fragment>
                                    );
                                })
                            }
                        </Ul>
                    </TransparentBack>
                )}
            </Transition>
        );
    }
}

export default CardChoose;