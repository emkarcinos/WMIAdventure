import React from 'react';
import Section from "./styled-components/Section";
import View from "./styled-components/View";
import Image from "./styled-components/Image";
import P from "./styled-components/P";
import kuceFight from '../../../../../assets/images/kuceBattle.png';

class LoadingPopUp extends React.Component {
    render() {
        return (
            <Section visible={this.props.visible}>
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