import styled from 'styled-components';

const Footer = styled.footer`
  width: 100%;
  padding: 20px 0 40px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({theme}) => theme.colors.whiteAlmost};

  @media (min-width: ${({theme}) => theme.overMobile}px) {
    padding: 20px 0 64px 0;
  }
`;

export default Footer;