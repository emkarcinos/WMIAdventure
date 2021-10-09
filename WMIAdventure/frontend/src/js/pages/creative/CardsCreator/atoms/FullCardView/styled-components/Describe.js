import styled from 'styled-components';

const Describe = styled.p`
  font-size: 14px;
  font-weight: ${({theme}) => theme.weight.light};
  margin: 0;
  text-align: center;
  max-width: 220px;
`;

export default Describe;