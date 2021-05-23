import styled from 'styled-components';
import Div from './Div';

function showHandler(activeCardRank) {
    if(activeCardRank === 3)
        return 'flex';
    return 'none';
}

const EpicDiv = styled(Div)`
  display: ${({activeCardRank}) => showHandler(activeCardRank)};
`;

export default EpicDiv;