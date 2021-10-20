import styled from 'styled-components';

const Label = styled.label`
  position: absolute;
  top: 2px;
  left: 46px;
  font-size: 16px;
  font-weight: 600;
  margin: 0;
  
  @media (min-width: ${({theme}) => theme.overMobile}px) {
    font-size: 18px;
  }
`;

export default Label;