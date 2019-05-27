// Core
import { Map } from 'immutable';
import { GAME_TYPES } from '../../utils/Constants';
//Utils
import GameUtils from "../../utils/GameUtils";
import VOTicItem from '../../VO/VOTicItem';
// Types
import { types } from './types';



const initialState = Map({
    isInviteMe: false,
    gameId: null,
    isPlaying: false,
    amICross: true,
    type: GAME_TYPES[1],
    isMyTurn: true,
    time: 30,
    isStepsExist: true,
    isDraw: false,
    isWin: false,
    items: GameUtils.InitGameItems(GAME_TYPES[1]),
    stepsCount: 0,
});

export const gameReducer = (state = initialState, action: any) => {
    let items: VOTicItem[][];

    switch (action.type) {

        /*case types.START_GAME:
            return state.set('isPlaying', true);

        case types.DRAW_GAME:
            return state.set('isDraw', true);*/
        case types.PLAY_WITH_USER:
            return state.merge({
                isInviteMe: false,
                type: action.payload.type,
                items: GameUtils.InitGameItems(action.payload.type),
                isPlaying: true,
                gameId: action.payload.gameId,
                isMyTurn: action.payload.isMyTurn,
                amICross: action.payload.amICross,                
            });

        case types.RESET_GAME:
            return state.merge({
                isInviteMe: false,
                gameId: null,
                isPlaying: false,
                amICross: true,
                type: GAME_TYPES[1],
                isMyTurn: true,
                time: 30,
                isStepsExist: true,
                isDraw: false,
                isWin: false,
                items: GameUtils.InitGameItems(GAME_TYPES[1]),
                stepsCount: 0,
            });

        case types.PLAY_WITH_PC:
            return state.merge({
                isPlaying: true,
                isMyTurn: true,
            });
        case types.CHANGE_GAME_TYPE:
            items = GameUtils.InitGameItems(action.payload) as VOTicItem[][];

            return state.merge({
                items,
                type: action.payload
            });

        case types.SET_CHOICE:
            items = state.get('items') as VOTicItem[][];
            let isMyTurn: boolean = Boolean(state.get('isMyTurn'));
            let isPlaying: boolean = Boolean(state.get('isPlaying'));
            let type: number = Number(state.get('type'));
            let stepsCount: number = Number(state.get('stepsCount'));
            const amICross: boolean = Boolean(state.get('amICross'));
            let isCross: boolean = amICross === isMyTurn ? true : false;
            console.log("REDUCER");
            console.log("isCross " + isCross)
            console.log("amICross " + amICross)
            console.log("isMyTurn 2222222222222222222 " + isMyTurn)
            let isStepsExist: boolean = GameUtils.SetChoice(items, Number(action.payload), isCross);
            let isDraw: boolean = GameUtils.CheckDraw(items, type);
            let isWin: boolean = false;

            if (!isDraw && (stepsCount + 1) >= type && isStepsExist) {
                isWin = GameUtils.IsWinGame(items, type);
                console.log("isWin ======> " + isWin);
            }

            if (isWin || isDraw) {
                isPlaying = false;
                console.log("FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF");
            } else {
                isMyTurn = !isMyTurn;
            }

            stepsCount++;
            return state.merge({
                isMyTurn,
                isStepsExist,
                items,
                isDraw,
                isWin,
                stepsCount,
                isPlaying
            });

        default:
            return state;
    }
};
