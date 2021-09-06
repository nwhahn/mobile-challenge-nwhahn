import {useTheme} from '@react-navigation/native';
import React from 'react';
import styled from 'styled-components/native';
import theme from '../../theme';
import {IconButton} from '../buttons';
import {Platform} from 'react-native';
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
const SearchBar = () => {
  const {colors} = useTheme();
  const {text} = colors;
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
      />
    </InputWrapper>
  );
};

export default SearchBar;
