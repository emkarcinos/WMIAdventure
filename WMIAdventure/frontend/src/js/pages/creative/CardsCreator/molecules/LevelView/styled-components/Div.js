import styled from 'styled-components';

const Div = styled.div`
  display: ${({show}) => show ? 'flex' : 'none'};
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default Div;