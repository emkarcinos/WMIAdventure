import React from 'react';
import Footer from "./styled-components/Footer";
import Logo from "../../../global/atoms/Logo";

class LandingFooter extends React.Component {
    render() {
        return (
            <Footer>
                <Logo headerAs={'p'} fullVersion/>
            </Footer>
        );
    }
}

export default LandingFooter;