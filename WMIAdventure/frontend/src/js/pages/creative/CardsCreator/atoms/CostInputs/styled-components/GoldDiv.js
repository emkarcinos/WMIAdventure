import styled from 'styled-components';
import Div from './Div';

function showHandler(activeCardRank) {
    if(activeCardRank === 2)
        return 'flex';
    return 'none';
}

const GoldDiv = styled(Div)`
  display: ${({activeCardRank}) => showHandler(activeCardRank)};
`;

export default GoldDiv;