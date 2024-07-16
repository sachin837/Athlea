import { FC, useCallback } from 'react'
import { ScrollViewWithHeaders } from '@codeherence/react-native-header'
import { AnimatedHeader, AnimatedHeaderLarge, BackHeader, Button, Text } from '../../../components'
import { ScrollView, SectionList, View, Image } from 'react-native'
import {
  Footer,
  MainContainer,
  SectionContainer,
  SelectableText,
  SportContainer,
  SportItem,
  styles,
  TitleContainer,
} from './AddSportType.styles'
import { useAddSportType } from './useAddSportType'
import Icons from '../../../assets/icons/Icons'
import { useTheme } from 'styled-components/native'

interface Props {

}

export const AddSportType: FC<Props> = (props) => {

  const {
    sectionData,
    isSelected,
    handleSelect,
    onContinue,
  } = useAddSportType()

  return (
    <MainContainer>
      <BackHeader title={'Add session'} />
      <ScrollView contentContainerStyle={styles.scrollContentContainer}>
        <TitleContainer>
          <Text type={'heading2'} style={{ fontWeight: 'bold', color: 'black' }}>Sport type</Text>
          <Text type={'subBody'} themeColor={'subtitle'}>
            What sport type session would you like to add?
          </Text>
        </TitleContainer>
        {sectionData.map((section) => (
          <SectionContainer>
            <Text type={'subheading'} weight={'500'}>{section.title}</Text>
            <SportContainer>
              {section.data.map((type, index) => {
                const IconComponent = type.icon;
                return (
                  <SportItem
                    key={index}
                    selected={isSelected(type.name)}
                    onPress={handleSelect(type.name)}
                  >
                    <IconComponent
                      width={30}
                      fill='red'
                      stroke={isSelected(type.name) ? "#A0D911" : null}
                    />
                    <SelectableText type={'subBody'} selected={isSelected(type.name)}>
                      {type.name}
                    </SelectableText>
                  </SportItem>
                );
              })}
            </SportContainer>
          </SectionContainer>
        ))}
        <Footer>
          <Button
            outlined
            text={'+ Add new'}
          />
          <Button
            text={'Continue'}
            onPress={onContinue}
          />
        </Footer>
      </ScrollView>
    </MainContainer>
  )
}
