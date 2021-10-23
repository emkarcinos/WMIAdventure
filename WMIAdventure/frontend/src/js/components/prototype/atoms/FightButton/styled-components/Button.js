import styled from 'styled-components';
import thunderIcon from '../../../../../../assets/icons/thunder.svg';

const Button = styled.button`
  padding: 16px 32px 16px 8px;
  margin: 0 12px 0 0;
  font-size: 14px;
  font-weight: 600;
  background-color: ${({theme}) => theme.colors.ui05};
  cursor: pointer;
  border: none;
  border-radius: 4px;
  position: relative;
  
  // :before {
  //   content: '';
  //   display: block;
  //   position: absolute;
  //   top: 8px;
  //   left: 2px;
  //   width: 18px;
  //   height: 28px;
  //   background-image: url(${thunderIcon});
  //   background-repeat: no-repeat;
  //   background-position: center;
  // }

  :after {
    content: '';
    display: block;
    position: absolute;
    top: 8px;
    right: 6px;
    width: 20px;
    height: 30px;
    background-image: url(${thunderIcon});
    background-repeat: no-repeat;
    background-position: center;
  }
`;

export default Button;