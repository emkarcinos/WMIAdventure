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
  
  /* Animation */
  transition: transform .3s ease-in-out;
  &:hover {
    transform: scale(1.05);
  }

  /* Options for mobile devices */
  @media (max-width: ${({theme}) => theme.overMobile}px){
    gap: 8px;
  }
`;

export default Container;