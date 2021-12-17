import React from 'react';
import SiteHeader from "./styled-components/SiteHeader";
import Nav from "./styled-components/Nav";
import LandingLogin from "../../atoms/LandingLogin";
import Logo from "../../../global/atoms/Logo";
import Media from "react-media";
import {desktop, mobile} from "../../../../utils/globals";
import LandingRegistration from "../../atoms/LandingRegistration";
import FlexGapContainer from "../../../global/molecules/FlexGapContainer/FlexGapContainer";

class LandingNavBar extends React.Component {
    render() {
        return (
            <>
                <Media query={mobile}>
                    <SiteHeader>
                        <Nav showBackground={this.props.showBackground}>
                            <Logo setOpacity={this.props.showBackground ? '1' : '0'}/>
                            <LandingLogin text='Zaloguj się' url='/login'/>
                        </Nav>
                    </SiteHeader>
                </Media>
                <Media query={desktop}>
                    <SiteHeader>
                        <Nav showBackground={this.props.showBackground}>
                            <Logo fullVersion/>
                            <FlexGapContainer gap={'16px'}>
                                <LandingLogin text='Zaloguj się' url='/login'/>
                                <LandingRegistration text='Dołącz do nas' url='/registration'/>
                            </FlexGapContainer>
                        </Nav>
                    </SiteHeader>
                </Media>
            </>
        );
    }
}

export default LandingNavBar;