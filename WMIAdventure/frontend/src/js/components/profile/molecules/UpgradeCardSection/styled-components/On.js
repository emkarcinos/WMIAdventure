import styled from 'styled-components';
import Description from "./Description";

const On = styled(Description)`
  font-weight: ${({theme}) => theme.weight.regular};
  text-transform: uppercase;
`;

export default On;