import styled from 'styled-components';

const Article = styled.article`
  display: ${({visible}) => visible ? 'flex' : 'none'};
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  min-height: 100%;
  padding: 36px 0 16px 0;
`;

export default Article;