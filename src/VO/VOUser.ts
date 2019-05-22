export default class VOUser {

    private _id:number = 0;
    private _displayName:string = "";
    private _avatarUrl:string = "";
    private _isOnline:boolean = false;
    private _isPC:boolean = false;

    constructor (id:number, displayName:string, pAvatarUrl:string = "", pIsOnline:boolean=true, isPC:boolean = false) {
        this._id = id;
        this._displayName = displayName;
        this._avatarUrl = pAvatarUrl;
        this._isOnline = pIsOnline;
        this._isPC = isPC;
    }
    
    public get id() : number { return this._id; }    
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