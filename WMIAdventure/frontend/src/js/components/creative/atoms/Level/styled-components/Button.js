import styled from 'styled-components';

const Button = styled.button`
  display: ${({show}) => show ? 'block' : 'none'};
`;

export default Button;