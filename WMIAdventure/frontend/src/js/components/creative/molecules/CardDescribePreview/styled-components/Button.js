import styled from 'styled-components';
import pensil from '../../../../../../assets/icons/pencil.svg';

const Button = styled.button`
  position: absolute;
  top: 40px;
  left: 16px;
  display: block;
  width: 32px;
  height: 32px;
  background-image: url(${pensil});
  background-position: center;
  background-repeat: no-repeat;
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

export default Button;