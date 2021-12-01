import React from 'react';
import Article from './styled-components/Article';
import H3 from './styled-components/H3';
import Category from './styled-components/Category';
import Img from './styled-components/Img';
import Tooltip from './styled-components/Tooltip';
import Describe from './styled-components/Describe';
import upload_image_dark from "../../../../../assets/icons/upload_image_dark.svg";
import BuffsContainer from "./styled-components/BuffsContainer";
import BuffPreviewBlock from "../../../battle/atoms/BuffPreviewBlock";

class FullCardView extends React.Component {

    /*
    props:
        common <- signal that card is common (lvl 1)
        gold <- signal that card is gold (lvl 2)
        epic <- signal that card is epic (lvl 3)
        cardName <- card name
        cardSubject <- card subject
        cardImage <- card icon
        cardTooltip <- funny card genesis
        description <- describe of card effects
     */

    cardNameLengthHandler = (cardNameLength) => {
        try {
            if (cardNameLength.length)
                return cardNameLength.length;
            return 0;
        } catch (e) {
            return 0;
        }
    }

    getBuffsPreview() {
        if (this.props.buffs && (this.props.buffs.length > 0)) {
            return (
                this.props.buffs.map((buff) => {
                    return (
                        <BuffPreviewBlock key={`buff-${buff.id}-fullCardView`}
                                          type={buff.buff_type} modifier={buff.modifier}/>
                    );
                })
            );
        }
    }

    render() {
        return (
            <Article common={this.props.common} gold={this.props.gold} epic={this.props.epic}
                     setTranslateY={this.props.setTranslateY}
                     hasBuff={this.props.buffs && (this.props.buffs.length > 0)}>
                <H3 common={this.props.common} gold={this.props.gold} epic={this.props.epic}
                    nameLength={this.cardNameLengthHandler(this.props.cardName)}>
                    {this.props.cardName ? this.props.cardName : "null"}
                </H3>
                <Category>
                    {this.props.cardSubject ? this.props.cardSubject : "null"}
                </Category>
                <Img src={this.props.cardImage ? this.props.cardImage : upload_image_dark} alt="Image for card."/>
                <Tooltip>
                    {this.props.cardTooltip ? this.props.cardTooltip : "null"}
                </Tooltip>
                <Describe>
                    {this.props.description ? this.props.description : "null"}
                </Describe>
                <BuffsContainer>
                    {this.getBuffsPreview()}
                </BuffsContainer>
            </Article>
        );
    }
}

export default FullCardView;