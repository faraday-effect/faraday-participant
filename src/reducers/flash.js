// @flow

import type {Action} from "../types/redux";

export const FLASH_SET_MESSAGE = 'FLASH/SET';
export const FLASH_CLEAR_MESSAGE = 'FLASH/CLEAR';

export type FlashSeverity = "" | "info" | "warning" | "error";

export type State = {
    visible: boolean,
    severity: FlashSeverity,
    message: string
};

const initialState = {
    visible: false,
    severity: '',
    message: ''
};

const _flashShow = (severity: FlashSeverity, message: string) => {
    return {
        type: FLASH_SET_MESSAGE,
        payload: {
            severity,
            message
        }
    };
};

export const flashClear = () => {
    return { type: FLASH_CLEAR_MESSAGE };
};

export const flashInfo = (message: string) => _flashShow('info', message);
export const flashWarning = (message: string) => _flashShow('warning', message);
export const flashError = (message: string) => _flashShow('error', message);

const flashReducer = (state: State = initialState, action: Action): State => {
    switch (action.type) {
        case FLASH_SET_MESSAGE:
            return {
                visible: true,
                severity: action.payload.severity,
                message: action.payload.message
            };
        case FLASH_CLEAR_MESSAGE:
            return {
                visible: false,
                severity: '',
                message: ''
            };
        default:
            return state;
    }
};

export default flashReducer;
