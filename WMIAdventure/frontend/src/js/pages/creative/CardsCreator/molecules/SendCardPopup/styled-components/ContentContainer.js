import styled from 'styled-components'

const ContentContainer = styled.div`
  display: flex;
  
  /* Flex options */
  flex-direction: column;
  gap: 32px;
  @media (max-width: 768px){
    gap:16px
  }
  align-items: center;
`;

export default ContentContainer;