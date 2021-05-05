import styled from 'styled-components';

const StyledWrapper = styled.div`
  display: grid;
  width: 80%;
  grid-template-rows: auto auto auto;
  grid-template-columns: auto;
  grid-row-gap: ${({rowGaps}) => rowGaps};
  margin-bottom: 16px;
`;

export default StyledWrapper;