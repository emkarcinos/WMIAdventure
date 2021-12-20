import styled from 'styled-components';
import {userCommonLevelColorRange, userGoldLevelColorRange} from "../../../../../utils/globals";

function backColorHandler(theme, term, level, rank) {
    if (level < userCommonLevelColorRange || rank < 20 || term < 4)
        return theme.colors.greenyBluey;
    else if ((level >= userCommonLevelColorRange && level < userGoldLevelColorRange)
        || (rank >= 20 && rank < 50) || (term >= 4 && term < 6))
        return theme.colors.yellowyOrangy;
    else if (level >= userGoldLevelColorRange || rank >= 50 || term >= 6)
        return theme.colors.purplyPinky;
}

const Label = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: ${({setMargin}) => setMargin ? setMargin : '0'};
  border-radius: 40px;
  border: 1px solid ${({theme, term, level, rank}) => backColorHandler(theme, term, level, rank)};
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.1);
  background-color: ${({theme}) => theme.colors.light2};
  padding: 0 8px;
  min-width: 42px;
  height: 26px;
`;

export default Label;