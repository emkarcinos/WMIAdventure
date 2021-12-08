import React from "react";
import FlexGapContainer from "../../molecules/FlexGapContainer/FlexGapContainer";
import Input from "./styled-components/Input";
import Image from "./styled-components/Image";

class InputWithIcon extends React.Component {

    render() {
        return (
            <FlexGapContainer gap={'2px'}>
                <Input width={this.props.width} type={this.props.type} min={this.props.min} maxLength={this.props.max}
                       value={this.props.default}/>
                <Image src={this.props.icon} alt={'Edit icon'}/>
            < /FlexGapContainer>
        )

    }
}

export default InputWithIcon;