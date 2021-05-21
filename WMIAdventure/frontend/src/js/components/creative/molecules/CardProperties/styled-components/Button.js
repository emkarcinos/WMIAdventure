import styled from 'styled-components';
import plus from '../../../../../../assets/icons/plus.svg';

const Button = styled.button`
  padding: 0;
  display: block;
  width: 32px;
  height: 32px;
  background-image: url(${plus});
  background-position: center;
  background-repeat: no-repeat;
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

export default Button;