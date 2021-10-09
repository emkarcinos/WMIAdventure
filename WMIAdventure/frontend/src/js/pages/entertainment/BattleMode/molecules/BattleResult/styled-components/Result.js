import styled from 'styled-components';

const Result = styled.p`
  font-size: 24px;
  font-weight: 600;
  font-style: italic;
  color: ${({win}) => win ? 'green' : 'red'};
  text-align: center;
  margin: 0 0 32px 0;
  
  @media (min-width: ${({theme}) => theme.overMobile}px) {
    font-size: 48px;
  }
`;

export default Result;