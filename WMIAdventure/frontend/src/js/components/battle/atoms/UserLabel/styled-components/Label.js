import styled from 'styled-components';

function backColorHandler(theme, term, level, rank) {
    if(term)
        return theme.colors.light2;
    else if(level < 10 || rank < 20)
        return theme.colors.common;
    else if((level >= 10 && level < 20) || (rank >= 20 && rank < 50))
        return theme.colors.gold;
    else if(level >= 20 || rank >= 50)
        return theme.colors.epic;
}

function colorHandler(theme, term, level, rank) {
    if((level < 10 || level >= 20) || (rank < 20 || rank >= 50))
        return theme.colors.ui01;
    else
        return theme.colors.borderLine;
}

const Label = styled.p`
  margin: ${({setMargin}) => setMargin};
  font-size: 10px;
  border-radius: 18px;
  background-color: ${({theme, term, level, rank}) => backColorHandler(theme, term, level, rank)};
  color: ${({theme, term, level, rank}) => colorHandler(theme, term, level, rank)};
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.1);
  padding: 4px 10px;
  font-family: 'Open Sans', sans-serif;
  font-weight: ${({theme}) => theme.weight.light};
`;

export default Label;