import styled from 'styled-components';

const Avatar = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;

  @media(min-width: ${({theme}) => theme.overMobile}px) {
    width: 44px;
    height: 44px;
  }
`;

export default Avatar;