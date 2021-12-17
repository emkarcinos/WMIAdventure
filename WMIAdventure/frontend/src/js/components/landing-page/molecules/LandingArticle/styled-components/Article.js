import styled from 'styled-components';

const Article = styled.article`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;

  @media (min-width: ${({theme}) => theme.overMobile}px) {
    max-width: 360px;
    position: relative;
    padding: 0 20px;
  }
`;

export default Article;