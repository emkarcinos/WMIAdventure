import styled from 'styled-components';

const Article = styled.article`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: ${({setMargin}) => setMargin};
  
  flex-direction: ${({vertical}) => vertical ? 'column' : 'row'};
`;

export default Article;