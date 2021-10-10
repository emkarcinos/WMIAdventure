import styled from 'styled-components';
import lvlIconCommon from '../../../../../../../assets/icons/lvlIconCommon.svg';
import lvlIconGold from '../../../../../../../assets/icons/lvlIconGold.svg';
import lvlIconEpic from '../../../../../../../assets/icons/lvlIconEpic.svg';

function iconHandler(common, gold, epic) {
    if(common)
        return lvlIconCommon;
    else if(gold)
        return lvlIconGold;
    else if(epic)
        return lvlIconEpic;
}

function iconHeightHandler(common, gold, epic) {
    if(common)
        return '15px';
    else if(gold)
        return '22px';
    else if(epic)
        return '31px';
}

function nameLengthHandler(nameLength) {
    if(nameLength < 16) {
        return '32px';
    } return '20px';
}
function nameLineHeightHandler(nameLength) {
    if(nameLength < 16) {
        return '36px';
    } return '24px';
}



const H3 = styled.h3`
  font-size: ${({nameLength}) => nameLengthHandler(nameLength)};
  padding: 4px;
  text-align: center;
  margin: 0;
  text-transform: uppercase;
  line-height: ${({nameLength}) => nameLineHeightHandler(nameLength)};
  overflow-wrap: anywhere;
  max-width: 156px;
  color: ${({theme}) => theme.colors.borderLine};
  
  &:before {
    content: '';
    display: block;
    width: 25px;
    height: ${({common, gold, epic}) => iconHeightHandler(common, gold, epic)};
    position: absolute;
    top: 32px;
    left: 12px;
    background-size: contain;
    background-image: url(${({common, gold, epic}) => iconHandler(common, gold, epic)});
    background-position: center;
    background-repeat: no-repeat;
  }

  &:after {
    content: '';
    display: block;
    width: 25px;
    height: ${({common, gold, epic}) => iconHeightHandler(common, gold, epic)};
    position: absolute;
    bottom: 32px;
    right: 12px;
    transform: rotate(180deg);
    background-size: contain;
    background-image: url(${({common, gold, epic}) => iconHandler(common, gold, epic)});
    background-position: center;
    background-repeat: no-repeat;
  }
`;

export default H3;