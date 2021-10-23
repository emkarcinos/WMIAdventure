import styled from 'styled-components';

function backColorHandler(theme, term, level, rank) {
    if(level < 10 || rank < 20 || term < 4)
        return theme.colors.common;
    else if((level >= 10 && level < 20) || (rank >= 20 && rank < 50) || (term >= 4 && term < 6))
        return theme.colors.gold;
    else if(level >= 20 || rank >= 50 || term >= 6)
        return theme.colors.epic;
}

const Label = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: ${({setMargin}) => setMargin ? setMargin : '0'};
  border-radius: 40px;
  border: 1px solid ${({theme, term, level, rank}) => backColorHandler(theme, term, level, rank)};
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.1);
  background-color: ${({theme}) => theme.colors.light2};
  padding: 0 6px;
  min-width: 40px;
  height: 24px;
`;

export default Label;