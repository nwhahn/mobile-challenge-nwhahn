import React from 'react';
import type {MeteoriteLanding} from '../../types';

import styled from 'styled-components/native';
import {useTheme} from '@react-navigation/native';
import {IconButton} from '../buttons';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {getLandingIsFavorited} from '../../redux/selectors';
import ActionTypes from '../../redux/actionTypes';
interface LandingListItemProps {
  data: MeteoriteLanding;
}

const TouchableWrapper = styled.TouchableOpacity`
  background-color: ${({color}) => color};
  padding: 8px;
  border-radius: 8px;
  flex-direction: row;
`;

const Header = styled.Text`
  color: ${({color}) => color};
  font-size: 20;
`;
const Info = styled.View`
  flex: 3;
`;

const Actions = styled.View`
  flex: 1;
  justify-content: flex-end;
`;
const LandingListItem = ({data: {name, id}}: LandingListItemProps) => {
  const {colors} = useTheme();
  const {card, text} = colors;
  const isFavorited = useAppSelector(state => getLandingIsFavorited(state, id));
  const dispatch = useAppDispatch();
  return (
    <TouchableWrapper color={card}>
      <Info>
        <Header color={text}>{name}</Header>
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
