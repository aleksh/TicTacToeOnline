import IconHard from "../../src/assets/image/pchard.png";
import IconEasy from "../../src/assets/image/pseasy.png";
import IconMedium from "../../src/assets/image/psmedium.png";
import VOUser from "../VO/VOUser";

export const GAME_TYPES: number[] = [3, 5, 7];

export const PC_USERS: VOUser[] = [
    new VOUser("1", "easy PC", IconEasy,"", true, true),
    new VOUser("2", "Medium PC", IconMedium,"", true, true),
    new VOUser("3", "Hard PC", IconHard, "",true, true)
];

export const PC_USERS_COUNT:number = PC_USERS.length;
