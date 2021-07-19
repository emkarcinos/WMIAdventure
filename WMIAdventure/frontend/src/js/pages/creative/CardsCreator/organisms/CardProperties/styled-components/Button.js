import styled from 'styled-components';
import plus from '../../../../../../../assets/icons/plus.svg';

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
`;

export default Button;