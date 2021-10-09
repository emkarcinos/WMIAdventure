import styled from 'styled-components';

const Paragraph = styled.p`
  font-weight: 600;
  margin: 0;
  font-size: 10px;
  
  @media (min-width: ${({theme}) => theme.overMobile}px) {
    font-size: 32px;
  }
`;

export default Paragraph;