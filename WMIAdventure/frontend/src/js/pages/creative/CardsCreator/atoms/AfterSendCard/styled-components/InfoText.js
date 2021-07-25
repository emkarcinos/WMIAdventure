import styled from 'styled-components'

const InfoText = styled.div`
  /* Size */
  max-width: 372px;
  
  /* Styling */
  text-align: center;
  font-size: 24px;
  @media (max-width: 768px){
    font-size: 18px;
  }
  
  font-weight: ${({theme}) => theme.weight.light};
  line-height: 121%;
  color: ${
          ({theme}) => theme.colors.text02
  };
`;

export default InfoText;