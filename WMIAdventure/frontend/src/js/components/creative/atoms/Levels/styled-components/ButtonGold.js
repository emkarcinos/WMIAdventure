import styled from 'styled-components';
import Button from './Button';

const ButtonGold = styled(Button)`
  background-color: ${({active}) => active ? '#F2C94C' : '#E0E0E0'};
  color: ${({active}) => active ? '#FFF' : '#000'};
`;

export default ButtonGold;