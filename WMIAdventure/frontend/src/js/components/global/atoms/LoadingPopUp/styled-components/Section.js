import styled from 'styled-components';

const Section = styled.section`
  width: 100%;
  height: 100vh;
  display: ${({visible}) => visible ? 'flex' : 'none'};
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${({theme}) => theme.colors.light2};
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
`;

export default Section;