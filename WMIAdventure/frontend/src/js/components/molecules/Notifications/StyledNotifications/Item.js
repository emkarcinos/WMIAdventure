import styled from 'styled-components';

const Item = styled.li`
  background-color: ${({theme}) => theme.colors.ui03};
  border-radius: 10px;
  padding: 12px;
`;

export default Item;