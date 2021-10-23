import styled from 'styled-components';

const Article = styled.article`
  display: ${({visible}) => visible ? 'grid' : 'none'};
  grid-template-rows: 1fr auto;
  width: 100%;
  min-height: 100%;
  padding: 36px 0 16px 0;
`;

export default Article;