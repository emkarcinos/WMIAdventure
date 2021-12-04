import styled from 'styled-components';

const Href = styled.a`
  display: flex;
  align-items: center;
  color: ${({theme}) => theme.colors.dark};
  text-decoration: none;
`;

export default Href;