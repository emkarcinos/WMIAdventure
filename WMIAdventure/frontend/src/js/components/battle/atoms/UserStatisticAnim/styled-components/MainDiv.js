import styled from 'styled-components';

function handleHeight(type) {
    if(type === 'hp' || type === 'shield')
        return '22px';
    else return '28px';
}

const MainDiv = styled.div`
  height: ${({type}) => handleHeight(type)};
  width: 154px;
  border-radius: 76px;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.1);
  background-color: ${({theme}) => theme.colors.light2};
  position: relative;
  overflow: hidden;
  margin: ${({setMargin}) => setMargin ? setMargin : '0'};
`;

export default MainDiv;