import styled from 'styled-components';
import powerBuff from "../../../../../../assets/icons/power-buff.svg";
import damageBuff from "../../../../../../assets/icons/damage-buff.svg";
import shieldBuff from "../../../../../../assets/icons/shield-buff.svg";
import healBuff from "../../../../../../assets/icons/heal-buff.svg";
import doubleUseBuff from '../../../../../../assets/icons/double-use-buff.svg';
import {
    buffExecuteTwoTimesEffectId,
    buffPowerId,
    damageEffectId,
    healEffectId,
    shieldEffectId
} from "../../../../../api/data-models/battle/EffectIds";

function iconHandle(type) {
    switch (type) {
        case buffPowerId:
            return powerBuff;
        case damageEffectId:
            return damageBuff;
        case shieldEffectId:
            return shieldBuff;
        case buffExecuteTwoTimesEffectId:
            return doubleUseBuff;
        case healEffectId:
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