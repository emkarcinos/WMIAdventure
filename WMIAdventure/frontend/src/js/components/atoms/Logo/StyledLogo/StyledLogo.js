import styled from 'styled-components';

import Header from './Header';
import Image from './Image';
import Link from './Link';

const StyledLogo = styled.div`
  display: flex;
  align-items: center;
`;

StyledLogo.Header = Header;
StyledLogo.Image = Image;
StyledLogo.Link = Link;

export default StyledLogo;