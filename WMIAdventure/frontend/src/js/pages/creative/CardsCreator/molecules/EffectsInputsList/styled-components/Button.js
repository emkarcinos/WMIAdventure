import styled from 'styled-components';
import plusIcon from '../../../../../../../assets/icons/plus.svg';

const Button = styled.button`
  display: ${({access}) => access ? 'block' : 'none'};
  border: none;
  padding: 0;
  margin: 10px 0 0 8px;
  background-color: transparent;
  background-image: url(${plusIcon});
  background-position: center;
  background-repeat: no-repeat;
  width: 20px;
  height: 20px;
  cursor: pointer;

  /* Animation */
  transition: transform .3s ease-in-out;
  &:hover {
    transform: scale(1.25);
  }
`;

export default Button;