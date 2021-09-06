interface ActionType {
  [actionType: string]: string;
}

interface ActionTypeSections {
  [section: string]: ActionType;
}

const ActionTypes: ActionTypeSections = {
  data: {
    setLandings: 'DATA_SET_LANDINGS',
    favoriteItem: 'DATA_FAVORITE_ITEM',
    unfavoriteItem: 'DATA_UNFAVORITE_ITEM',
    search: 'SEARCH',
  },
};

export default ActionTypes;
