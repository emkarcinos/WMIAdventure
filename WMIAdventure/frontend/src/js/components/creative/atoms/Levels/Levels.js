import React from 'react';
import Close from './styled-components/Close';
import Button from './styled-components/Button';
import CommonDiv from './styled-components/CommonDiv';
import GoldDiv from './styled-components/GoldDiv';
import EpicDiv from './styled-components/EpicDiv';

class Levels extends React.Component {
    state = {
        activeCommon: false,
        activeGold: false,
        activeEpic: false
    }

    activeCommonStyleHandler = (event) => {
        event.preventDefault();
        if(this.state.activeGold)
            this.setState({activeGold: false});
        if(this.state.activeEpic)
            this.setState({activeEpic: false});
        this.setState({activeCommon: true});
    }

    activeGoldStyleHandler = (event) => {
        event.preventDefault();
        if(this.state.activeCommon)
            this.setState({activeCommon: false});
        if(this.state.activeEpic)
            this.setState({activeEpic: false});
        this.setState({activeGold: true});
    }

    activeEpicStyleHandler = (event) => {
        event.preventDefault();
        if(this.state.activeCommon)
            this.setState({activeCommon: false});
        if(this.state.activeGold)
            this.setState({activeGold: false});
        this.setState({activeEpic: true});
    }

    removeCommonLevelHandler = (event) => {
        event.preventDefault();
        this.setState({activeCommon: false});
        this.props.removeCommonLevelHandler(event);
    }

    removeGoldLevelHandler = (event) => {
        event.preventDefault();
        this.setState({activeGold: false});
        this.props.removeGoldLevelHandler(event);
    }

    removeEpicLevelHandler = (event) => {
        event.preventDefault();
        this.setState({activeEpic: false});
        this.props.removeEpicLevelHandler(event);
    }

    render() {
        return (
            <>
                <CommonDiv exist={this.props.createCommonLevel} active={this.state.activeCommon}>
                    <Button
                        show={this.props.createCommonLevel}
                        onClick={this.activeCommonStyleHandler}>
                        TYPOWY
                    </Button>
                    <Close show={this.state.activeCommon}
                           onClick={this.removeCommonLevelHandler}>
                        {/*close icon*/}
                    </Close>
                </CommonDiv>
                <GoldDiv exist={this.props.createGoldLevel} active={this.state.activeGold}>
                    <Button
                        show={this.props.createGoldLevel}
                        onClick={this.activeGoldStyleHandler}>
                        ZŁOTY
                    </Button>
                    <Close show={this.state.activeGold}
                           onClick={this.removeGoldLevelHandler}>
                        {/*close icon*/}
                    </Close>
                </GoldDiv>
                <EpicDiv exist={this.props.createEpicLevel} active={this.state.activeEpic}>
                    <Button
                        show={this.props.createEpicLevel}
                        onClick={this.activeEpicStyleHandler}>
                        EPICKI
                    </Button>
                    <Close show={this.state.activeEpic}
                           onClick={this.removeEpicLevelHandler}>
                        {/*close icon*/}
                    </Close>
                </EpicDiv>
            </>
        );
    }
}

export default Levels;