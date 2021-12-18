import styled from "styled-components";

const Submit = styled.input`
  width: 136px;
  height: 36px;
  border-radius: 6px;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.1);
  text-transform: uppercase;
  border: none;
  font-size: 14px;
  font-family: 'Roboto', sans-serif;
  font-weight: ${({theme}) => theme.weight.medium};
  color: ${({theme}) => theme.colors.dark};
  cursor: pointer;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }
`;

export default Submit