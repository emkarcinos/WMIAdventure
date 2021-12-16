import styled from 'styled-components';
import {Link} from "react-router-dom";

const A = styled(Link)`
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 82px;
  height: 26px;
  font-family: 'Open Sans', sans-serif;
  background-color: ${({theme}) => theme.colors.light2};
  color: ${({theme}) => theme.colors.dark};
  font-weight: ${({theme}) => theme.weight.light};
  font-size: 12px;
  border-radius: 18px;
  padding: 0 10px;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.2);
  }

  &:focus {
    outline-color: ${({theme}) => theme.colors.greenyBluey};
    transform: scale(1.2);
  }
`;

export default A;