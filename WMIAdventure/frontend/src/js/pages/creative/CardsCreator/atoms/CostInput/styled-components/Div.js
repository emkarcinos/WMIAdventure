import styled from 'styled-components';

function showHandler(activeCardRank) {
    if(activeCardRank !== 0)
        return 'flex';
    return 'none';
}

const Div = styled.div`
  display: ${({activeCardRank}) => showHandler(activeCardRank)};
  align-items: center;
  justify-content: space-around;
  border-radius: 10px;
  width: 90%;
  height: 48px;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.1);
  background-color: #FFF;
`;

export default Div;