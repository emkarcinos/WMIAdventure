import styled from 'styled-components';

function visibilityHandler(login, searchInput) {
    if (login.toLowerCase().includes(searchInput.toLowerCase()) || searchInput === '') {
        return 'flex';
    }
    return 'none';
}

const Item = styled.li`
  display: ${({login, searchInput}) => visibilityHandler(login, searchInput)};
  align-items: center;
  
  padding: 6px 10px;
  background-color: ${({theme}) => theme.colors.light2};
  width: 100%;
  height: 58px;
  transition: background-color 0.3s ease-in-out;
  border-radius: 6px;
  margin: 5px 0;
  
  &:hover {
    background-color: ${({theme}) => theme.colors.userItemHover};
  }
`;

export default Item;