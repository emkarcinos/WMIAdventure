import styled from 'styled-components';

const Item = styled.li`
  display: flex;
  align-items: center;
  
  padding: 6px 10px;
  background-color: ${({theme}) => theme.colors.light2};
  width: 100%;
  height: 58px;
  transition: background-color 0.3s ease-in-out;
  border-radius: 6px;
  
  &:hover {
    background-color: ${({theme}) => theme.colors.userItemHover};
  }
`;

export default Item;