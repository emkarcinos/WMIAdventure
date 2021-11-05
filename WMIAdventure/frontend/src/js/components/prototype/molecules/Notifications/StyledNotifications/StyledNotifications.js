import styled from 'styled-components';
import Header from './Header';
import Item from './Item';
import List from './List';
import Paragraph from './Paragraph';

const StyledNotifications = styled.div`
  position: absolute;
  top: 64px;
  left: 0;
  width: 100vw;
  height: calc(100vh - 64px);
  background-color: ${({theme}) => theme.colors.darkTrans};
`;

StyledNotifications.Header = Header;
StyledNotifications.Item = Item;
StyledNotifications.List = List;
StyledNotifications.Paragraph = Paragraph;

export default StyledNotifications;