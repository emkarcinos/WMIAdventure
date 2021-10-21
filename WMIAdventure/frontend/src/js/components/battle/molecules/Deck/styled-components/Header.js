import styled from 'styled-components';

const Header = styled.p`
  @media (max-width: 399px) {
    font-size: 18px;
    margin: 0 0 12px 0;
  }

  font-family: 'Roboto', sans-serif;
  font-size: 24px;
  margin: 0 0 26px 0;
  font-weight: ${({theme}) => theme.weight.semibold};
  color: ${({theme}) => theme.colors.uiBlue};
  text-transform: uppercase;
`;

export default Header;