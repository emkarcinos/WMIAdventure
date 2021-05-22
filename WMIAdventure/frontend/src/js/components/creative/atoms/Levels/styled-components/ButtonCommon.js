import styled from 'styled-components';
import Button from './Button';

const ButtonCommon = styled(Button)`
  background-color: ${({active}) => active ? '#6FCF97' : '#E0E0E0'};
  color: ${({active}) => active ? '#FFF' : '#000'};
`;

export default ButtonCommon;