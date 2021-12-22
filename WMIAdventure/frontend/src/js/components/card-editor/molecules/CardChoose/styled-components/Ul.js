import styled from 'styled-components';

const Ul = styled.ul`
  background-color: ${({theme}) => theme.colors.whiteAlmost};
  display: flex;
  flex-direction: column;

  height: 100%;
  width: 100%;
  margin: 0;
  border-radius: 20px;
  overflow-y: scroll;
  scrollbar-width: none;
  padding: 0;
  -ms-overflow-style: none; /* IE 10+ */

  ::-webkit-scrollbar {
    display: none; /* Chrome Safari */
  }
`;

export default Ul;