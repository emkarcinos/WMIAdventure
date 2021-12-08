import React from "react";
import FlexGapContainer from "../../molecules/FlexGapContainer/FlexGapContainer";
import Input from "./styled-components/Input";
import Image from "./styled-components/Image";

class InputWithIcon extends React.Component {
    state = {
        input: 0
    }

    componentDidMount() {
        this.setState({input: this.props.default});
    }

    onChange = (event) => {
        const typedValue = event.target.value % 10
        const newValue = Math.min(Math.max(typedValue, this.props.min), this.props.max);
        this.setState({input: newValue})
        this.props.onChange(newValue);
    }

    render() {
        return (
            <FlexGapContainer gap={'2px'}>
                <Input width={this.props.width} type={this.props.type} min={this.props.min} maxLength={this.props.max}
                       value={this.state.input} onChange={this.onChange}/>
                <Image src={this.props.icon} alt={'Edit icon'}/>
            < /FlexGapContainer>
        )

    }
}

export default InputWithIcon;