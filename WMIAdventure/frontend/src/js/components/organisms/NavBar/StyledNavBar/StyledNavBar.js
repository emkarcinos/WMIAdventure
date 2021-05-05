import styled from 'styled-components';
import colors from '../../../../utils/colors';
import IconsWrapper from './IconsWrapper';
import Navigation from './Navigation';

const StyledNavBar = styled.header`
  background-color: ${colors.ui04};
  width: 100%;
  height: 64px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 3;
`;

StyledNavBar.IconsWrapper = IconsWrapper;
StyledNavBar.Navigation = Navigation;

export default StyledNavBar;