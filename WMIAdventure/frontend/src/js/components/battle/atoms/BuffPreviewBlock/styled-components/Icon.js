import styled from 'styled-components';
import powerBuff from "../../../../../../assets/icons/power-buff.svg";
import damageBuff from "../../../../../../assets/icons/damage-buff.svg";
import shieldBuff from "../../../../../../assets/icons/shield-buff.svg";
import healBuff from "../../../../../../assets/icons/heal-buff.svg";
import doubleUseBuff from '../../../../../../assets/icons/double-use-buff.svg';

function iconHandle(type) {
    switch (type) {
        case null:
            return powerBuff;
        case 1:
            return damageBuff;
        case 2:
            return shieldBuff;
        case 5:
            return doubleUseBuff;
        case 6:
            return healBuff;
        default:
            return false;
    }
}

const Icon = styled.div`
  width: ${({type}) => (type === null) ? '12px' : '32px'};
  height: 32px;
  margin: 5px 0;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  background-image: url(${({type}) => iconHandle(type)});
`;

export default Icon;