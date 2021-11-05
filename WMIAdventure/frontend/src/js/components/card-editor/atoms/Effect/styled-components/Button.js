import styled from 'styled-components';

function visibilityHandler(name, searchInput) {
    if (name.toLowerCase().includes(searchInput.toLowerCase()) || searchInput === '') {
        return 'flex';
    }
    return 'none';
}

const Button = styled.button`
  padding: 12px 10px;
  margin: 0;
  list-style: none;
  display: ${({name, searchInput}) => visibilityHandler(name, searchInput)};
  flex-direction: column;
  justify-content: center;
  background-color: ${
    ({theme, disabled}) => disabled ? theme.colors.lightGray : "transparent"
};
  border: none;
  transition: background-color 0.4s ease-in-out;
  cursor: ${
    ({disabled}) => disabled ? "initial" : "pointer"
};
  
  :hover {
    // Ternary expression in case disabled button color changes in the future.
    background-color: ${({disabled, theme}) => disabled ? theme.colors.lightGray : theme.colors.lightGray};
  }
`;

export default Button;