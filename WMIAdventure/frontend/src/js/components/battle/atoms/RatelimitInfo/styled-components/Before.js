import styled from "styled-components";

const Before = styled.div`
  position: absolute;
  left: 2px;
  width: 36px;
  height: 36px;
  border-radius: 50%;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: ${({access, theme}) => access ? theme.colors.greenyBluey : theme.colors.dark};
  background-position: center;
  background-repeat: no-repeat;
  background-size: 36px;

  font-family: 'Roboto', sans-serif;
  font-size: 24px;
  font-weight: ${({theme}) => theme.weight.light};
  text-align: center;
  line-height: 36px;
  color: ${({theme}) => theme.colors.whiteAlmost};
`;

export default Before;