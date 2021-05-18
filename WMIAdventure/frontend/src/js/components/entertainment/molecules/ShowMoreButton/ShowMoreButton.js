import React from 'react';
import showMore from '../../../../../assets/icons/more.svg';
import MoreOptions from '../../atoms/MoreOptions/MoreOptions';
import StyledButton from './StyledButton';

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
            <StyledButton type='button' onClick={() => {toggleMoreOptions();}}>
                <StyledButton.Icon src={showMore} alt='Ikona więcej opcji - trzy kropki.'/>
            </StyledButton>
            {showMoreOptions()}
        </>
    );
}

export default ShowMoreButton;