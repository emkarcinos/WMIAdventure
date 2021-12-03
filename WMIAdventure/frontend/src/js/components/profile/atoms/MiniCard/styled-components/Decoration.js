import styled from 'styled-components';

const Decoration = styled.div`
  width: 100%;
  height: 10px;
  border-radius: ${({borderDown}) => borderDown ? '0 0 16px 16px' : '16px 16px 0 0'};
  position: absolute;
  top: ${({borderDown}) => borderDown ? 'calc(100% - 10px)' : '0'};
  background-color: red;
`;

export default Decoration;