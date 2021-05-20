import React from 'react';
import CardDescribePreview from '../../molecules/CardDescribePreview';
import Form from './styled-components/Form';
import Div from './styled-components/Div';

class CardFormDesign extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    state = {
        cardName: '',
        cardSubject: '',
        cardTooltip: '',
    }

    handleChange(event) {
        const keyName = event.target.name;
        console.log(keyName);
        this.setState({[keyName] : event.target.value});
    }

    render() {
        return (
            <Div>
                <header></header>
                <main>
                    <Form>
                        <CardDescribePreview handleChange={this.handleChange}/>

                    </Form>
                </main>
            </Div>
        );
    }
}

export default CardFormDesign;