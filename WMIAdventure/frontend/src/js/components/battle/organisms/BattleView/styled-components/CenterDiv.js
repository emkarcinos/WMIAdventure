import styled from 'styled-components';

const CenterDiv = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: ${({setZindex}) => setZindex ? setZindex : '10'};
`;

export default CenterDiv;