import styled from 'styled-components';

const Ul = styled.ul`
  background-color: ${({theme}) => theme.colors.ui01};
  display: flex;
  flex-direction: column;

  @media(max-width: ${({theme}) => theme.overMobile}px) {
    width: 92%;
  }
  @media(min-width: ${({theme}) => theme.overMobile}px) {
    width: 440px
  }
  
  height: 75%;

  padding: 0 10px;
  margin: 0;
  border-radius: 20px;
  overflow-y: scroll;
  scrollbar-width: none;
  -ms-overflow-style: none; /* IE 10+ */
  ::-webkit-scrollbar {
    display: none; /* Chrome Safari */
  }
`;

export default Ul;