import styled from 'styled-components';

const Ul = styled.ul`
  background-color: ${({theme}) => theme.colors.ui01};
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
  width: 80%;
  height: 80%;
  
  padding: 0;
  margin: 0;
  border-radius: 20px;
`;

export default Ul;