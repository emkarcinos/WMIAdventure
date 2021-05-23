import styled from 'styled-components';
import plusIcon from '../../../../../../../assets/icons/plus.svg';

const Button = styled.button`
  border: none;
  padding: 0;
  margin: 10px 0 0 8px;
  background-color: transparent;
  background-image: url(${plusIcon});
  background-position: center;
  background-repeat: no-repeat;
  width: 20px;
  height: 20px;
`;

export default Button;