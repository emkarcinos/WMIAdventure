import styled from 'styled-components';

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-row-gap: 60px;

  @media (min-width: ${({theme}) => theme.overMobile}px) {
    grid-template-columns: 1fr 1fr 1fr;
    grid-row-gap: 50px;
    grid-column-gap: 38px;
  }
`;

export default Grid;