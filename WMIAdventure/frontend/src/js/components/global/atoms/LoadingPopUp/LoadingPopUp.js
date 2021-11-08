import React from 'react';
import Section from "./styled-components/Section";
import View from "./styled-components/View";
import Image from "./styled-components/Image";
import P from "./styled-components/P";
import kuceFight from '../../../../../assets/images/kuceBattle.png';
import {popUpLoadingMinimalDuration} from "../../../../utils/globals";

class LoadingPopUp extends React.Component {

    state = {
        visible: false,
    }

    componentDidUpdate(prevProps) {
        if((prevProps.visible !== this.props.visible)
            && prevProps.visible && (prevProps.visible === true)) {
            setTimeout(() => {
                this.setState({
                    visible: false,
                });
            }, popUpLoadingMinimalDuration);
        } else if((prevProps.visible !== this.props.visible)
            && prevProps.visible === false) {
            this.setState({
               visible: true,
            });
        }
    }

    render() {
        return (
            <Section visible={this.state.visible}>
                <View>
                    {this.props.view ? this.props.view : 'Widok'}
                </View>
                <Image src={kuceFight}
                       alt={'Walczące kuce (informatycy o charakterystycznym zapachu).'} />
                <P>
                    Ładowanie...
                </P>
            </Section>
        );
    }
}

export default LoadingPopUp;