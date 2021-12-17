import styled from 'styled-components';

const Line = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 1px;
  height: 100%;
  background-color: ${({theme}) => theme.colors.dark};
`;

export default Line;