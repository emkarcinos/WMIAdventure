import React from 'react';
import Article from './styled-components/Article';
import H3 from './styled-components/H3';
import Category from './styled-components/Category';
import Img from './styled-components/Img';
import Tooltip from './styled-components/Tooltip';
import Describe from './styled-components/Describe';
import upload_image_dark from "../../../../../../assets/icons/upload_image_dark.svg";

class FullCardView extends React.Component {
    render() {
        return (
            <Article common={this.props.common} gold={this.props.gold} epic={this.props.epic}>
                <H3 common={this.props.common} gold={this.props.gold} epic={this.props.epic}
                    nameLength={this.props.cardName.length}>
                    {this.props.cardName ? this.props.cardName : "null"}
                </H3>
                <Category>
                    {this.props.cardSubject ? this.props.cardSubject : "null"}
                </Category>
                <Img src={this.props.cardImage ? this.props.cardImage : upload_image_dark} alt="Image for card." />
                <Tooltip>
                    {this.props.cardTooltip ? this.props.cardTooltip : "null"}
                </Tooltip>
                <Describe>
                    {this.props.description ? this.props.description : "null"}
                </Describe>
            </Article>
        );
    }
}

export default FullCardView;