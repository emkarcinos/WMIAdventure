import React from 'react';
import kuce from '../../../../../assets/images/kuceBattle.png';
import Img from "./styled-components/Img";
import {battleInitLoadingDuration, nextStepAnimationDuration,} from "../../../../utils/globals";

class KuceInBattle extends React.Component {

    state = {
        visible: false,
        setScale: '0',
    }

    componentDidMount() {
        if (this.props.visible)
            this.runKuceInBattle();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.visible === undefined)
            this.runKuceInBattle();
        else if ((prevProps.visible !== this.props.visible)
            && this.props.visible === true) {
            this.runKuceInBattle();
        } else if ((prevProps.visible !== this.props.visible)
            && this.props.visible === false) {
            this.closeKuceInBattle();
        }
    }

    // show kuce animation
    runKuceInBattle = () => {
        this.setState({
            visible: true,
        });

        setTimeout(() => {
            this.setState({
                setScale: '1.2',
            });
        }, battleInitLoadingDuration);

        setTimeout(() => {
            this.setState({
                setScale: '1',
            });
        }, battleInitLoadingDuration + nextStepAnimationDuration);
    }

    // hide kuce animation
    closeKuceInBattle = () => {
        this.setState({
            setScale: '0',
        });

        setTimeout(() => {
            this.setState({
                visible: false,
            });
        }, 500);
    }

    render() {
        return (
            <Img visible={this.state.visible}
                 setScale={this.state.setScale}
                 src={kuce}/>
        );
    }
}

export default KuceInBattle;