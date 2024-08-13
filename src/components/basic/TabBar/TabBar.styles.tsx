import styled, {css} from 'styled-components/native'


export const Tab = styled.TouchableOpacity<{active?: boolean}>`
  ${({theme, active}) => css`
    background: ${active ? 'white' : 'transparent'};
    flex: 1;
    align-items: center;
    padding: 4px 0;
    border-radius: 7px;
    margin: 2px;
  `}
`

export const TabContainer = styled.View`
  ${({theme}) => css`
    background: ${theme.tabBackground};
    flex-direction: row;
    border-radius: 8px;
    overflow: hidden;
`}
`
