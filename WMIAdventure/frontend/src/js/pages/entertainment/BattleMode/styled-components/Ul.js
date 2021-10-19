import styled from 'styled-components';

const Ul = styled.ul`
  width: 100%;
  max-width: 340px;
  overflow-y: scroll;
  list-style: none;
  margin: 0 auto;
  padding: 0 10px 10px;
  background-color: ${({theme}) => theme.colors.ui01};
  border-radius: 20px;
`;

export default Ul;