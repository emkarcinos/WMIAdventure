import styled from 'styled-components';

const Name = styled.p`
  margin: 10px 0 32px 0;
  padding: 4px 4px 0;
  font-size: 20px;
  text-align: center;
  font-weight: ${({theme}) => theme.weight.semibold};
`;

export default Name;