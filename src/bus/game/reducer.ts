// Core
import { Map } from 'immutable';


//Utils
import {
    initGameItems,
    setChoice,
    checkDraw,
    isWinGame
} from "../../utils/Utils";

// Types
import { types } from './types';
import VOTicItem from '../../VO/VOTicItem';
import { GAME_TYPES, PC_USERS } from '../../utils/Constants';

const initialState = Map({
    gameId: null,
    isPlaying: false,
    amICross: true,
    type: GAME_TYPES[1],
    isMyTurn: true,
    time: 30,
    isStepsExist: true,
    isDraw: false,
    isWin: false,
    items: initGameItems(GAME_TYPES[1]),
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
                isPlaying: true,
                gameId: action.payload.gameId,
                isMyTurn: action.payload.isMyTurn,
                amICross: action.payload.amICross,
            });

        case types.RESET_GAME:
            return state.merge({
                gameId: null,
                isPlaying: false,
                amICross: true,
                type: GAME_TYPES[1],
                isMyTurn: true,
                time: 30,
                isStepsExist: true,
                isDraw: false,
                isWin: false,
                items: initGameItems(GAME_TYPES[1]),
                stepsCount: 0,
            });

        case types.PLAY_WITH_PC:
            return state.merge({
                isPlaying: true,
                isMyTurn: true,
            });
        case types.CHANGE_GAME_TYPE:
            items = initGameItems(action.payload) as VOTicItem[][];

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
            const amICross:boolean = Boolean(state.get('amICross'));
            let isCross:boolean = amICross === isMyTurn ? true : false;
            console.log("REDUCER");
            console.log("isCross "+isCross)
            console.log("amICross "+amICross)
            console.log("isMyTurn "+isMyTurn)
            let isStepsExist: boolean = setChoice(items, Number(action.payload), isCross);
            let isDraw: boolean = checkDraw(items, type);
            let isWin: boolean = false;

            if (!isDraw && (stepsCount + 1) >= type && isStepsExist) {
                isWin = isWinGame(items, type);
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
