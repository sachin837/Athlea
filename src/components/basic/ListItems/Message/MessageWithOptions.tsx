import {FC, useCallback, useState} from 'react'
import {useTheme} from 'styled-components/native'
import {MessageOption} from '../../../../model/chat'
import {Icons} from '../../../../assets/icons'
import {OptionContainer, OptionsContainer, OptionText} from './Message.styled'
import {FontTypes} from '../../../primitives/Text/type'
import {Text} from '../../../primitives'
import {View} from 'react-native'
import {Colors} from '../../../../theme'


interface Props {
  options?: MessageOption[]
  onSelect?: (option: MessageOption) => void
  multiselect?: boolean
  selected?: string[]
  fontType?: `${FontTypes}`
}

export const MessageWithOptions:FC<Props> = (props) => {

  const theme = useTheme()
  const [selectedOptions, setSelectedOptions] = useState<{[key: string]: boolean}>({})

  const onSelectOption = useCallback((option: MessageOption) => () => {
    setSelectedOptions(prev => {
      let update = {[option.value]: !prev[option.value]}
      if (props.multiselect) {
        update = {...prev, ...update}
      }
      console.log(update, !prev[option.value], 'values')
      return update
    })
    props.onSelect?.(option)
  }, [props.onSelect, props.multiselect])

  const isSelected = useCallback((item: MessageOption) => {
    return selectedOptions[item.value]
  }, [selectedOptions])

  const textColor = (selected: boolean) => selected ? theme.white : theme.subtitle

  return (
    <View style={{gap: 12}}>
      <OptionsContainer>
        {props.options?.map(item => (
          <OptionContainer
            selected={isSelected(item)}
            onPress={onSelectOption(item)}
          >
            {!!item.icon && (
              <Icons
                name={item.icon}
                color={textColor(isSelected(item))}
                size={16}
              />
            )}
            <OptionText type={props.fontType || 'small'} selected={isSelected(item)}>
              {item.label}
            </OptionText>
          </OptionContainer>
        ))}
      </OptionsContainer>
      <Text type={'tiny'} color={Colors.blackNew3}>Choose or type below</Text>
    </View>
  )
}
