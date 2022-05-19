import { FAIL, GROUPS_ALL, GROUPS_FILTERED, LOGIN_SUCCESS, IS_FETCHING } from "./actions";

const initialState = {
    userId: null,
    error: '',
    isFetching: false,
    groupsAll: [],
    groupsFiltered: [],
};

export const mainReducer = (state = initialState, action) => {
    switch (action.type) {
        case FAIL: {
            return {
                ...state,
                isFetching: false,
                error: action.payload,
            }
        }

        case IS_FETCHING: {
            return {
                ...state,
                isFetching: true,
                error: '',
            }
        }

        case GROUPS_ALL: {
            return {
                ...state,
                isFetching: false,
                groupsAll: action.payload,
                groupsFiltered: action.payload,
            }
        }

        case GROUPS_FILTERED: {
            return {
                ...state,
                groupsFiltered: action.payload,
            }
        }

        case LOGIN_SUCCESS:
            return {
                ...state,
                isFetching: false,
                userId: action.payload,
            };

        default: return state;
    }
}
