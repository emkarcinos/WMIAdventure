import styled from "styled-components";

const P = styled.p`
  font-family: 'Roboto', sans-serif;
  font-size: 12px;
  font-weight: ${({theme}) => theme.weight.light};
  color: ${({theme}) => theme.colors.darkGray};


  @media (min-width: ${({theme}) => theme.overMobile}px) {
    font-size: 20px;
    color: ${({theme}) => theme.colors.whiteAlmost};
  }
`;

export default P;