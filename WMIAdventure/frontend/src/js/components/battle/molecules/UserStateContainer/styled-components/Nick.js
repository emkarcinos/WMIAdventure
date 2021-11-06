import styled from 'styled-components';

const Nick = styled.p`
  margin: 0 0 0 10px;
  font-family: 'Open Sans', sans-serif;
  font-size: 16px;
  font-weight: ${({theme}) => theme.weight.semibold};
  color: ${({theme}) => theme.colors.light2};
`;

export default Nick;