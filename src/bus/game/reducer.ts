// Core
import { Map, fromJS } from 'immutable';


//Utils
import { initGameItems,
setChoice,
checkDraw,
isWinGame } from "../../utils/Utils";

// Types
import { types } from './types';
import VOTicItem from '../../VO/VOTicItem';

const initialState = Map({
    isPlaying: false,
    amICross: true,
    type: 3,
    isMyTurn: true,
    isOpponentTurn: false,
    time: 30,
    isMeWin: false,
    isOponnentWin: false,
    isStepsExist: true,
    isDraw: false,
    items: initGameItems(3),
    stepsCount: 0,
});

/*

oldContext.merge({
    "logged": true, 
    "error": false
});
*/

export const gameReducer = (state = initialState, action:any) => {
    switch (action.type) {
        case types.START_GAME:
            return state.set('isPlaying', true);

        case types.DRAW_GAME:
            return state.set('isDraw', true);

        case types.SET_CHOICE:
            const items:VOTicItem[][] = state.get('items') as VOTicItem[][];
            let isMyTurn:boolean = state.get('isMyTurn') as boolean;  
            let type:number = state.get('type') as number;            
            let stepsCount:number = state.get('stepsCount') as number;
            let isStepsExist:boolean = setChoice(items, action.payload, isMyTurn);
            let isDraw: boolean = checkDraw(items, type);
            let isWin:boolean = false;

            if ((stepsCount+1) >= type && isStepsExist) {  
                isWin = isWinGame(items, type);            
            }            

            if(!isWin) {
                isMyTurn = !isMyTurn
            }

            stepsCount++;
            const newState = state.merge({
                isMyTurn,
                isStepsExist,
                items,
                isDraw,
                isWin,
                stepsCount
            });

            console.log(items);
            return newState;

        default:
            return state;
    }
};
