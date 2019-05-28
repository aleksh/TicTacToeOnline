// Types
import { types } from './types';
import VOUser from '../../VO/VOUser';

export const gameActions = {

    playWithPC: () => {
        return {
            type: types.PLAY_WITH_PC,
        }
    },

    playWithUser: (value: any) => {
        return {
            type: types.PLAY_WITH_USER,
            payload: value,
        }
    },

    resetGame: () => {
        return {
            type: types.RESET_GAME,
        }
    },

    inviteToPlay: (userOpponent: VOUser) => {
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
    },



    // Async
    inviteToGameAsync: (invite: any) => {
        return {
            type: types.INVITE_OPPONENT_TO_GAME_ASYNC,
            payload: invite,
        };
    },

    removeGameAsync: (gameId: string) => {        
        return {
            type: types.REMOVE_GAME_ASYNC,
            payload: gameId,
        };
    },

};
