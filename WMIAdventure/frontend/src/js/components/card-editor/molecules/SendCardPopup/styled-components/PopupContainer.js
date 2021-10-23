import styled from 'styled-components'

const PopupContainer = styled.div`
  display: flex;
  
  /* Flex options*/
  flex-direction: column;
  align-items: flex-start;
  
  /* Positioning and size */
  max-width: 95%;
  position: relative;
  padding: 24px 24px 32px 24px;
  @media (max-width: ${({theme}) => theme.overMobile}px){
    padding: 16px 16px 24px 16px;
  }
  z-index: 3;
  
  /* Styling */
  background: ${({theme}) => theme.colors.ui01};
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.15);
  border-radius: 10px;
`;

export default PopupContainer;