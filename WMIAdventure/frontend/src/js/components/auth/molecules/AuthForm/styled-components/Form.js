import styled from "styled-components";

const Form = styled.form`
  padding: 32px 24px;
  background-color: ${({theme}) => theme.colors.whiteAlmost};
  border-radius: 10px;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.15);
  width: 80%;
  max-width: 400px;
  max-height: 650px;
`;

export default Form