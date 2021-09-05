import React from 'react';
// import {useAppSelector} from '../redux/hooks';
// import type {RootState} from '../redux/store';
import {Text} from 'react-native';
import styled from 'styled-components/native';

const Wrapper = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const List = () => {
  return (
    <Wrapper>
      <Text>Charts</Text>
    </Wrapper>
  );
};

export default List;
