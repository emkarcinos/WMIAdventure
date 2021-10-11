import styled from 'styled-components';
import plus from '../../../../../../../assets/icons/plus.svg';
import plusDesktop from '../../../../../../../assets/icons/plusDesktop.svg'

function handleVisible(createCommon, createGold, createEpic) {
    if(createCommon && createGold && createEpic)
        return 'none';
    return 'flex';
}

const Button = styled.button`
  padding: 0;
  display: block;
  width: 16px;
  height: 16px;
  background-image: url(${plus});
  background-position: center;
  background-repeat: no-repeat;
  background-color: transparent;
  border: none;
  cursor: pointer;
  margin: 4px 0 0 12px;
  
  @media (min-width: ${({theme}) => theme.overMobile}px) {
    display: ${({createCommon, createGold, createEpic}) => handleVisible(createCommon, createGold, createEpic)};
    justify-content: center;
    align-items: center;
    font-weight: ${({theme}) => theme.weight.bold};
    font-size: 18px;
    padding-bottom: 52px;
    color: white;
    width: 380px;
    height: 532px;
    border-radius: 20px;
    border: solid 4px white;
    background-image: none;
    margin: 0 12px 24px;
    position: relative;
    
    :after {
      content: '';
      display: block;
      width: 42px;
      height: 42px;
      background-image: url(${plusDesktop});
      background-position: center;
      background-repeat: no-repeat;
      background-color: transparent;
      position: absolute;
      top: 272px;
    }
  }
`;

export default Button;