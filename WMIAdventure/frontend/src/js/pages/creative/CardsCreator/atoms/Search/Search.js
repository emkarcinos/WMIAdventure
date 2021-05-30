import React from 'react';
import P from './styled-components/P';
import Input from './styled-components/Input';

class Search extends React.Component {
    render() {
        return (
            <P>
                <Input placeholder='Wyszukaj' type='text'/>
            </P>
        );
    }
}

export default Search;