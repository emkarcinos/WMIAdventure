import styled from 'styled-components';

const Section = styled.div`
  display: ${({show}) => show ? 'flex' : 'none'};
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: white;
  z-index: 4;
`;

export default Section;