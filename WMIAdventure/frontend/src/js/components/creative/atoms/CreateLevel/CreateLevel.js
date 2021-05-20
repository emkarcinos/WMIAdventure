import React from 'react';
import TransparentBack from './styled-components/TransparentBack';
import Ul from './styled-components/Ul';
import Li from './styled-components/Li';
import Button from './styled-components/Button';

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
            <TransparentBack show={this.props.show} onClick={this.handleHiding}>
                <Ul onMouseEnter={this.hoverTrue} onMouseLeave={this.hoverFalse}>
                    <Li>
                        <Button rank={1}>
                            Typowy
                        </Button>
                    </Li>
                    <Li>
                        <Button rank={2}>
                            Złoty
                        </Button>
                    </Li>
                    <Li last>
                        <Button rank={3}>
                            Epicki
                        </Button>
                    </Li>
                </Ul>
            </TransparentBack>
        );
    }
}

export default LevelChoose;