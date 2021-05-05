import styled from 'styled-components';
import colors from '../../../../utils/colors';

const List = styled.ul`
  width: 160px;
  position: absolute;
  top: 16px;
  right: 16px;
  background-color: ${colors.ui04};
  border-radius: 10px;
  z-index: 3;
  margin: 0;
  padding: 10px;
`;

export default List;