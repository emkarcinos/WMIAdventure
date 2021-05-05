import styled from 'styled-components';
import colors from '../../../../utils/colors';
import {Link} from 'react-router-dom';

const A = styled(Link)`
  display: flex;
  align-items: center;
  color: ${colors.text01};
  text-decoration: none;
`;

export default A;