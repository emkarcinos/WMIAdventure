import styled from 'styled-components';
import pensil from '../../../../../../../assets/icons/pencil.svg';

const Button = styled.button`
  position: absolute;
  top: 112px;
  left: 8px;
  display: block;
  padding: 0;
  width: 30px;
  height: 30px;
  background-image: url(${pensil});
  background-position: center;
  background-repeat: no-repeat;
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

export default Button;