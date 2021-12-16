import styled from 'styled-components';

const DesktopTitle = styled.p`
  margin: 0 0 48px 0;
  font-family: Hack, monospace;
  font-size: 52px;
  font-weight: ${({theme}) => theme.weight.bold};
  color: ${({theme}) => theme.colors.dark};
  text-transform: uppercase;

  @media (max-width: 1460px) {
    font-size: 44px;
    margin: 0 0 36px 0;
  }

  @media (max-width: 1260px) {
    font-size: 32px;
    margin: 0 0 28px 0;
  }
`;

export default DesktopTitle;