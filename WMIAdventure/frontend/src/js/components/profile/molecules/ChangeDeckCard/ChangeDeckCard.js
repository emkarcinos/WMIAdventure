import React from "react";
import PopUp from "../../../global/organisms/PopUp";
import Search from "../../../global/atoms/Search";
import Card from "../../../card-editor/atoms/Card";
import {getAllCards} from "../../../../storage/cards/cardStorage";
import Ul from "./styled-components/Ul";
import CardChooseDiv from "./styled-components/CardChooseDiv";
import ColumnGapContainer from "../../../global/molecules/ColumnGapContainer";

/**
 * Props:
 * - parent - parent component that renders this component
 */
class ChangeDeckCard extends React.Component {
    state = {
        searchInput: '',
        allCards: [],
    }

    handleSearch = (event) => {
        let keyValue = event.target.value;
        this.setState({searchInput: keyValue});
    }

    fetchCards = async () => {
        const cards = await getAllCards();
        this.setState({allCards: cards});
    }

    componentDidMount() {
        this.fetchCards();
    }

    renderCardChoose = () => {
        return (
            <>
                <CardChooseDiv>
                    <Search searchInput={this.state.searchInput} handleSearch={this.handleSearch}/>
                    <Ul>
                        {
                            this.state.allCards.map((card) => {
                                return (
                                    <React.Fragment key={`card-${card.id}`}>
                                        <Card id={card.id} name={card.name}
                                              subject={card.subject}
                                              tooltip={card.tooltip}
                                              image={card.image}
                                              searchInput={this.state.searchInput}
                                              levels={card.levels}
                                              chosenCardHandler={() => {
                                              }}/>
                                    </React.Fragment>
                                );
                            })
                        }
                    </Ul>
                </CardChooseDiv>
            </>
        )
    }

    render() {
        return (
            <>
                <PopUp visible={true}
                       closeHandler={this.props.closeHandler}>
                    <ColumnGapContainer setHeight={'100%'} setWidth={'100%'} setPadding={'40px 10px 30px 10px'}>
                        {this.renderCardChoose()}
                    </ColumnGapContainer>
                </PopUp>
            </>
        );
    }
}

export default ChangeDeckCard;