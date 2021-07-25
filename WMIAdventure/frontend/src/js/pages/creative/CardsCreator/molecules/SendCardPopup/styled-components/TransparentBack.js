import styled from 'styled-components';

const TransparentBack = styled.div`
  display: flex;
  
  /* Flex options */
  justify-content: center;
  align-items: center;
  
  /* Positioning and size */
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  width: 100%;
  height: 100%;

  /* Styling */
  background-color: black;
  opacity: 0.3;
`;

export default TransparentBack;