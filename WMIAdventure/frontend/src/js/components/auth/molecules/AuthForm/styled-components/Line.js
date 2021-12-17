import styled from 'styled-components';

const Line = styled.div`
  width: calc(100% - 8px);
  height: 1px;
  margin-bottom: 4px;
  background-color: ${({theme}) => theme.colors.dark};
`;

export default Line;