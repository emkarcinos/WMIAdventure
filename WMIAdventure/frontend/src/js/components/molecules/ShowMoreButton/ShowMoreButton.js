import React from 'react';
import './ShowMoreButton.scss';

import showMore from '../../../../assets/icons/more.svg';
import MoreOptions from './MoreOptions/MoreOptions';

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
            <button className='ShowMoreButton' type='button' onClick={() => {toggleMoreOptions();}}>
                <img className='ShowMoreButton__icon' src={showMore} alt='Ikona więcej opcji - trzy kropki.'/>
            </button>
            {showMoreOptions()}
        </>
    );
}

export default ShowMoreButton;