import React from 'react';
import SiteHeader from "./styled-components/SiteHeader";
import Nav from "./styled-components/Nav";
import LandingLogin from "../../atoms/LandingLogin";
import Logo from "../../../global/atoms/Logo";

class LandingNavBar extends React.Component {
    render() {
        return (
            <SiteHeader>
                <Nav>
                    <Logo setOpacity={'0'}/>
                    <LandingLogin text='Zaloguj się' url='/login'/>
                </Nav>
            </SiteHeader>
        );
    }
}

export default LandingNavBar;