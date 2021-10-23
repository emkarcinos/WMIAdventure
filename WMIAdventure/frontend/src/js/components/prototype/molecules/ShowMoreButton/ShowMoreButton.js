import React from 'react';
import showMore from '../../../../../assets/icons/more.svg';
import MoreOptions from '../../atoms/MoreOptions/MoreOptions';
import Wrapper from './styled-components/Wrapper';
import Icon from './styled-components/Icon';

class ShowMoreButton extends React.Component {

    state = {
        moreOptions: false,
    }

    toggleMoreOptionsHandler = (event) => {
        event.preventDefault();
        if(!this.state.moreOptions)
            this.setState({moreOptions: true});
        else this.setState({moreOptions: false});
    }

    hideMoreOptionsHandler = (event) => {
        event.preventDefault();
        this.setState({moreOptions: false});
    }

    render() {
        return (
            <>
                <Wrapper type='button' onClick={this.toggleMoreOptionsHandler}>
                    <Icon src={showMore} alt='Ikona więcej opcji - trzy kropki.'/>
                </Wrapper>
                <MoreOptions show={this.state.moreOptions}
                             hideMoreOptionsHandler={this.hideMoreOptionsHandler} />
            </>
        );
    }
}

export default ShowMoreButton;