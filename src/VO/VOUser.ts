export default class VOUser {

    private _id:number = 0;
    private _displayName:string = "";
    private _isOnline:boolean = false;

    constructor (id:number, displayName:string, isOnline:boolean=true) {
        this._id = id;
        this._displayName = displayName;
        this._isOnline = isOnline;
    }

    
    public get id() : number { return this._id; }    

    public get displayName() : string { return this._displayName; }
    public set displayName (value:string) {
        this._displayName = value;
    }

    public get isOnline() : boolean { return this._isOnline; }
    public set isOnline (value:boolean) {
        this._isOnline = value;
    }
}