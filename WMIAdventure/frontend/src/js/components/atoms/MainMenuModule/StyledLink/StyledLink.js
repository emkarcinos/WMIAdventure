import styled from 'styled-components';
import {Link} from 'react-router-dom';
import colors from '../../../../utils/colors';

import Image from './Image';
import Header from './Header';
import Describe from './Describe';

const StyledLink = styled(Link)`
  background-color: ${colors.ui05};
  color: ${colors.ui06};
  width: 100%;
  height: 152px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom-right-radius: 50px;
  border-top-left-radius: 50px;
  position: relative;
  text-decoration: none;
  overflow: hidden;
`;

StyledLink.Image = Image;
StyledLink.Header = Header;
StyledLink.Describe = Describe;

export default StyledLink;