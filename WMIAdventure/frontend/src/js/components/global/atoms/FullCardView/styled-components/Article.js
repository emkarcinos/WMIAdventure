import styled from 'styled-components';

function colorHandler(common, gold, epic) {
    if (common)
        return ({theme}) => theme.colors.greenyBluey;
    else if (gold)
        return ({theme}) => theme.colors.yellowyOrangy;
    else if (epic)
        return ({theme}) => theme.colors.purplyPinky;
}

const Article = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 262px;
  height: 464px;
  background-color: ${({theme}) => theme.colors.light2};
  margin-bottom: 14px;
  border-radius: 24px;
  position: relative;
  overflow-y: hidden;
  font-family: 'Roboto', sans-serif;

  @media (min-width: ${({theme}) => theme.overMobile}px) {
    width: 300px;
    height: 500px;
  }

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