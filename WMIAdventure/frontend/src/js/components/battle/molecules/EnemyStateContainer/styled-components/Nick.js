import styled from 'styled-components';

const Nick = styled.p`
  margin: 0 0 0 10px;
  font-family: 'Open Sans', sans-serif;
  font-size: 16px;
  font-weight: ${({theme}) => theme.weight.regular};
  color: ${({theme}) => theme.colors.light2};

  @media (min-width: ${({theme}) => theme.overMobile}px) {
    font-size: 24px;
    line-height: 32px;
    margin: 0;
  }
`;

export default Nick;