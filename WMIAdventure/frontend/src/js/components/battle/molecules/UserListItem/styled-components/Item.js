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
  height: 60px;
  transition: background-color 0.3s ease-in-out;
  border-radius: 6px;
  margin: 10px 0;
  cursor: pointer;

  &:hover {
    background-color: ${({theme}) => theme.colors.lightGray};
  }

  @media (min-width: ${({theme}) => theme.overMobile}px) {
    height: 72px;
  }
`;

export default Item;