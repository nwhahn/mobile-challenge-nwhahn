import {useTheme} from '@react-navigation/native';
import React, {useState} from 'react';
import styled from 'styled-components/native';
import theme from '../../theme';
import {IconButton} from '../buttons';
import {Platform} from 'react-native';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import ActionTypes from '../../redux/actionTypes';
const InputWrapper = styled.View`
  flex: 1;
  flex-direction: row;
  margin-right: 8px;
  border-radius: 8px;
  background-color: ${theme.colors.card};
`;
const SearchBarInput = styled.TextInput`
  color: ${theme.colors.text};
  font-size: 16px;
  padding-top: ${Platform.OS === 'ios' ? 8 : 4}px;
  padding-bottom: ${Platform.OS === 'ios' ? 8 : 4}px;
`;

function debounce<T extends Function>(cb: T, timeout = 300) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => cb(...args), timeout);
  };
}
const SearchBar = () => {
  const {colors} = useTheme();
  const dispatch = useAppDispatch();
  const searchQuery = useAppSelector(
    ({
      data: {
        search: {query},
      },
    }) => query,
  );
  const [textValue, setTextValue] = useState(searchQuery);
  const {text} = colors;
  const commitChange = debounce(query => {
    dispatch({type: ActionTypes.data.search, payload: {query}});
  });
  const onChange = value => {
    setTextValue(value);
    commitChange(value);
  };

  return (
    <InputWrapper>
      <IconButton
        name={'search-outline'}
        backgroundColor={'transparent'}
        color={text}
        size={20}
        onPress={() => {}}
      />
      <SearchBarInput
        placeholder={'search'}
        placeholderTextColor={`${text}20`}
        onChangeText={onChange}
        value={textValue}
      />
    </InputWrapper>
  );
};

export default SearchBar;
