import styled from 'styled-components';

const Ul = styled.ul`
  width: 100%;
  max-width: 340px;
  overflow-y: scroll;
  list-style: none;
  margin: 0 auto 92px;
  padding: 0 10px 10px;
  background-color: ${({theme}) => theme.colors.ui01};
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.1);
  position: relative;
`;

export default Ul;