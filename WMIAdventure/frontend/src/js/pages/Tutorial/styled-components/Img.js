import styled from 'styled-components';

const Img = styled.img`
  width: ${({setWidth}) => setWidth ? setWidth : 'auto'};
  height: ${({setHeight}) => setHeight ? setHeight : 'auto'};
`;

export default Img;