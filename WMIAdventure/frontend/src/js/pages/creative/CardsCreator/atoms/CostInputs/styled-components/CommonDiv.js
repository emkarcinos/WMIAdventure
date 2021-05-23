import styled from 'styled-components';
import Div from './Div';

function showHandler(activeCardRank) {
    if(activeCardRank === 1)
        return 'flex';
    return 'none';
}

const CommonDiv = styled(Div)`
  display: ${({activeCardRank}) => showHandler(activeCardRank)};
`;

export default CommonDiv;