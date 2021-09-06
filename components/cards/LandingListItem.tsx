import React from 'react';
import type {MeteoriteLanding} from '../../types';

import styled from 'styled-components/native';
import {useTheme} from '@react-navigation/native';
import {IconButton} from '../buttons';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {getLandingIsFavorited} from '../../redux/selectors';
import ActionTypes from '../../redux/actionTypes';
import theme from '../../theme';
interface LandingListItemProps {
  data: MeteoriteLanding;
}

const TouchableWrapper = styled.TouchableOpacity`
  background-color: ${({color}) => color};
  padding: 8px;
  border-radius: 8px;
  flex-direction: row;
`;
const FieldKey = styled.Text`
  color: ${theme.colors.text}40;
  margin-right: 8px;
`;
const FieldValue = styled.Text`
  color: ${theme.colors.text};
`;
const Header = styled.Text`
  color: ${({color}) => color};
  font-size: 20px;
`;
const Info = styled.View`
  flex: 3;
`;
const Line = styled.View`
  height: 1px;
  background-color: ${theme.colors.text};
  width: 100%;
  margin-bottom: 4px;
`;

const Actions = styled.View`
  flex: 1;
  justify-content: center;
  align-items: flex-end;
`;
const DataWrapper = styled.View`
  padding-top: 4px;
`;

const DataRow = styled.View`
  flex: 1;
  flex-direction: row;
  padding-bottom: 4px;
`;
const LandingListItem = ({
  data: {name, id, year, mass},
}: LandingListItemProps) => {
  const {colors} = useTheme();
  const {card, text} = colors;
  const isFavorited = useAppSelector(state => getLandingIsFavorited(state, id));
  const dispatch = useAppDispatch();
  return (
    <TouchableWrapper color={card}>
      <Info>
        <Header color={text}>{name}</Header>
        <Line />
        <DataWrapper>
          <DataRow>
            <FieldKey>Year:</FieldKey>
            <FieldValue>{new Date(year).getFullYear()}</FieldValue>
          </DataRow>
          <DataRow>
            <FieldKey>Mass:</FieldKey>
            <FieldValue>{mass}</FieldValue>
          </DataRow>
        </DataWrapper>
      </Info>
      <Actions>
        <IconButton
          name={isFavorited ? 'star' : 'star-outline'}
          onPress={() =>
            dispatch({
              type: !isFavorited
                ? ActionTypes.data.favoriteItem
                : ActionTypes.data.unfavoriteItem,
              payload: {
                id,
              },
            })
          }
          color={text}
          backgroundColor={'transparent'}
        />
      </Actions>
    </TouchableWrapper>
  );
};

export default LandingListItem;
