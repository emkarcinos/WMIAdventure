import styled, {keyframes} from 'styled-components';
import powerBuff from '../../../../../../assets/icons/power-buff.svg';
import healBuff from '../../../../../../assets/icons/heal-buff.svg';
import damageBuff from '../../../../../../assets/icons/damage-buff.svg';
import shieldBuff from '../../../../../../assets/icons/shield-buff.svg';
import {damageBuffId, healBuffId, shieldBuffId} from "../../../../../api/data-models/battle/BuffIds";

function iconHandle(type) {
    switch (type) {
        case null:
            return powerBuff;
        case damageBuffId:
            return damageBuff;
        case shieldBuffId:
            return shieldBuff;
        case healBuffId:
            return healBuff;
        default:
            return false;
    }
}

function fontSizeHandle(buffsCount) {
    if (buffsCount > 2)
        return '10px';
    return '14px';
}

function iconSizeHandle(buffsCount) {
    if (buffsCount > 2)
        return '8px';
    return '12px';
}

const initAnim = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const BuffValue = styled.div`
  font-size: ${({buffsCount}) => fontSizeHandle(buffsCount)};
  color: ${({theme}) => theme.colors.light2};
  font-family: 'Roboto', sans-serif;
  font-weight: ${({theme}) => theme.weight.regular};
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${initAnim} 0.3s ease-in-out 0s 1;

  &:after {
    content: ${({type}) => (type === 5) ? 'none' : `''`};
    display: ${({type}) => (type === 5) ? 'none' : 'flex'};
    margin: 0 0 2px 2px;
    width: ${({buffsCount}) => iconSizeHandle(buffsCount)};
    height: ${({buffsCount}) => iconSizeHandle(buffsCount)};
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    background-image: ${({type}) => iconHandle(type) ? `url(${iconHandle(type)})` : 'none'};
  }
`;

export default BuffValue;