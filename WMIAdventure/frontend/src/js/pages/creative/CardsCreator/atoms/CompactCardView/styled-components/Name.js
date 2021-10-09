import styled from 'styled-components';

const Name = styled.p`
  margin: 0 0 20px 0;
  padding: 14px 4px 0;
  font-size: 20px;
  text-align: center;
  font-weight: ${({theme}) => theme.weight.semibold};
`;

export default Name;