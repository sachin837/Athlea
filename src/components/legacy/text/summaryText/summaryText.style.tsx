import styled, {css} from 'styled-components/native';

export const SummaryTextBase = styled.Text.attrs(
  ({numberOfLines, ellipsizeMode}) => ({
    numberOfLines: numberOfLines || 1, // Default to 1 line if not specified
    ellipsizeMode: ellipsizeMode || 'tail', // Default to 'tail' if not specified
  }),
)<{
  fontSize?: string;
  color?: string;
  fontWeight?: string;
  numberOfLines?: number;
  ellipsizeMode: 'head' | 'middle' | 'tail' | 'clip';
  padding?: number;
  paddingBottom?: number;
}>`
  ${({theme, fontSize, color, fontWeight, padding, paddingBottom}) => css`
    font-size: ${fontSize ? fontSize : theme.font.size[4]}px;
    color: ${color || theme.primaryscale[8]};
    font-weight: ${fontWeight || theme.font.weight.medium};
    padding: ${padding ? padding : 0}px;
    padding-bottom: ${paddingBottom ? paddingBottom : 0}px;
  `}
`;
