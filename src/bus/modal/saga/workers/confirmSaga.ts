import { put, race, take } from 'redux-saga/effects';
import { MODAL_TYPES } from '../../../../components/Modals/Modals';
import { modalActions } from '../../actions';
import { types } from '../../types';

export function* confirmSaga(message: string) {
    yield put(modalActions.showModal(
        {
            modalType: MODAL_TYPES.CONFIRM_INVITE,
            modalProps: {
                message
            }
        }
    ));

    const { yes } = yield race({
        yes: take(types.CONFIRM_YES),
        no: take(types.CONFIRM_NO)
    })

    // Tell a reducer to hide the dialog
    yield put(modalActions.hideModal());
    // Returns true if the 'yes' action was received
    return !!yes;
}
