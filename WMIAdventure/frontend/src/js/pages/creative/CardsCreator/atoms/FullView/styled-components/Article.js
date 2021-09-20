import styled from 'styled-components';

function colorHandler(common, gold, epic) {
    if(common)
        return '#6FCF97';
    else if(gold)
        return '#F2C94C';
    else if(epic)
        return '#4D15EA';
}

const Article = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 262px;
  height: 466px;
  background-color: ${({theme}) => theme.colors.grey1};
  margin-bottom: 14px;
  border-radius: 24px;
  position: relative;
  
  &:before {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 22px;
    border-top: 22px solid ${({common, gold, epic}) => colorHandler(common, gold, epic)};
    border-top-left-radius: 40px;
    border-top-right-radius: 40px;
  }

  &:after {
    content: '';
    display: block;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 22px;
    border-bottom: 22px solid ${({common, gold, epic}) => colorHandler(common, gold, epic)};
    border-bottom-left-radius: 40px;
    border-bottom-right-radius: 40px;
  }
`;

export default Article;