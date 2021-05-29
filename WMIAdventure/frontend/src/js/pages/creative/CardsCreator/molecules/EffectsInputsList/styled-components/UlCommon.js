import styled from 'styled-components';
import Ul from './Ul';

function rankHandlerCommon(rank) {
    if(rank === 1)
        return 'grid';
    return 'none'
}

const UlCommon = styled(Ul)`
  display: ${({rank}) => rankHandlerCommon(rank)};
`;

export default UlCommon;