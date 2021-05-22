import styled from 'styled-components';

function activeRankHandler(activeCardRank) {
    if(activeCardRank === 1)
        return '4px solid #6FCF97';
    if(activeCardRank === 2)
        return '4px solid #F2C94C';
    if(activeCardRank === 3)
        return '4px solid #BB6BD9';
    return 'none';
}

const Fieldset = styled.fieldset`
  width: 100%;
  height: 520px;
  border-radius: 20px;
  border: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  padding: 16px 16px 0 16px;
  margin: 0;
  
  background-color: ${({theme}) => theme.colors.ui01};
  border: ${({activeCardRank}) => activeRankHandler(activeCardRank)}
`;

export default Fieldset;