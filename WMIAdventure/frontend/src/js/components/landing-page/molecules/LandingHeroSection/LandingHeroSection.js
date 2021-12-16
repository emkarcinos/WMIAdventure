import React from 'react';
import Div from "./styled-components/Div";
import background from '../../../../../assets/images/mobile-landing-background.svg';
import Background from "./styled-components/Background";
import Logo from "../../../global/atoms/Logo";
import Subtitle from "./styled-components/Subtitle";
import LandingRegistration from "../../atoms/LandingRegistration";
import Content from "./styled-components/Content";
import Media from "react-media";
import {desktop, mobile} from "../../../../utils/globals";

class LandingHeroSection extends React.Component {
    render() {
        return (
            <>
                <Media query={mobile}>
                    <Div ref={this.props.setRef}>
                        <Content>
                            <Logo fullVersion setZindex={'2'} setFontSize={'24px'} setMargin={'18vw 0 20vw 0'}/>
                            <Subtitle>
                                Poznaj alternatywny świat studiowania
                            </Subtitle>
                            <LandingRegistration text={'Dołącz do nas'} url={'/registration'}/>
                        </Content>
                        <Background src={background}/>
                    </Div>
                </Media>
                <Media query={desktop}>
                    <Div ref={this.props.setRef}>
                        <Content>
                            <Logo fullVersion setZindex={'2'} setFontSize={'24px'} setMargin={'0'}/>
                            <Subtitle>
                                Poznaj alternatywny świat studiowania
                            </Subtitle>
                        </Content>
                    </Div>
                </Media>
            </>
        );
    }
}

export default LandingHeroSection;