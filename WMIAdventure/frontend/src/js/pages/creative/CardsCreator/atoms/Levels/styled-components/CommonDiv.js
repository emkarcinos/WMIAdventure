import styled from 'styled-components';
import Div from './Div';

const CommonDiv = styled(Div)`
  background-color: ${({active}) => active ? '#6FCF97' : '#E0E0E0'};
  color: ${({active}) => active ? '#FFF' : '#000'};
`;

export default CommonDiv;