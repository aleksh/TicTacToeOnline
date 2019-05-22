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
import { GAME_TYPES, PC_USERS } from '../../utils/Constants';
import VOUser from '../../VO/VOUser';
import { any } from 'prop-types';
/*
interface IGameState {
    opponentUser: VOUser | undefined;
    isPlaying: boolean;
    amICross: boolean;
    type: number;
    isMyTurn: boolean;
    isOpponentTurn: boolean;
    time: number;
    isMeWin: boolean;
    isOponnentWin: boolean;
    isStepsExist: boolean;
    isDraw: boolean;
    items: VOTicItem[][];
    stepsCount: number;
}*/

const initialState= Map({
    opponentUser: undefined,
    isOpponentPC: false,
    isPlaying: false,
    amICross: true,
    type: GAME_TYPES[1],
    isMyTurn: true,    
    time: 30,    
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

        /*case types.SET_OPPONENT:
            return state.set('opponentUser', action.payload);*/
        case types.INVITE_OPPONENT:
            const opponent:VOUser = action.payload as VOUser;

            if(PC_USERS.filter((user) => user.id === opponent.id).length > 0) {
                console.log("Play With PC");

                return state.merge({                    
                    isOpponentPC: true,
                    isPlaying: true,
                    isMyTurn: true,
                });                
            } else {
                // invite online User
                

               /* return state.merge({                    
                    isOpponentPC: false,
                });*/
            }

            return state.set('isPlaying', true);

        case types.CHANGE_GAME_TYPE:
            items = initGameItems(action.payload) as VOTicItem[][];

            return state.merge({
                items,
                type: action.payload                
            });

        case types.SET_CHOICE:
            items = state.get('items') as VOTicItem[][];
            let isMyTurn:boolean =  Boolean(state.get('isMyTurn'));            
            let isOpponentPC:boolean = Boolean(state.get('isOpponentPC'));  
            let isPlaying:boolean = Boolean(state.get('isPlaying'));
            let type:number = Number(state.get('type'));            
            let stepsCount:number = Number(state.get('stepsCount'));
            let isStepsExist:boolean = setChoice(items, Number(action.payload), isMyTurn);
            let isDraw: boolean = checkDraw(items, type);
            let isWin:boolean = false;            
           
            if (!isDraw && (stepsCount+1) >= type && isStepsExist) {  
                isWin = isWinGame(items, type);
                console.log("isWin ======> "+isWin);            
            }            

            if(isWin || isDraw) {
                isPlaying = false;
                isOpponentPC = false;                
                console.log("FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF");
            } else {
                isMyTurn = !isMyTurn;
            }

            stepsCount++;
            return  state.merge({
                isMyTurn,
                isStepsExist,
                items,
                isDraw,
                isWin,
                stepsCount,
                isPlaying,
                isOpponentPC
            });                        

        default:
            return state;
    }
};
