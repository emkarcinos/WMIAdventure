import styled from 'styled-components';

const Row = styled.tr`
  display: inline-block;
  width: 100%;
  text-align: ${({textEnd}) => textEnd ? 'end' : 'start'};
  font-size: 14px;
  padding: 8px 0;
`;

export default Row;