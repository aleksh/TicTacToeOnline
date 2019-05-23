export default class VOTicItem {

    private _id:number = 0;
    private _isEmpty:boolean = false;
    private _isAcross:boolean = false;
    private _done:boolean = false;

    constructor (id:number, isEmpty:boolean = true, isAcross:boolean=true) {
        this._id = id;
        this._isEmpty = isEmpty;
        this._isAcross = isAcross;
    }

    
    public get id() : number { return this._id; }

    public get done() : boolean { return this._done; }
    public set done(value:boolean) {
        this._done = value;
    }

    public get isEmpty() : boolean { return this._isEmpty; }
    public set isEmpty (value:boolean) {
        this._isEmpty = value;
    }

    public get isAcross() : boolean { return this._isAcross; }
    public set isAcross (value:boolean) {
        this._isAcross = value;
    }
}