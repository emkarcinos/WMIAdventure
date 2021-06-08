import React from 'react';
import showMore from '../../../../../../assets/icons/more.svg';
import MoreOptions from '../../atoms/MoreOptions/MoreOptions';
import Wrapper from './styled-components/Wrapper';
import Icon from './styled-components/Icon';

function ShowMoreButton() {

    const [moreOptions, setMoreOptions] = React.useState(false);

    function toggleMoreOptions() {
        let newMoreOptions = !moreOptions;
        setMoreOptions(newMoreOptions);
    }

    function showMoreOptions() {
        if(moreOptions) {
            return (
                <MoreOptions />
            );
        }
    }

    return (
        <>
            <Wrapper type='button' onClick={() => {toggleMoreOptions();}}>
                <Icon src={showMore} alt='Ikona więcej opcji - trzy kropki.'/>
            </Wrapper>
            {showMoreOptions()}
        </>
    );
}

export default ShowMoreButton;