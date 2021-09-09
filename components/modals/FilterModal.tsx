import {useTheme} from '@react-navigation/native';
import React, {useState} from 'react';
import theme from '../../theme';
import styled from 'styled-components/native';
import {RangeSlider} from '../sliders';
import {Button, IconButton} from '../buttons';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import ActionTypes from '../../redux/actionTypes';
import CheckBox from '@react-native-community/checkbox';
interface ModalProps {
  open: boolean;
}
const Modal = styled.Modal`
  margin-top: 24px;
`;

const Content = styled.View`
  border-radius: 32px;
  border-color: ${theme.colors.primary};
  border-width: 2px;
  background-color: ${theme.colors.background};
  margin-top: 25%;
  margin-bottom: 25%;
  margin-left: 5%;
  margin-right: 5%;
  flex: 1;
  padding: 32px 24px;
`;

const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding-bottom: 8px;
  align-items: center;
`;

const HeaderText = styled.Text`
  color: ${theme.colors.text};
  font-size: 20px;
`;
const Line = styled.View`
  height: 1px;
  background-color: ${theme.colors.text};
  width: 100%;
  margin-bottom: 4px;
`;

const CheckBoxWrapper = styled.View`
  padding-top: 16px;
  flex-direction: row;
`;
const CheckBoxLabel = styled.Text`
  color: ${theme.colors.text};
  align-self: center;
  font-size: 14px;
`;
const FilterList = styled.ScrollView``;

const ButtonWrapper = styled.View`
  flex-direction: row;
  justify-content: center;
`;
const FilterModal = ({open, closeModal = () => {}}) => {
  const {colors} = useTheme();
  const {background} = colors;
  const dispatch = useAppDispatch();
  const data = useAppSelector(({data: {landings, search}}) => {
    const masses = landings.map(({mass}) => (mass ? parseInt(mass, 10) : 0));
    const years = landings
      .filter(({year}) => !!year)
      .map(({year}) => new Date(year).getTime());
    return {
      maxMass: Math.max(...masses),
      minMass: Math.min(...masses),
      maxYear: Math.max(...years),
      minYear: Math.min(...years),
      search,
    };
  });
  const [minYear, setMinYear] = useState(data.search.minYear || data.minYear);
  const [maxYear, setMaxYear] = useState(data.search.maxYear || data.maxYear);
  const [minMass, setMinMass] = useState(data.search.minMass || data.minMass);
  const [maxMass, setMaxMass] = useState(data.search.maxMass || data.maxMass);
  const [favoritesOnly, toggleFavorites] = useState(
    !!data.search.favoritesOnly,
  );
  const apply = () => {
    dispatch({
      type: ActionTypes.data.filter,
      // Only filter by dirty fields
      payload: {
        minYear: data.minYear === minYear ? null : minYear,
        maxYear: data.maxYear === maxYear ? null : maxYear,
        minMass: data.minMass === minMass ? null : minMass,
        maxMass: data.maxMass === maxMass ? null : maxMass,
        favoritesOnly,
      },
    });
    closeModal();
  };
  return (
    <Modal animationType="slide" visible={open} transparent>
      <Content color={background}>
        <Header>
          <HeaderText>Filters</HeaderText>
          <IconButton
            name={'close'}
            backgroundColor={theme.colors.card}
            color={theme.colors.primary}
            onPress={closeModal}
          />
        </Header>
        <Line />
        <FilterList>
          <RangeSlider
            label={'Year'}
            min={data.minYear}
            initialMin={data.search.minYear}
            initialMax={data.search.maxYear}
            max={data.maxYear}
            setMin={setMinYear}
            setMax={setMaxYear}
            renderValue={val => new Date(val).getFullYear()}
          />
          <RangeSlider
            label={'Mass'}
            min={data.minMass}
            max={data.maxMass}
            initialMin={data.search.minMass}
            initialMax={data.search.maxMass}
            setMin={setMinMass}
            setMax={setMaxMass}
            renderValue={val => {
              if (val / 1000000 > 1) {
                return `${(val / 1000000).toFixed(0)}Mg`;
              }
              if (val / 1000 > 1) {
                return `${val / 1000}kg`;
              }
              return `${val}g`;
            }}
          />
          <CheckBoxWrapper>
            <CheckBox
              boxType={'square'}
              disabled={false}
              // eslint-disable-next-line react-native/no-inline-styles
              style={{height: 16}}
              value={favoritesOnly}
              onValueChange={val => toggleFavorites(val)}
              tintColor={`${theme.colors.text}30`}
              onCheckColor={theme.colors.primary}
              onTintColor={theme.colors.primary}
              onAnimationType={'fill'}
              tintColors={{
                true: theme.colors.primary,
                false: theme.colors.card,
              }}
            />
            <CheckBoxLabel>{'Filter by My Favorites'}</CheckBoxLabel>
          </CheckBoxWrapper>
        </FilterList>
        <ButtonWrapper>
          <Button onPress={apply} label={'Apply'} />
          <Button secondary onPress={closeModal} label={'Close'} />
        </ButtonWrapper>
      </Content>
    </Modal>
  );
};

export default FilterModal;
