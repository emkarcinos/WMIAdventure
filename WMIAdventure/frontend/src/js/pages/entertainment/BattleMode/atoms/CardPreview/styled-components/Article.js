import styled from 'styled-components';

const Article = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 120px;
  height: 160px;
  background-color: ${({theme}) => theme.colors.ui05};
  border-radius: 12px;
  border: 2px solid ${({theme}) => theme.colors.hoverprimary};
  padding: 12px;
  margin: 0 12px 8px;
  
  @media (min-width: 440px) {
    width: 130px;
    height: 190px;
    margin: 0 32px 12px;
  }

  @media (min-width: 768px) {
    margin: 0 128px 12px;
  }
  
  @media (min-width: 1200px) {
    margin: 0 8px 12px;
  }
`;

export default Article;