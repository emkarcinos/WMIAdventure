import styled from 'styled-components';
import Button from './Button';
import menuIcon from '../../../../../../../assets/icons/menu.svg';

const Menu = styled(Button)`
  background-image: url(${menuIcon});
  width: 4px;
  height: 16px;
  margin-right: 24px;
`

export default Menu;