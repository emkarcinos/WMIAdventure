import styled from 'styled-components';

const List = styled.ul`
  position: absolute;
  top: 16px;
  right: 24px;
  border-radius: 10px;
  margin: 0;
  padding: 8px;
  list-style: none;
  background-color: ${({theme}) => theme.colors.ui04};
  display: grid;
  grid-template-columns: auto;
  grid-row-gap: 8px;
  z-index: 3;
`;

export default List;