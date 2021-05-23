import styled from 'styled-components';
import Div from './Div';

const EpicDiv = styled(Div)`
  background-color: ${({active}) => active ? '#BB6BD9' : '#E0E0E0'};
  color: ${({active}) => active ? '#FFF' : '#000'};
`;

export default EpicDiv;