import styled from 'styled-components';

const Avatar = styled.img`
  width: 34px;
  height: 34px;
  background-color: ${({theme}) => theme.colors.light2};
  border-radius: 50%;
  object-fit: cover;

  @media (min-width: ${({theme}) => theme.overMobile}px) {
    width: 80px;
    height: 80px;
  }
`;

export default Avatar;