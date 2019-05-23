export default class VOUser {

    private _uid:string = "";
    private _displayName:string = "";
    private _avatarUrl:string = "";
    private _isOnline:boolean = false;
    private _isPC:boolean = false;

    constructor (uid:string, displayName:string, pAvatarUrl:string = "", pIsOnline:boolean=true, isPC:boolean = false) {
        this._uid = uid;
        this._displayName = displayName;
        this._avatarUrl = pAvatarUrl;
        this._isOnline = pIsOnline;
        this._isPC = isPC;
    }
    
    public get uid() : string { return this._uid; }    
    public get isPC() : boolean { return this._isPC; }    

    public get displayName() : string { return this._displayName; }
    public set displayName (value:string) {
        this._displayName = value;
    }

    public get avatarUrl() : string { return this._avatarUrl; }
    public set avatarUrl (value:string) {
        this._avatarUrl = value;
    }

    public get isOnline() : boolean { return this._isOnline; }
    public set isOnline (value:boolean) {
        this._isOnline = value;
    }
}