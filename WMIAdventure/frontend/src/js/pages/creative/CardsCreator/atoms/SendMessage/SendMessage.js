import React from 'react';
import TransparentBack from './styled-components/TransparentBack';
import Div from './styled-components/Div';
import P from './styled-components/P';

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
            <TransparentBack show={this.props.showMessage} onClick={this.handleHiding}>
                <Div onMouseEnter={this.hoverTrue} onMouseLeave={this.hoverFalse}>
                    <P success={this.props.sendSuccess}>
                        {this.state.message}
                    </P>
                </Div>
            </TransparentBack>
        );
    }
}

export default SendMessage;