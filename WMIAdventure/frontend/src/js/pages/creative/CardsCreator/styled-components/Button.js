import styled from 'styled-components';

function showHandler(show) {
    if(show === 'create')
        return 'none';
    else if (show === 'edit' || show === true)
        return 'block';
}

const Button = styled.button`
  display: ${({show}) => showHandler(show)};
  background-color: transparent;
  color: ${({theme, access}) => access ? theme.colors.ui01 : theme.colors.grey2};
  border: 2px solid ${({theme, access}) => access ? theme.colors.ui01 : theme.colors.grey2};
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  border-radius: 10px;
  padding: 12px;
  margin: 0 12px;
  cursor: ${({access}) => access ? 'pointer' : 'default'};
`;

export default Button;