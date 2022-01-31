//This error reducer should handle any action with an error field.

const initialState: null = null;

export const errorReducer = (state: null = initialState, action: any) => {
    const { type, error } = action;

    if (type === 'RESET_ERROR_MESSAGE') {
        return null;
    }

    if (error) {
        return error;
    }

    return state;
};
