import styled from "styled-components";

const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 80%;
  width: auto;
  position: relative;
  margin: 0;
  background-color: ${({theme}) => theme.colors.whiteAlmost};
  border-radius: 20px;
  padding: 0 10px;

  @media (max-width: ${({theme}) => theme.overMobile}px) {
    width: 92%;
  }
  @media (min-width: ${({theme}) => theme.overMobile}px) {
    width: 440px
  }
`;

export default ColumnContainer;