import React from 'react';
import { useTheme } from 'styled-components/native'
import {
    TitleContainer, StarIcon, TrainingCardContainer, TrainingCardCard,
    TrainingCardInfoContainer, TrainingCardInfo, styles
} from '../StrengthTraining.styles';
import { Text } from '../../../../components';
import IntensityLevel from '../../../../components/basic/IntensityLevel/IntensityLevel';

const TrainingCard = () => {
  const theme = useTheme()

    return (
        <TrainingCardContainer>
            <TrainingCardCard>
                <TitleContainer style={styles.TrainingCardheaderStyles}>
                    <Text type="heading1" size={16} themeColor={'subtitle'} weight='bold'>{"Strength training"}</Text>
                    <StarIcon name="star-border" size={20} color="#333" />
                </TitleContainer>
                <TrainingCardInfoContainer>
                    <TrainingCardInfo>
                        <Text type={'small'} size={12} themeColor={'subtitle'} weight={400}>{"Duration"}</Text>
                        <Text type={'heading3'} themeColor={'subtitle'}>45'00"</Text>
                    </TrainingCardInfo>
                    <TrainingCardInfo>
                        <IntensityLevel level={3} />
                    </TrainingCardInfo>
                </TrainingCardInfoContainer>
                <Text type={'small'} size={14} themeColor={'subtitle'}>
                    {"Description orem ipsum dolor sit amet consectetur. Quis nisi elit volutpat sed aliquam ut massa ut"}
                </Text>
            </TrainingCardCard>
        </TrainingCardContainer>
    );
};

export default TrainingCard;
