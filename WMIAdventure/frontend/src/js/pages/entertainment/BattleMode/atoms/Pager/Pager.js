import React from 'react';
import PageButton from "./styled-components/PageButton";
import MainDiv from "./styled-components/MainDiv";

class Pager extends React.Component {
    render() {
        return (
            <MainDiv>
                <PageButton disabled={!this.props.previous}>&lt;</PageButton>
                <PageButton>1</PageButton>
                <PageButton disabled={!this.props.next}>&gt;</PageButton>
            </MainDiv>

        );
    }
}

export default Pager;