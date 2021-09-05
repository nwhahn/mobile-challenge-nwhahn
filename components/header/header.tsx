import React from 'react';
import type {HeaderTitleProps} from '@react-navigation/elements';
import {SearchBar} from '../inputs';
import {IconButton} from '../buttons';
import styled from 'styled-components/native';
import {useTheme} from '@react-navigation/native';
const Wrapper = styled.View`
  justify-content: space-between;
  flex-direction: row;
  width: 100%;
  padding: 4px;
`;

const Header = ({}: HeaderTitleProps) => {
  const {colors} = useTheme();
  return (
    <Wrapper>
      <SearchBar />
      <IconButton
        onPress={() => {}}
        name={'filter-outline'}
        size={20}
        backgroundColor={colors.card}
        color={colors.primary}
      />
    </Wrapper>
  );
};

export default Header;
