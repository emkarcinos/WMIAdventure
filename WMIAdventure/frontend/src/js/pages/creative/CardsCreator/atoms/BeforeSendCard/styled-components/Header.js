import styled from 'styled-components'

const Header = styled.h1`
  /* Styling */
  font-size: 36px;
  @media (max-width: ${({theme}) => theme.overMobile}px){
    font-size: 24px;
  };
  font-weight: ${({theme}) => theme.weight.semibold};
  line-height: 60%;
  color: ${
    ({theme}) => theme.colors.text01
};
`;

export default Header;