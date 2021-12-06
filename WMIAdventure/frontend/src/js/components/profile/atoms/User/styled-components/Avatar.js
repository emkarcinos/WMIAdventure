import styled from 'styled-components';

const Avatar = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;

  @media (min-width: ${({theme}) => theme.overMobile}px) {
    width: 86px;
    height: 86px;
  }
`;

export default Avatar;