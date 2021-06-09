import styled from 'styled-components';

const Back = styled.button`
  border: none;
  border-radius: 10px;
  background-color: ${({theme}) => theme.colors.ui04};
  padding: 6px 12px;
  margin: 0;
  font-size: 16px;
  cursor: pointer;
  
  @media (min-width: 768px) {
    font-size: 24px;
    padding: 12px 24px;
  }
`;

export default Back;