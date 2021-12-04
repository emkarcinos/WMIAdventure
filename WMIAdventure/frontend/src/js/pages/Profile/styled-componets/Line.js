import styled from 'styled-components';

const Line = styled.div`
  width: 100%;
  max-width: 304px;
  height: 1px;
  background-color: ${({theme}) => theme.colors.dark};
`;

export default Line;