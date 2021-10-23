import styled from 'styled-components';

const Icon = styled.img`
  min-width: 12px;
  min-height: 12px;
  width: auto;
  height: auto;
  max-width: 16px;
  max-height: 16px;

  @media(min-width: ${({theme}) => theme.overMobile}px) {
    max-width: none;
    max-height: none;
  }
`;

export default Icon;