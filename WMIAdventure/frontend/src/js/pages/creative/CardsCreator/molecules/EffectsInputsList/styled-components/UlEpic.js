import styled from 'styled-components';
import Ul from './Ul';

function rankHandlerEpic(rank) {
    if(rank === 3)
        return 'grid';
    return 'none'
}

const UlEpic = styled(Ul)`
  display: ${({rank}) => rankHandlerEpic(rank)};
`;

export default UlEpic;