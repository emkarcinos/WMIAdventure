import styled from 'styled-components';
import Header from './Header';
import Table from './Table';
import Column from './Column';
import Row from './Row';

const StyledStatistic = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 8px;
`;

StyledStatistic.Header = Header;
StyledStatistic.Table = Table;
StyledStatistic.Column = Column;
StyledStatistic.Row = Row;

export default StyledStatistic;