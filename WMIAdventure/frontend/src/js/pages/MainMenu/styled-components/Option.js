import styled from 'styled-components';
import {Link} from "react-router-dom";

const Option = styled(Link)`
  text-decoration: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 2;
`;

export default Option;