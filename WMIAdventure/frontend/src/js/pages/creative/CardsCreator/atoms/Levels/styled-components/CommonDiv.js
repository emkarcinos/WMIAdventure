import styled from 'styled-components';
import Div from './Div';

const CommonDiv = styled(Div)`
  background-color: ${({active, theme}) => active ? theme.colors.common : theme.colors.grey2};
  color: ${({active, theme}) => active ? theme.colors.ui01 : theme.colors.ui07};
  
  @media (min-width: 768px) {
    background-color: ${({exist, theme}) => exist ? theme.colors.common : theme.colors.grey2};
    color: ${({theme}) => theme.colors.ui01};
  }
`;

export default CommonDiv;