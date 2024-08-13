import React, {useMemo} from 'react';
import {View, Text} from 'react-native';
import {useTheme} from 'styled-components/native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import useRenderBodyText from '../../../../hooks/useRenderBodyText.tsx';
import {MessageContainer, MessageText} from './actions.style.tsx';
import {useSelector} from 'react-redux';

const ActionsComp = ({
  MessageContent = '',
  activity,
  handleActionPress,
  size,
}) => {
  // Fetch actions from Redux store
  const rawActions = useSelector(state => state.actions.actions);
  // Transform actions with useMemo to prevent unnecessary recalculations
  const actions = useMemo(
    () =>
      rawActions.map(action => ({
        text: action.text,
        actionType: 'action',
        bodyPart: action.bodyPart,
        category: action.category.toLowerCase(),
      })),
    [rawActions],
  );

  const theme = useTheme();
  const renderBodyText = useRenderBodyText({
    size,
  });

  // Define your highlightedSections, actions, and graphTypes based on your application's needs
  const highlightedSections = [
    {
      text: '15 mins low intensity',
      reference: 'source',
      sourceUrl:
        'https://jissn.biomedcentral.com/articles/10.1186/s12970-018-0207-1',
    },
    {
      text: ' efficient fat metabolism is a significant advantage for endurance sports',
      reference: 'source',
      sourceUrl:
        'https://www.gssiweb.org/sports-science-exchange/article/nutritional-factors-that-affect-fat-oxidation-rates-during-exercise',
    },
    {
      text: 'improves anaerobic capacity',
      reference: 'source',
      sourceUrl:
        'https://www.evoq.bike/blog/anaerobic-capacity-cycling#:~:text=You%20can%20improve%20anaerobic%20capacity,minimum%20of%20three%20minutes%20rest.',
    },
    {
      text: 'improving economy of movement, delaying muscle fatigue, and preventing injuries',
      reference: 'source',
      sourceUrl: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC9319953/.',
    },
    {
      text: 'males aged 25-30 typically exhibit an average VO2max around 30-40 ml/kg/min',
      reference: 'source',
      sourceUrl: 'https://www.fitnescity.com/understanding-vo2-max',
    },
  ]; // This should be an array of objects containing text and sourceUrl

  const graphType = [
    // Your graph types here...
  ];

  const bodyText = useMemo(() => {
    return renderBodyText(
      MessageContent,
      highlightedSections,
      actions,
      graphType,
      null, // setSelectedGraphIndex not needed without interactivity
      null, // selectedGraphIndex not needed without interactivity
      handleActionPress,
    );
  }, [
    MessageContent,
    highlightedSections,
    actions,
    graphType,
    handleActionPress,
    renderBodyText,
  ]);

  return (
    <MessageContainer>
      <MessageText>{bodyText}</MessageText>
    </MessageContainer>
  );
};

export default ActionsComp;
