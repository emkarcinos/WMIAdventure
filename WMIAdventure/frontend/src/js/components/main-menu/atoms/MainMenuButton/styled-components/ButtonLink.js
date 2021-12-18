import styled from 'styled-components';
import {Link} from "react-router-dom";

function alignSelfChoose(setSelfStart, setSelfEnd) {
    if (setSelfStart)
        return 'flex-start';
    else if (setSelfEnd)
        return 'flex-end';
    else return 'auto';
}

const ButtonLink = styled(Link)`
  text-decoration: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 2;
  align-self: ${({setSelfStart, setSelfEnd}) => alignSelfChoose(setSelfStart, setSelfEnd)};
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }

  @media (min-width: ${({theme}) => theme.overMobile}px) {
    margin: 100px 62px;
  }

  @media (min-width: ${({theme}) => theme.overMobile}px) and (max-width: 1312px) {
    margin: 100px 16px;
  }
`;

export default ButtonLink;