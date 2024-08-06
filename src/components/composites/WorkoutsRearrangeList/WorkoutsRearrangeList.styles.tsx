import styled, {css} from 'styled-components/native'


export const MainContainer = styled.View<{height: number}>`
    ${({height}) => css`
    height: ${height}
`}
`
