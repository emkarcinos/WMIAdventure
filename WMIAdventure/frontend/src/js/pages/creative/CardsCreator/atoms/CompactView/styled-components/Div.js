import styled from 'styled-components';

function colorHandler(common, gold, epic) {
    if(common)
        return '#6FCF97';
    else if(gold)
        return '#F2C94C';
    else if(epic)
        return '#4D15EA';
}

const Div = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 116px;
  height: 182px;
  background-color: ${({theme}) => theme.colors.grey1};
  border-radius: 8px;
  position: relative;
  margin-bottom: 60px;

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