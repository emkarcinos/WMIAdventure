import styled from 'styled-components';

/**
 * Chooses appropriate padding-top value for mobile sized screens (max 768px).
 * @param rank Active card's rank. (0 means none)
 * @returns {string} Chosen padding-top value.
 */
function handleExistMobile(rank) {
    if(rank !== 0)
        return '10px';
    return '0';
}

const DivScroll = styled.div`
  width: 100%;
  overflow-y: scroll;
  scrollbar-width: none;
  -ms-overflow-style: none; /* IE 10+ */
  ::-webkit-scrollbar {
    display: none; /* Chrome Safari */
  }
  padding: 10px; 
  @media (max-width: 768px) {
    padding-top: ${({rank}) => handleExistMobile(rank)};
  }
`;

export default DivScroll;