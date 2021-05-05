import styled from 'styled-components';
import colors from '../../../../utils/colors';

const Paragraph = styled.p`
  text-decoration: none;
  color: ${colors.ui07};
  margin: ${({last}) => last ? '0' : '0 0 10px 0'};
  border-bottom: ${({border}) => border ? `1px solid ${colors.ui07}` : 'none'};
  padding: ${({border}) => border ? '0 0 10px 0' : '0'};
  display: block;
  text-align: center;
  font-size: 16px;
`;

export default Paragraph;