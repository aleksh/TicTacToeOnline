// Types
import { types } from './types';
import VOUser from '../../VO/VOUser';

export const gameActions = {

    inviteToPlay: (userOpponent:VOUser) => {
        return {
            type: types.INVITE_OPPONENT,
            payload: userOpponent,
        };
    },

    setChoice: (id: number) => {
        return {
            type: types.SET_CHOICE,
            payload: id,
        };
    },  

    changeGameType: (id: number) => {
        return {
            type: types.CHANGE_GAME_TYPE,
            payload: id,
        };
    }

};
