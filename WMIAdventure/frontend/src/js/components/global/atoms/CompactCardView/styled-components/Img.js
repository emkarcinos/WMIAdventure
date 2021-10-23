import styled from 'styled-components';

const Img = styled.img`
  width: ${({setIconWidth}) => setIconWidth ? setIconWidth : '90px'};
  height: ${({setIconHeight}) => setIconHeight ? setIconHeight : '90px'};
  object-fit: contain;
  margin-bottom: ${({setIconMarginBottom}) => setIconMarginBottom ? setIconMarginBottom : '14px'};
`;

export default Img;