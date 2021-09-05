interface ActionType {
  [actionType: string]: string;
}

interface ActionTypes {
  [section: string]: ActionType;
}

const ActionTypes = {
  data: {
    setLandings: 'DATA_SET_LANDINGS',
  },
};

export default ActionTypes;
