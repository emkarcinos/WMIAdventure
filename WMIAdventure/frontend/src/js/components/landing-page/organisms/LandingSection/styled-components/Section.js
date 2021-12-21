import styled from 'styled-components';

const Section = styled.section`
  padding: 20px;

  @media (min-width: ${({theme}) => theme.overMobile}px) {
    padding: 64px 24px 10px;
  }
`;

export default Section;