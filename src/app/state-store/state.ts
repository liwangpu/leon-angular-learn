
export const stateStoreKey: string = 'mirrorApp';

export interface IStoreState {
    mirror?: { [key: string]: any };
    preview?: boolean;
}
