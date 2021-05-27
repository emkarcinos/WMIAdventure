import styled from 'styled-components';

const Ul = styled.ul`
  background-color: ${({theme}) => theme.colors.ui01};
  flex-direction: column;
  
  width: 80%;
  height: 80%;
  
  padding: 0 10px;
  margin: 0;
  border-radius: 20px;
  overflow-y: scroll;
`;

export default Ul;