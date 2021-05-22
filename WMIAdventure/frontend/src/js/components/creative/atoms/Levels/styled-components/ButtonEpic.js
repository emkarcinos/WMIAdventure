import styled from 'styled-components';
import Button from './Button';

const ButtonEpic = styled(Button)`
  background-color: ${({active}) => active ? '#BB6BD9' : '#E0E0E0'};
  color: ${({active}) => active ? '#FFF' : '#000'};
`;

export default ButtonEpic;