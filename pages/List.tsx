import React from 'react';
import styled from 'styled-components/native';
import {useAppSelector} from '../redux/hooks';
import {RootState} from '../redux/store';
import {LandingListItem} from '../components/cards';
import theme from '../theme';
const Wrapper = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding-top: 8px;
  padding-left: 16px;
  padding-right: 16px;
`;

const Separator = styled.View`
  height: 8px;
`;
const StyledFlatList = styled.FlatList`
  width: 100%;
`;
const EmptyCardWrapper = styled.View`
  background-color: ${theme.colors.card};
  border-radius: 8px;
  align-items: center;
  justify-content: center;
  padding: 16px;
`;

const EmptyText = styled.Text`
  color: ${theme.colors.text}50;
  font-size: 16px;
`;
const EmptyComponent = () => {
  return (
    <EmptyCardWrapper>
      <EmptyText>{'No content - try removing filters.'}</EmptyText>
    </EmptyCardWrapper>
  );
};
const List = () => {
  const landings = useAppSelector(
    ({data: {landings: items, search, filteredItems}}: RootState) =>
      search.enabled ? filteredItems : items,
  );
  const renderItem = ({item}) => <LandingListItem data={item} />;
  return (
    <Wrapper>
      <StyledFlatList
        data={landings}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        ItemSeparatorComponent={Separator}
        ListEmptyComponent={EmptyComponent}
      />
    </Wrapper>
  );
};

export default List;
