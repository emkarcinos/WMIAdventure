import styled from 'styled-components';

const EffectIconsContainer = styled.div`
  display: ${({visible}) => visible ? 'block' : 'none'};
  position: absolute;
  top: calc(50% - 19px);
  left: calc(50% - 25px);
`;

export default EffectIconsContainer;