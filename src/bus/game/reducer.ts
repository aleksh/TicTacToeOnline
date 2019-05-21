// Core
import { Map } from 'immutable';


//Utils
import { initGameItems,
setChoice,
checkDraw,
isWinGame } from "../../utils/Utils";

// Types
import { types } from './types';
import VOTicItem from '../../VO/VOTicItem';
import { GAME_TYPES } from '../../utils/Constsnts';

const initialState = Map({
    isPlaying: false,
    amICross: true,
    type: GAME_TYPES[1],
    isMyTurn: true,
    isOpponentTurn: false,
    time: 30,
    isMeWin: false,
    isOponnentWin: false,
    isStepsExist: true,
    isDraw: false,
    items: initGameItems(GAME_TYPES[1]),
    stepsCount: 0,
});

export const gameReducer = (state = initialState, action:any) => {
    let items:VOTicItem[][];
    
    switch (action.type) {
        case types.START_GAME:
            return state.set('isPlaying', true);

        case types.DRAW_GAME:
            return state.set('isDraw', true);

        case types.CHANGE_GAME_TYPE:
            items = initGameItems(action.payload) as VOTicItem[][];

            return state.merge({
                items,
                type: action.payload                
            });

        case types.SET_CHOICE:
            items = state.get('items') as VOTicItem[][];
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
            return  state.merge({
                isMyTurn,
                isStepsExist,
                items,
                isDraw,
                isWin,
                stepsCount
            });                        

        default:
            return state;
    }
};
