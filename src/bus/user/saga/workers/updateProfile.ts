
import { call, put } from "redux-saga/effects";
import { auth, fb, prImagesRef } from "../../../../init/firebaseConfig";
import { modalActions } from "../../../modal/actions";
import { userActions } from "../../../user/actions";


export function* updateProfile({ payload: { file, displayName, loadedPhoto } }: any) {
    try {

        yield put(userActions.profileUpdating());
        let photoURL = "";

        if (file) {
            photoURL = yield call(_uploadProfileImage, auth.currentUser!.uid, loadedPhoto);
        }

        const data = yield call(_updateProfile, displayName, photoURL, auth.currentUser!.uid);
        yield put(userActions.profileUpdated(data));

    } catch (error) {
        yield put(userActions.profileUpdateError());
        yield put(modalActions.showError('Error logout saga => ' + error.message));
    }
}


const _updateProfile = (displayName: string, photoURL: string, uid: string) => {
    return new Promise((resolve, reject) => {
        var data: { [k: string]: any } = { displayName };

        if (photoURL.length > 0) {
            data["photoURL"] = photoURL;
        }

        fb.database().ref("users/" + uid).update(data).then(() => {
            resolve(data);
        }).catch(error => {
            reject(error);
        });
    });
}

const _uploadProfileImage = (userId: string, loadedPhoto: string) => {
    return new Promise((resolve, reject) => {
        const curImageRef = prImagesRef.child(userId + ".jpg");
        curImageRef
            .putString(loadedPhoto, "data_url")
            .then(() => {
                curImageRef
                    .getDownloadURL()
                    .then(url => {
                        resolve(url);

                    })
                    .catch(error => {
                        reject(error);
                    });
            })
            .catch(error => {
                reject(error);
            });
    })
}