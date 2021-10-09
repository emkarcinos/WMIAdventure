import styled from 'styled-components';

const Container = styled.div`
  /* Flex options */
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 32px;
  
  /* Positioning */
  position: relative;
  margin-bottom: 20px;

  /* Options for mobile devices */
  @media (max-width: 768px){
    gap: 8px;
  }
`;

export default Container;