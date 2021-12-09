import styled from 'styled-components';

const AvatarContainer = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: ${({theme}) => theme.colors.whiteAlmost};

  @media (min-width: ${({theme}) => theme.overMobile}px) {
    width: 86px;
    height: 86px;
  }
`;

export default AvatarContainer;