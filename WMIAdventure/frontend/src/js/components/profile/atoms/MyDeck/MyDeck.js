import React from 'react';
import ColumnGapContainer from "../../../global/molecules/ColumnGapContainer";
import Header from "./styled-components/Header";
import FlexGapContainer from "../../../global/molecules/FlexGapContainer/FlexGapContainer";
import MiniCard from "../MiniCard";


class MyDeck extends React.Component {

    render() {
        return (
            <ColumnGapContainer gap={'16px'} setMargin={'4px 0'}>
                <Header>
                    Twoja Talia
                </Header>

                <FlexGapContainer gap={'16px'}>
                    <MiniCard/>
                    <MiniCard/>
                    <MiniCard/>
                </FlexGapContainer>
                <FlexGapContainer gap={'16px'}>
                    <MiniCard borderDown/>
                    <MiniCard borderDown/>
                </FlexGapContainer>
            </ColumnGapContainer>
        );
    }
}

export default MyDeck;