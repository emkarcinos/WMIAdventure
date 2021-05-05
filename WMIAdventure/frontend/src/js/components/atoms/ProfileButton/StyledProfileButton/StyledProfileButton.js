import styled from 'styled-components';
import {Link} from 'react-router-dom';
import Icon from './Icon';

const StyledProfileButton = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({theme}) => theme.colors.ui01};
  border: none;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  outline-color: ${({theme}) => theme.colors.brand01};
  padding: 0;
  margin: 0 52px 0 0;
`;

StyledProfileButton.Icon = Icon;

export default StyledProfileButton;