import * as types from '../types/stats';

const initialState = {
    isFetching: false,
    list: [],
    total: 0,
    offset: 0,

    item: null,

    stats: {
        list: [],
        item2: null,
        isFetching: false,
        total: 0,
        offset: 0,
    },
};

export default function reducer(state = initialState, action = {}) {

    switch (action.type) {

        case types.STATS_UPDATE_STAT:
            return {
                ...state,
                item: action.value,
                stats: {
                    ...state.stats,
                    item2: action.value
                },
            };

        case types.STATS_UPDATE_LIST_OFFSET:
            return {
                ...state,
                stats: {
                    ...state.stats,
                    offset: action.value
                },
            };

        case types.STATS_SET_FETCHING:
            return {
                ...state,
                stats: {
                    ...state.stats,
                    isFetching: action.value
                },
            };

        case types.STATS_UPDATE_LIST:
            console.log('type',action.type, 'action.list', action.list);
            return {
                ...state,
                item: action.value,
                stats: {
                    list: action.list,
                    total: action.total,
                    item2: action.value
                }
            };

        default:
            return state;
    }
}
