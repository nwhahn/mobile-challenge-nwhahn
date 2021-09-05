interface ActionType {
  [actionType: string]: string;
}

interface ActionTypes {
  [section: string]: ActionType;
}

const ActionTypes = {
  data: {
    setLandings: 'DATA_SET_LANDINGS',
    favoriteItem: 'DATA_FAVORITE_ITEM',
    unfavoriteItem: 'DATA_UNFAVORITE_ITEM',
  },
};

export default ActionTypes;
