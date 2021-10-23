import styled from 'styled-components';

const Article = styled.article`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: ${({setMargin}) => setMargin};
`;

export default Article;