import styled from 'styled-components';

const Nick = styled.p`
  font-family: 'Open Sans', sans-serif;
  font-size: 18px;
  font-weight: ${({theme}) => theme.weight.semibold};
  color: ${({theme}) => theme.colors.light2};
  margin: 0 0 0 10px;
`;

export default Nick;