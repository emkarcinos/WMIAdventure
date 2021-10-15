import React from 'react';
import PageButton from "./styled-components/PageButton";
import MainDiv from "./styled-components/MainDiv";

class Pager extends React.Component {
    render() {
        return (
            <MainDiv>
                <PageButton disabled={true}>&lt;</PageButton>
                <PageButton>1</PageButton>
                <PageButton>2</PageButton>
                <PageButton disabled={false}>&gt;</PageButton>
            </MainDiv>

        );
    }
}

export default Pager;