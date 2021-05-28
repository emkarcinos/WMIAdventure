import styled from 'styled-components';
import Div from './Div';

const GoldDiv = styled(Div)`
  background-color: ${({active}) => active ? '#F2C94C' : '#E0E0E0'};
  color: ${({active}) => active ? '#FFF' : '#000'};
`;

export default GoldDiv;