import styled from 'styled-components';

const Avatar = styled.img`
  width: 48px;
  height: 48px;
  
  @media(min-width: ${({theme}) => theme.overMobile}px) {
    width: 106px;
    height: 106px;
  }
`;

export default Avatar;