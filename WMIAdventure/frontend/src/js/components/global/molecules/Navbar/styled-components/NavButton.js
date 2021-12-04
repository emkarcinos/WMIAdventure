import styled from 'styled-components';
import Button from './Button';

const NavButton = styled(Button)`
  background-image: ${({image}) => `url(${image})`};
  width: 22px;
  height: 24px;
  margin: 0 1px;
`

export default NavButton;