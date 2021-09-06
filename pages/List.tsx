import React from 'react';
import styled from 'styled-components/native';
import {useAppSelector} from '../redux/hooks';
import {RootState} from '../redux/store';
import {LandingListItem} from '../components/cards';
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
const List = () => {
  const landings = useAppSelector(
    ({
      data: {
        landings,
        search: {query = ''},
        filteredItems,
      },
    }: RootState) => (query?.length > 0 ? filteredItems : landings),
  );
  const renderItem = ({item}) => <LandingListItem data={item} />;
  return (
    <Wrapper>
      <StyledFlatList
        data={landings}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        ItemSeparatorComponent={Separator}
      />
    </Wrapper>
  );
};

export default List;
