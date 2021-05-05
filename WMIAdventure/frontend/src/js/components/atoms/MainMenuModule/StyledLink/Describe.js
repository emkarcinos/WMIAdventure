import styled from 'styled-components';

const Describe = styled.p`
  z-index: 2;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 400;
  color: ${({theme}) => theme.colors.ui07};
  text-align: center;
  width: 300px;
  margin: 0;
`;

export default Describe;