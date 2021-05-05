import styled from 'styled-components';
import List from './List';
import Paragraph from './Paragraph';

const StyledMoreOptions = styled.div`
  position: absolute;
  top: 64px;
  left: 0;
  width: 100vw;
  height: calc(100vh - 64px);
  background-color: ${({theme}) => theme.colors.ui07trans};
`;

StyledMoreOptions.List = List;
StyledMoreOptions.Paragraph = Paragraph;

export default StyledMoreOptions;