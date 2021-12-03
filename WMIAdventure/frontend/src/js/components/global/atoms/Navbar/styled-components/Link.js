import styled from 'styled-components';
import {Link} from 'react-router-dom';

const A = styled(Link)`
  display: flex;
  align-items: center;
  color: ${({theme}) => theme.colors.dark};
  text-decoration: none;
`;

export default A;