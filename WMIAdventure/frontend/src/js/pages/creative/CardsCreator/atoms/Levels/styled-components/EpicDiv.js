import styled from 'styled-components';
import Div from './Div';

const EpicDiv = styled(Div)`
  background-color: ${({active, theme}) => active ? theme.colors.epic : theme.colors.grey2};
  color: ${({active, theme}) => active ? theme.colors.ui01 : theme.colors.borderLine};

  @media (min-width: ${({theme}) => theme.overMobile}px) {
    background-color: ${({exist, theme}) => exist ? theme.colors.epic : theme.colors.grey2};
    color: ${({theme}) => theme.colors.ui01};
  }
`;

export default EpicDiv;