import styled from 'styled-components';
import Div from './Div';

const CommonDiv = styled(Div)`
  background-color: ${({active, theme}) => active ? theme.colors.greenyBluey : theme.colors.lightGray};
  color: ${({active, theme}) => active ? theme.colors.whiteAlmost : theme.colors.dark};

  @media (min-width: ${({theme}) => theme.overMobile}px) {
    background-color: ${({exist, theme}) => exist ? theme.colors.greenyBluey : theme.colors.lightGray};
    color: ${({theme}) => theme.colors.whiteAlmost};
  }
`;

export default CommonDiv;