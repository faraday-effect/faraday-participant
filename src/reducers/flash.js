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

export const showFlash = (severity: FlashSeverity, message: string) => {
    return {
        type: FLASH_SET_MESSAGE,
        payload: {
            severity,
            message
        }
    };
};

export const clearFlash = () => {
    return { type: FLASH_CLEAR_MESSAGE };
};

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
