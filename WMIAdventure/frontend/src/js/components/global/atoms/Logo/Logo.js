import React from 'react';
import Media from "react-media";
import {desktop, mobile} from "../../../../utils/globals";
import Span from "../../molecules/Navbar/styled-components/Span";
import logo from "../../../../../assets/icons/logo.svg";
import FlexGapContainer from "../../molecules/FlexGapContainer/FlexGapContainer";
import LogoImage from "./styled-components/LogoImage";
import H1 from "./styled-components/H1";
import HomeLink from "./styled-components/HomeLink";

class Logo extends React.Component {
    render() {
        return (
            <>
                <Media query={mobile}>
                    <LogoImage setOpacity={this.props.setOpacity} src={logo}/>
                </Media>
                <Media query={desktop}>
                    <FlexGapContainer gap={'10px'} setRelative>
                        <H1 setFontSize={this.props.setFontSize}>
                            ~/<Span>WMI</Span> Adventure
                        </H1>
                        <LogoImage src={logo}/>
                        <HomeLink to={'/'}/>
                    </FlexGapContainer>
                </Media>
            </>
        );
    }
}

export default Logo;