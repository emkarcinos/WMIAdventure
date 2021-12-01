import styled from 'styled-components';
import {
    damageBuffId,
    executeTwoTimesBuffId,
    healBuffId,
    powerBuffId,
    shieldBuffId
} from "../../../../../api/data-models/battle/BuffIds";

function colorHandle(theme, type) {
    switch (type) {
        case powerBuffId:
            return theme.colors.red;
        case damageBuffId:
            return theme.colors.red;
        case shieldBuffId:
            return theme.colors.purplyPinky;
        case executeTwoTimesBuffId:
            return theme.colors.yellowyOrangy;
        case healBuffId:
            return theme.colors.greenyBluey;
        default:
            return theme.colors.purplyPinky;
    }
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 0 0 16px 16px;
  width: 64px;
  height: 72px;
  overflow: hidden;
  border: 1px solid ${({theme, type}) => colorHandle(theme, type)};
  background-color: ${({theme, type}) => colorHandle(theme, type)};
`;

export default Container;