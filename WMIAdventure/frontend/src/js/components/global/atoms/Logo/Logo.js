import React from 'react';
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
                {
                    this.props.fullVersion ?
                        <FlexGapContainer setZindex={this.props.setZindex}
                                          setMargin={this.props.setMargin}
                                          gap={'10px'} setRelative>
                            <H1 setFontSize={this.props.setFontSize}>
                                ~/<Span>WMI</Span> Adventure
                            </H1>
                            <LogoImage src={logo}/>
                            <HomeLink to={'/'}/>
                        </FlexGapContainer> :
                        <LogoImage setOpacity={this.props.setOpacity} src={logo}/>
                }
            </>
        );
    }
}

export default Logo;