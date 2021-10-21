import styled from 'styled-components';

const Article = styled.article`
  display: ${({visible}) => visible ? 'flex' : 'none'};
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export default Article;