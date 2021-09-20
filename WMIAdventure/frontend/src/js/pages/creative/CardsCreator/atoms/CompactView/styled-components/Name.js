import styled from 'styled-components';

const Name = styled.p`
  margin: 10px 0 32px 0;
  font-size: 28px;
  font-weight: ${({theme}) => theme.weight.semibold};
`;

export default Name;