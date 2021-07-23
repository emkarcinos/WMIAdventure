import React from 'react';
import TransparentBack from './styled-components/TransparentBack';
import Div from './styled-components/Div';
import P from './styled-components/P';
import { Transition } from 'react-transition-group';

/* Transition timeout values */
const timeout = {
    appear: 50,
    enter: 50,
    exit: 500
};

class SendMessage extends React.Component {

    state = {
        message: ''
    }

    hoverTrue = () => {
        this.setState({listHover: true});
    }

    hoverFalse = () => {
        this.setState({listHover: false});
    }

    handleHiding = (event) => {
        if(!this.state.listHover)
            this.props.hideSendMessageHandler(event);
    }

    componentWillReceiveProps(nextProps)  {
        if(nextProps.sendSuccess)
            this.setState({message: 'Karta wysłana pomyślnie.'});
        else
            this.setState({message: 'Nie udało się wysłać karty.'});
    }

    render() {
        return (
            <Transition in={this.props.showMessage} timeout={timeout}>
                {state => (
                    <TransparentBack onClick={this.handleHiding} transitionState={state}>
                        <Div onMouseEnter={this.hoverTrue} onMouseLeave={this.hoverFalse}>
                            <P success={this.props.sendSuccess}>
                                {this.state.message}
                            </P>
                        </Div>
                    </TransparentBack>
                )}
            </Transition>
        );
    }
}

export default SendMessage;