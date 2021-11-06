import styled from 'styled-components';

const List = styled.ul`
  width: 160px;
  position: absolute;
  top: 16px;
  right: 16px;
  background-color: ${({theme}) => theme.colors.lightGray};
  border-radius: 10px;
  z-index: 3;
  margin: 0;
  padding: 10px;
`;

export default List;