import { Actions, ActionTypes } from './actions';
import { defaultStoreState, IStoreState } from './store';

export function reducer(
        state: IStoreState = defaultStoreState,
        action: Actions
): IStoreState {
    switch (action.type) {
        case ActionTypes.updateCount:
            return {
                ...state,
                count: action.count,
            };

        default:
            return state;
    }
}
