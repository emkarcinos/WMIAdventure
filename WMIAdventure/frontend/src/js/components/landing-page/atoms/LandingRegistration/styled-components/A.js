import styled, {keyframes} from 'styled-components';
import {Link} from "react-router-dom";

const inviteAnimation = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
`;

const A = styled(Link)`
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 128px;
  height: 36px;
  font-family: 'Open Sans', sans-serif;
  background-color: ${({theme}) => theme.colors.greenyBluey};
  color: ${({theme}) => theme.colors.whiteAlmost};
  font-weight: ${({theme}) => theme.weight.light};
  font-size: 16px;
  border-radius: 18px;
  padding: 0 12px;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out;
  z-index: 2;
  animation: ${inviteAnimation} 1.8s ease-in-out infinite;

  &:hover {
    transform: scale(1.2);
  }

  &:focus {
    outline-color: ${({theme}) => theme.colors.purplyPinky};
    transform: scale(1.2);
  }
`;

export default A;