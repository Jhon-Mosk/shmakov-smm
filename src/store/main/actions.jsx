export const USER = "USER";
export const GROUPS_ALL = "GROUPS_ALL";
export const GROUPS_FILTERED = "GROUPS_FILTERED";
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const FAIL = 'FAIL';
export const IS_FETCHING = 'IS_FETCHING';

export const login = () => async (dispatch) => {
    dispatch({
        type: IS_FETCHING,
    });

    //eslint-disable-next-line no-undef
    await VK.Auth.login((response) => {
        if (response.session) {
            let userId = response.session.user.id;
            console.log(response);

            dispatch({
                type: LOGIN_SUCCESS,
                payload: userId,
            });

            dispatch(createAllGroups(userId));
        } else {
            dispatch({
                type: FAIL,
                payload: 'Ошибка авторизации, попробуйте ещё раз',
            });
        }
    }, 262144, 1048576);
}

export const createAllGroups = (userId) => async (dispatch) => {
    dispatch({
        type: IS_FETCHING,
    });
    //eslint-disable-next-line no-undef
    await VK.Api.call(
        'groups.get',
        {
            user_id: userId,
            extended: 1,
            fields: 'cover, members_count, addresses, place',
            v: 5.131,
        }, (r) => {
            if (r.response) {
                dispatch({
                    type: GROUPS_ALL,
                    payload: r.response.items,
                });
            } else {
                dispatch({
                    type: FAIL,
                    payload: r.error.error_msg,
                });
            }
        });
};

export const createGroupsFiltered = (filter, groups) => (dispatch) => {
    let filteredGroups = [];

    switch (filter) {
        case 'admin':
            filteredGroups = groups.filter(item => (item.is_admin === 1 && item.admin_level === 3));
            break;

        case 'editor':
            filteredGroups = groups.filter(item => (item.is_admin === 1 && item.admin_level >= 2));
            break;

        case 'moder':
            filteredGroups = groups.filter(item => (item.is_admin === 1 && item.admin_level >= 1));
            break;

        case 'advertiser':
            filteredGroups = groups.filter(item => (item.is_advertiser === 1));
            break;

        case 'groups':
            filteredGroups = groups.filter(item => (item.type === 'group'));
            break;

        case 'publics':
            filteredGroups = groups.filter(item => (item.type === 'page'));
            break;

        case 'events':
            filteredGroups = groups.filter(item => (item.type === 'event'));
            break;

        case 'hasAddress':
            filteredGroups = groups.filter(item => (item.addresses.is_enabled));
            break;

        default:
            filteredGroups = groups;
            break;
    }

    dispatch({
        type: GROUPS_FILTERED,
        payload: filteredGroups,
    })
}
