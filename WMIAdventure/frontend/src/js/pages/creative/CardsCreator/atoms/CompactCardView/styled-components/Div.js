import styled from 'styled-components';

function colorHandler(common, gold, epic) {
    if(common)
        return ({theme}) => theme.colors.common;
    else if(gold)
        return ({theme}) => theme.colors.gold;
    else if(epic)
        return ({theme}) => theme.colors.epic;
}

const Div = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 144px;
  height: 220px;
  background-color: ${({theme}) => theme.colors.grey1};
  border-radius: 8px;
  position: relative;
  margin-bottom: 60px;
  padding-top: 18px;
  overflow-y: hidden;
  font-family: 'Roboto', sans-serif;

  &:before {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 20px;
    border-top: 22px solid ${({common, gold, epic}) => colorHandler(common, gold, epic)};
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
  }
`;

export default Div;