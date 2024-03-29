export default class VOUser {

    uid: string = "";
    displayName: string = "";
    photoURL: string = "";
    email: string = "";
    isOnline: boolean = false;
    isPC: boolean = false;

    constructor(uid: string, displayName: string, pPhotoURL: string = "", pEmail:string = "", pIsOnline: boolean = true, isPC: boolean = false) {
        this.uid = uid;
        this.displayName = displayName;
        this.photoURL = pPhotoURL;
        this.email = pEmail;
        this.isOnline = pIsOnline;
        this.isPC = isPC;
    }

}