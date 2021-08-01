import styled from 'styled-components';
import plus from '../../../../../../../assets/icons/plus.svg';
import plusDesktop from '../../../../../../../assets/icons/plusDesktop.svg'

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
  
  @media (min-width: 768px) {
    font-weight: ${({theme}) => theme.weight.bold};
    font-size: 18px;
    padding-bottom: 52px;
    color: white;
    width: 380px;
    height: 532px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 20px;
    border: solid 4px white;
    background-image: none;
    margin: 0 0 24px 12px;
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