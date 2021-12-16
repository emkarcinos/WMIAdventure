import React from 'react';
import Section from "./styled-components/Section";
import H2 from "./styled-components/H2";
import Grid from "./styled-components/Grid";

class LandingSection extends React.Component {
    render() {
        return (
            <Section ref={this.props.setRef}>
                <H2>
                    Co na ciebie czeka?
                </H2>
                <Grid>
                    {this.props.children}
                </Grid>
            </Section>
        );
    }
}

export default LandingSection;