import React from 'react';
import CardDescribePreview from '../../molecules/CardDescribePreview';
import Form from './styled-components/Form';
import Div from './styled-components/Div';
import CardProperties from '../CardProperties';

class CreateCard extends React.Component {
    state = {
        cardName: '',
        cardSubject: '',
        cardTooltip: '',
    }

    handleChange = (event) => {
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
                        <CardProperties />
                    </Form>
                </main>
            </Div>
        );
    }
}

export default CreateCard;