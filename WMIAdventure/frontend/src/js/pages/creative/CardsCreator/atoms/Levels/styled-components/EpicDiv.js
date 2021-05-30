import styled from 'styled-components';
import Div from './Div';

const EpicDiv = styled(Div)`
  background-color: ${({active, theme}) => active ? theme.colors.epic : theme.colors.grey2};
  color: ${({active, theme}) => active ? theme.colors.ui01 : theme.colors.ui07};
`;

export default EpicDiv;