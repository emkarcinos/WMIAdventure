import styled from 'styled-components';

const Nick = styled.p`
  font-family: 'Open Sans', sans-serif;
  font-size: 18px;
  font-weight: ${({theme}) => theme.weight.semibold};
  color: ${({theme}) => theme.colors.light2};
  margin: 0 0 0 10px;

  @media (min-width: ${({theme}) => theme.overMobile}px) {
    color: ${({theme}) => theme.colors.dark};
    margin: 12px 0 0 0;
  }
`;

export default Nick;