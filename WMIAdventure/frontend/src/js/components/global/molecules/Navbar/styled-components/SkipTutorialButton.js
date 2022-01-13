import styled from 'styled-components';
import {Link} from "react-router-dom";

const SkipTutorialButton = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 18px;
  color: ${({theme}) => theme.colors.dark};
  background-color: ${({theme}) => theme.colors.light2};
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.1);
  padding: 6px 12px;
  font-size: 14px;
  font-family: 'Open Sans', sans-serif;
  margin: 0;
  text-decoration: none;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }
`;

export default SkipTutorialButton;