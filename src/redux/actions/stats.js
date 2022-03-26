import axios from 'axios';
import * as constants from '../../webservices/constants';
import * as types from '../types/stats';
import {Actions} from 'react-native-router-flux';

export function updateStatsSelected(value) {
    console.log('updateStatsSelected.value', value.steamid);
    return {
        type: types.STATS_UPDATE_STAT,
        value,
        payload: value
    };
}

function updateStatsList(list, total, value) {
    console.log('action.updateStatsList.list', list);
    return {
        type: types.STATS_UPDATE_LIST,
        list,
        total,
        value
    };
}

export function updateStatsListOffset(value) {
    return {
        type: types.STATS_UPDATE_LIST_OFFSET,
        value,
    };
}

function setStatsFetching(value) {
    return {
        type: types.STATS_SET_FETCHING,
        value,
    };
}



export function initStatsList(item) {
    return (dispatch, getState) => {
        // Reset character list and set total to 0
        dispatch(updateStatsList([], 0, item));

        // Set offset to 0
        // dispatch(updateStatsListOffset(0));

        // Fetch list
        dispatch(fetchStatsList(item));
    };
}


export function fetchStatsList(item) {
    //console.log('fetchStatsList', item.steamid);
    return (dispatch, getState) => {
        dispatch(setStatsFetching(true));

        const state = getState();
        const list = state.stats.list;
        //const offset = state.stats.offset;
        //const limit = constants.LIMIT;

        const fetchUrl = constants.API_SteamPowered_ISteamUserStats_GetUserStatsForGame + item.steamid;
        //console.log('fetchUrl',fetchUrl);
        fetch(fetchUrl)
            .then(response => {
                dispatch(setStatsFetching(false));
                //console.log('StatsList response', response.playerstats);
                const _list = response.playerstats.achievements;
                const _list1 = response.playerstats.stats;//response && response.playerstats ? response.playerstats : [];
                // console.log('_list', _list);
                const total = 100;//response && response.playerstats ? response.playerstats.length : 0;


                // Concat list and _list
                const newList = [...list, ..._list,..._list1];
                //console.log('newList', newList[1]);

                dispatch(updateStatsList(newList, total, item));
            })
            .catch(error => {
                dispatch(setStatsFetching(false));
                console.error('StatsList error', error);
            });
    };
}

export function fetch(url) {
    //console.log('url', url);
    return axios
        .get(url)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            throw error;
        });
}

/*
*     let url =URL_LIST + option + API_KEY_ALT;
    return dispatch => {
        dispatch(fetchMovies());
        axios.get(url).then(res => {
                dispatch(fetchMoviesSuccess(res.data.results, category_name));
            }).catch(err => {
                dispatch(fetchMoviesFail(err.message));
            });
    };
*/
