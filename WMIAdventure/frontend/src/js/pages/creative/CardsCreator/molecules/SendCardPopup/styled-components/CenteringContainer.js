import styled from 'styled-components'

const CenteringContainer = styled.div`
  display: flex;

  /* Flex options */
  justify-content: center;
  align-items: center;

  /* Positioning and size */
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  /* Styling */
  background-color: transparent;
`;

export default CenteringContainer;