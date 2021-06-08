import styled from 'styled-components';

const Describe = styled.p`
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 400;
  color: ${({theme}) => theme.colors.ui07};
  text-align: center;
  margin: 0;
  
  @media (min-width: 768px) {
    font-size: 18px;
    height: 100%;
    width: 300px;
  }
`;

export default Describe;