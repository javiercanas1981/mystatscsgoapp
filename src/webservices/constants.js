export const BASE_CUSTOM = 'CUSTOM';
export const LIMIT = 10; // Page size

export const KEY_API = '91F86CED3A7B719350D3EF329E9198A9';
export const STEAM_ID = '76561199035713234';
export const STEAM_ID_2 = '76561198890668304';

export const APP_ID = '730';

export const API_SteamPowered_ISteamUserStats_GetUserStatsForGame = `http://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v0002/?appid=${APP_ID}&key=${KEY_API}&steamid=`;
export const API_SteamPowered_ISteamUser_GetPlayerSummaries =`http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${KEY_API}&steamid=${STEAM_ID}`;
export const API_SteamPowered_ISteamUser_GetPlayerSummaries_SteamId2 =`http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${KEY_API}&steamid=${STEAM_ID_2}`;
export const API_SteamPowered_ISteamUser_Profile_GetMatchHistoryCompetitive = `https://steamcommunity.com/profiles/${STEAM_ID}/gcpd/${APP_ID}/?tab=matchhistorycompetitive`;
