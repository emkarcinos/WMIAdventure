import styled from 'styled-components';
import {Link} from "react-router-dom";

const A = styled(Link)`
  text-decoration: underline;
  font-family: 'Open Sans', sans-serif;
  font-size: 16px;
  font-weight: ${({theme}) => theme.weight.light};
  color: ${({theme}) => theme.colors.dark};
`;

export default A;