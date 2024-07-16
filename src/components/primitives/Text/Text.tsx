import {FC, useMemo} from 'react'
import type {TextProps} from './type.d.ts'
import {
  Body,
  Heading1,
  Heading2,
  Heading3,
  Small, StyledText,
  SubBody,
  SubHeading, SuperTiny,
  Tiny,
} from './Text.style.ts'
import {FontTypes} from './type.d.ts'


export const Text:FC<TextProps> = (props) => {

  const TextComponent = useMemo(() => {
    if (props.size) {
      return StyledText
    }
    switch (props.type) {
    case FontTypes.heading1:
      return Heading1
    case FontTypes.heading2:
      return Heading2
    case FontTypes.heading3:
      return Heading3
    case FontTypes.subheading:
      return SubHeading
    case FontTypes.body:
      return Body
    case FontTypes.subBody:
      return SubBody
    case FontTypes.small:
      return Small
    case FontTypes.tiny:
      return Tiny
    case FontTypes.superTiny:
      return SuperTiny
    default:
      return Body
    }
  }, [props.type, props.size])

  return (
    <TextComponent {...props} />
  )
}
