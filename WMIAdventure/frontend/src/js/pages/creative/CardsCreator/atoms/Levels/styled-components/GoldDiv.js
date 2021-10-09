import styled from 'styled-components';
import Div from './Div';

const GoldDiv = styled(Div)`
  background-color: ${({active, theme}) => active ? theme.colors.gold : theme.colors.grey2};
  color: ${({active, theme}) => active ? theme.colors.ui01 : theme.colors.ui07};

  @media (min-width: ${({theme}) => theme.overMobile}px) {
    background-color: ${({exist, theme}) => exist ? theme.colors.gold : theme.colors.grey2};
    color: ${({theme}) => theme.colors.ui01};
  }
`;

export default GoldDiv;