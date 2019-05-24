export default class VOUser {

    private _uid:string = "";
    private _displayName:string = "";
    private _photoURL:string = "";
    private _isOnline:boolean = false;
    private _isPC:boolean = false;

    constructor (uid:string, displayName:string, pPhotoURL:string = "", pIsOnline:boolean=true, isPC:boolean = false) {
        this._uid = uid;
        this._displayName = displayName;
        this._photoURL = pPhotoURL;
        this._isOnline = pIsOnline;
        this._isPC = isPC;
    }
    
    public get uid() : string { return this._uid; }    
    public get isPC() : boolean { return this._isPC; }    

    public get displayName() : string { return this._displayName; }
    public set displayName (value:string) {
        this._displayName = value;
    }

    public get photoURL() : string { return this._photoURL; }
    public set photoURL (value:string) {
        this._photoURL = value;
    }

    public get isOnline() : boolean { return this._isOnline; }
    public set isOnline (value:boolean) {
        this._isOnline = value;
    }
}