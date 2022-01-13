import React from 'react';
import PageButton from "./styled-components/PageButton";
import MainDiv from "./styled-components/MainDiv";

class Pager extends React.Component {
    render() {
        return (
            <MainDiv setMargin={this.props.setMargin}>
                <PageButton disabled={!this.props.previous} onClick={this.props.onPrevious}>&lt;</PageButton>
                <PageButton notClickable>{this.props.page}</PageButton>
                <PageButton disabled={!this.props.next} onClick={this.props.onNext}>&gt;</PageButton>
            </MainDiv>

        );
    }
}

export default Pager;