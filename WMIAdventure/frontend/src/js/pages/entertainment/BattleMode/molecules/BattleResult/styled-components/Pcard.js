import styled from 'styled-components';

const Pcard = styled.p`
  display: ${({hide}) => hide ? 'none' : 'inline'};
  padding: 0;
  margin: 0 0 24px 0;
  font-size: 14px;
  text-align: center;

  @media (min-width: 440px) {
    font-size: 16px;
  }
  
  @media (min-width: 1200px) {
    display: ${({hide1200}) => hide1200 ? 'none' : 'inline'};
  }
`;

export default Pcard;