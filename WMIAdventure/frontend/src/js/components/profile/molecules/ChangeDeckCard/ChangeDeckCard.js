import React from "react";
import PopUp from "../../../global/organisms/PopUp";
import Search from "../../../global/atoms/Search";
import Card from "../../../card-editor/atoms/Card";
import {getAllCards} from "../../../../storage/cards/cardStorage";
import Ul from "./styled-components/Ul";
import CardChooseDiv from "./styled-components/CardChooseDiv";
import ColumnGapContainer from "../../../global/molecules/ColumnGapContainer";
import FlexGapContainer from "../../../global/molecules/FlexGapContainer/FlexGapContainer";
import CompactCardView from "../../../global/atoms/CompactCardView";
import ButtonWithIcon from "../../../global/atoms/ButtonWithIcon";
import UserInfo from "../../../global/atoms/UserInfo";
import P from "./styled-components/P";
import InputWithIcon from "../../../global/atoms/InputWithIcon";
import pencilGrey from "../../../../../assets/icons/pencil-grey.svg";
import eye from "../../../../../assets/icons/eye.svg";
import pencilWhite from "../../../../../assets/icons/pencil.svg"
import theme from "../../../../utils/theme";

/**
 * Props:
 * - parent - parent component that renders this component
 */
class ChangeDeckCard extends React.Component {
    state = {
        searchInput: '',
        allCards: [],
        setTranslateY: '100vh'
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
        setTimeout(() => this.setState({setTranslateY: '0'}), 1);

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

    getInputButton = () => {
        return (
            <InputWithIcon width={'20px'} type={'number'} min={'1'} max={'5'} icon={pencilGrey}/>
        )
    }

    close = () => {
        this.setState({setTranslateY: '100vh'});
        setTimeout(this.props.closeHandler, 1000);
    }

    render() {
        return (
            <>
                <PopUp visible={true}
                       closeHandler={this.close}
                       setTranslateY={this.state.setTranslateY}>
                    <ColumnGapContainer setWidth={'100%'} setHeight={'100%'} setPadding={'40px 20px 30px 20px'}
                                        gap={'10px'}>
                        <FlexGapContainer setWidth={'100%'} setPadding={'0px 27px'}
                                          space={true}>
                            <CompactCardView setMargin={'0'}>

                            </CompactCardView>
                            <ColumnGapContainer gap={'10px'}>
                                <UserInfo label={'Pozycja w talii'} value={this.getInputButton()}/>
                                <ButtonWithIcon icon={eye}>
                                    Podgląd
                                </ButtonWithIcon>
                                <ButtonWithIcon icon={pencilWhite} color={theme.colors.purplyPinky}>
                                    Zapisz
                                </ButtonWithIcon>
                            </ColumnGapContainer>
                        </FlexGapContainer>
                        <P>Wymień na</P>
                        {this.renderCardChoose()}
                    </ColumnGapContainer>
                </PopUp>
            </>
        );
    }
}

export default ChangeDeckCard;