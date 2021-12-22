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
  min-height: 100vh;
  background-color: white;
  z-index: 14;
`;

export default Section;