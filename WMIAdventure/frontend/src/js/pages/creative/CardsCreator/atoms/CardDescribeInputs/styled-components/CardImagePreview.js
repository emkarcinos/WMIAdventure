import styled from 'styled-components'

const CardImagePreview = styled.img`
  /* Size */
  width: 200px;
  height: 200px;
  @media (max-width: 768px){
    width: 138px;
    height: 138px;
  }
  
  
  /* Styling */
  border-radius: 4px;
  background-color: ${({theme}) => theme.colors.grey1};
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.1);
  
  object-fit: contain;
`;

export default CardImagePreview;