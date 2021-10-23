import React from 'react';
import Close from './styled-components/Close';
import Button from './styled-components/Button';
import CommonDiv from './styled-components/CommonDiv';
import GoldDiv from './styled-components/GoldDiv';
import EpicDiv from './styled-components/EpicDiv';

class Levels extends React.Component {

    activeCommonStyleHandler = (event) => {
        event.preventDefault();
        this.props.activeLevelRecognize(event, 1);
    }

    activeGoldStyleHandler = (event) => {
        event.preventDefault();
        this.props.activeLevelRecognize(event, 2);
    }

    activeEpicStyleHandler = (event) => {
        event.preventDefault();
        this.props.activeLevelRecognize(event, 3);
    }

    removeCommonLevelHandler = (event) => {
        event.preventDefault();
        this.props.removeCommonLevelHandler(event);
        this.props.activeLevelRecognize(event, 0);
    }

    removeGoldLevelHandler = (event) => {
        event.preventDefault();
        this.props.removeGoldLevelHandler(event);
        this.props.activeLevelRecognize(event, 0);
    }

    removeEpicLevelHandler = (event) => {
        event.preventDefault();
        this.props.removeEpicLevelHandler(event);
        this.props.activeLevelRecognize(event, 0);
    }

    render() {
        return (
            <>
                <CommonDiv exist={this.props.createCommonLevel} active={this.props.activeCommon}>
                    <Button show={this.props.createCommonLevel}
                        onClick={this.activeCommonStyleHandler}>
                        TYPOWY
                    </Button>
                    <Close show={this.props.activeCommon} exist={this.props.createCommonLevel}
                       onClick={this.removeCommonLevelHandler}>
                       {/*close icon*/}
                    </Close>
                </CommonDiv>
                <GoldDiv exist={this.props.createGoldLevel} active={this.props.activeGold}>
                    <Button show={this.props.createGoldLevel}
                        onClick={this.activeGoldStyleHandler}>
                        ZŁOTY
                    </Button>
                    <Close show={this.props.activeGold} exist={this.props.createGoldLevel}
                       onClick={this.removeGoldLevelHandler}>
                       {/*close icon*/}
                    </Close>
                </GoldDiv>
                <EpicDiv exist={this.props.createEpicLevel} active={this.props.activeEpic}>
                    <Button show={this.props.createEpicLevel}
                        onClick={this.activeEpicStyleHandler}>
                        EPICKI
                    </Button>
                    <Close show={this.props.activeEpic} exist={this.props.createEpicLevel}
                       onClick={this.removeEpicLevelHandler}>
                       {/*close icon*/}
                    </Close>
                </EpicDiv>
            </>
        );
    }
}

export default Levels;