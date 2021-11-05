import styled from 'styled-components';

const Decoration = styled.div`
  background-color: ${({theme, win}) => win ? theme.colors.greenyBluey : theme.colors.red};
  width: 100%;
  height: 5px;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.1);
  position: absolute;
  top: 0;
  left: 0;
`;

export default Decoration;