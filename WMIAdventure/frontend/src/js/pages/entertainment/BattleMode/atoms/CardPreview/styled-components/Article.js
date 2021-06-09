import styled from 'styled-components';

const Article = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 112px;
  background-color: ${({theme}) => theme.colors.ui05};
  border-radius: 12px;
  border: 2px solid ${({theme}) => theme.colors.hoverprimary};
  padding: 12px;
`;

export default Article;