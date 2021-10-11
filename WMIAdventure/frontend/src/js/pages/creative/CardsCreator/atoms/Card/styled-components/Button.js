import styled from 'styled-components';
import kIcon from '../../../../../../../assets/icons/k-icon.svg';

function visibilityHandler(name, searchInput) {
    if (name.toLowerCase().includes(searchInput.toLowerCase()) || searchInput === '') {
        return 'flex';
    }
    return 'none';
}

const Button = styled.button`
  padding: 12px 10px 10px 48px;
  margin: 0;
  list-style: none;
  display: ${({name, searchInput}) => visibilityHandler(name, searchInput)};
  flex-direction: column;
  justify-content: center;
  background-color: transparent;
  border: none;
  transition: background-color 0.4s ease-in-out;
  cursor: pointer;
  position: relative;

  :hover {
    background-color: ${({theme}) => theme.colors.grey2};
  }
  
  :before {
    content: '';
    display: block;
    width: 26px;
    height: 26px;
    border-radius: 50%; // Making circular shape
    
    /* Background */
    background-image: url(${({image}) => image ? image : kIcon});
    background-position: center;
    background-repeat: no-repeat;
    background-size: 26px;
    
    /* Positioning */
    position: absolute;
    top: 16px;
    left: 6px;
  }
`;

export default Button;