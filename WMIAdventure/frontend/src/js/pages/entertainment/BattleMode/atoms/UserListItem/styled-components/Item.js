import styled from 'styled-components';

const Item = styled.li`
  display: flex;
  align-items: center;
  
  padding: 5px 10px;
  background-color: ${({theme}) => theme.colors.light2};
  width: 100%;
  height: 56px;
`;

export default Item;