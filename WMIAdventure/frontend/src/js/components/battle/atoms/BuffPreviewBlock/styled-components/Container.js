import styled from 'styled-components';
import {
    buffExecuteTwoTimesEffectId,
    buffPowerId,
    damageEffectId,
    healEffectId,
    shieldEffectId
} from "../../../../../api/data-models/battle/EffectIds";

function colorHandle(theme, type) {
    switch (type) {
        case buffPowerId:
            return theme.colors.red;
        case damageEffectId:
            return theme.colors.red;
        case shieldEffectId:
            return theme.colors.purplyPinky;
        case buffExecuteTwoTimesEffectId:
            return theme.colors.yellowyOrangy;
        case healEffectId:
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