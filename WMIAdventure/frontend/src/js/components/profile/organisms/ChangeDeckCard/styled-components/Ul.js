import styled from 'styled-components';

const Ul = styled.ul`
  background-color: ${({theme}) => theme.colors.whiteAlmost};
  display: flex;
  flex-direction: column;

  @media (max-width: ${({theme}) => theme.overMobile}px) {
    width: 92%;
  }
  @media (min-width: ${({theme}) => theme.overMobile}px) {
    width: 440px
  }

  height: 100%;
  padding: 0 10px;
  margin: 0;
  border-radius: 20px;
`;

export default Ul;