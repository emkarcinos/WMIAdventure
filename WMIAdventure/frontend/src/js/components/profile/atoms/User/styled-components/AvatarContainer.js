import styled from 'styled-components';

const AvatarContainer = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: ${({theme}) => theme.colors.yellowyOrangy};
`;

export default AvatarContainer;