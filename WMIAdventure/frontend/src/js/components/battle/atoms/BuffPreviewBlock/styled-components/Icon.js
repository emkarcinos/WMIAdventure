import styled from 'styled-components';
import powerBuff from "../../../../../../assets/icons/power-buff.svg";
import damageBuff from "../../../../../../assets/icons/damage-buff.svg";
import shieldBuff from "../../../../../../assets/icons/shield-buff.svg";
import healBuff from "../../../../../../assets/icons/heal-buff.svg";
import doubleUseBuff from '../../../../../../assets/icons/double-use-buff.svg';
import {
    damageBuffId,
    executeTwoTimesBuffId,
    healBuffId,
    powerBuffId,
    shieldBuffId
} from "../../../../../api/data-models/battle/BuffIds";

function iconHandle(type) {
    switch (type) {
        case powerBuffId:
            return powerBuff;
        case damageBuffId:
            return damageBuff;
        case shieldBuffId:
            return shieldBuff;
        case executeTwoTimesBuffId:
            return doubleUseBuff;
        case healBuffId:
            return healBuff;
        default:
            return false;
    }
}

const Icon = styled.div`
  width: 32px;
  height: 32px;
  margin: 5px 0;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  background-image: url(${({type}) => iconHandle(type)});
`;

export default Icon;