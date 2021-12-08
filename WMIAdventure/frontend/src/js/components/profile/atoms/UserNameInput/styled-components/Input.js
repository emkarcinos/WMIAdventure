import styled from 'styled-components';

const Input = styled.input`
  border: none;
  border-bottom: solid 1px ${({theme}) => theme.colors.dark};
  background-color: ${({theme}) => theme.colors.light2};
  color: ${({theme}) => theme.colors.dark};
  font-size: 18px;
  width: 100%;
  text-align: center;
  line-height: 24px;
  font-weight: ${({theme}) => theme.weight.light};

  &::placeholder {
    color: ${({theme}) => theme.colors.darkGray};
  }

  &:focus {
    outline: dotted 1px #333333;
  }
`;

export default Input;