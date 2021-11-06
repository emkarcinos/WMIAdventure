import styled from 'styled-components';
import Div from './Div';

const GoldDiv = styled(Div)`
  background-color: ${({active, theme}) => active ? theme.colors.yellowyOrangy : theme.colors.lightGray};
  color: ${({active, theme}) => active ? theme.colors.whiteAlmost : theme.colors.dark};

  @media (min-width: ${({theme}) => theme.overMobile}px) {
    background-color: ${({exist, theme}) => exist ? theme.colors.yellowyOrangy : theme.colors.lightGray};
    color: ${({theme}) => theme.colors.whiteAlmost};
  }
`;

export default GoldDiv;