import styled from 'styled-components';

function visibilityHandler(displayedUsername, searchInput) {
    if (displayedUsername.toLowerCase().includes(searchInput.toLowerCase()) || searchInput === '') {
        return 'flex';
    }
    return 'none';
}

const Item = styled.li`
  display: ${({displayedUsername, searchInput}) => visibilityHandler(displayedUsername, searchInput)};
  align-items: center;
  
  padding: 6px 10px;
  width: 100%;
  height: 58px;
  transition: background-color 0.3s ease-in-out;
  border-radius: 6px;
  margin: 10px 0;
  
  &:hover {
    background-color: ${({theme}) => theme.colors.userItemHover};
  }
`;

export default Item;