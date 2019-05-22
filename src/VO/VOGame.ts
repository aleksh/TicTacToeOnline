import VOUser from "./VOUser";
import { GAME_TYPES } from "../utils/Constants";
import { initGameItems } from "../utils/Utils";
import VOTicItem from "./VOTicItem";

export default class VOGame {
    private _opponentUser: VOUser | undefined;
    private _isPlaying: boolean = false;
    private _amICross: boolean = true;
    private _type: number = GAME_TYPES[1];
    private _isMyTurn: boolean = true;
    private _isOpponentTurn: boolean = false;
    private _time: number = 30;
    private _isMeWin: boolean = false;
    private _isOponnentWin: boolean = false;
    private _isStepsExist: boolean = true;
    private _isDraw: boolean = false;
    private _items: VOTicItem[][];
    private _stepsCount: number = 0;

    constructor(pOpponentUser: VOUser, pIsPlaying: boolean, pAmICross: boolean, pType: number, pIsMyTurn: boolean,
        pIsOpponentTurn: boolean, pTime: number, pIsMeWin: boolean, pIsOponnentWin: boolean, pIsStepsExist: boolean,
        pIsDraw: boolean, pItems: VOTicItem[][], pStepsCount: number) {

        this._opponentUser = pOpponentUser;
        this._isPlaying = pIsPlaying;
        this._amICross = pAmICross;
        this._type = pType;
        this._isMyTurn = pIsMyTurn;
        this._isOpponentTurn = pIsOpponentTurn;
        this._time = pTime;
        this._isMeWin = pIsMeWin;
        this._isOponnentWin = pIsOponnentWin;
        this._isStepsExist = pIsStepsExist;
        this._isDraw = pIsDraw;
        this._items = pItems;
        this._stepsCount = pStepsCount;
    }

    public get opponentUser():VOUser | undefined { return this._opponentUser;}
    public set opponentUser(value:VOUser | undefined) {
        this._opponentUser = value;
    }

    public get isPlaying():boolean { return this._isPlaying;}
    public set isPlaying(value:boolean) {
        this._isPlaying = value;
    }

    public get amICross():boolean { return this._amICross;}
    public set amICross(value:boolean) {
        this._amICross = value;
    }

    public get type():number { return this._type;}
    public set type(value:number) {
        this._type = value;
    }

    public get isMyTurn():boolean { return this._isMyTurn;}
    public set isMyTurn(value:boolean) {
        this._isMyTurn = value;
    }

    public get isOpponentTurn():boolean { return this._isOpponentTurn;}
    public set isOpponentTurn(value:boolean) {
        this._isOpponentTurn = value;
    }

    public get time():number { return this._time;}
    public set time(value:number) {
        this._time = value;
    }

    public get isMeWin():boolean { return this._isMeWin;}
    public set isMeWin(value:boolean) {
        this._isMeWin = value;
    }

    public get isOponnentWin():boolean { return this._isOponnentWin;}
    public set isOponnentWin(value:boolean) {
        this._isOponnentWin = value;
    }

    public get isStepsExist():boolean { return this._isStepsExist;}
    public set isStepsExist(value:boolean) {
        this._isStepsExist = value;
    }

    public get isDraw():boolean { return this._isDraw;}
    public set isDraw(value:boolean) {
        this._isDraw = value;
    }

    public get items():VOTicItem[][] { return this._items;}
    public set items(value:VOTicItem[][]) {
        this._items = value;
    }


    public get stepsCount():number { return this._stepsCount;}
    public set stepsCount(value:number) {
        this._stepsCount = value;
    }
}