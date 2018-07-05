export enum ActionTypes {
    updateCount,
}

export interface IUpdateCountAction {
    type: ActionTypes.updateCount;
    count: number;
}

export function updateCount(count: number): IUpdateCountAction {
    return {
        count,
        type: ActionTypes.updateCount,
    };
}

export type Actions = IUpdateCountAction;
