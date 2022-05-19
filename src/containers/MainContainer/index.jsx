import { useSelector } from 'react-redux';

import { getError, getGroupsAll, getGroupsFiltered, getIsFetching, getUserId } from '../../store/main';

import AuthButton from '../../components/AuthButton';
import Content from '../../components/Content';
import Filter from '../../components/Filter';

import './style.css';
import Modal from '../../components/Modal';

export function MainContainer() {
    const userId = useSelector(getUserId);
    const groupsAll = useSelector(getGroupsAll);
    const groupsFiltered = useSelector(getGroupsFiltered);
    const isFetching = useSelector(getIsFetching);
    const error = useSelector(getError);

    const sortArrayDescending = (array) => {
        return array.sort((a, b) => {
            if (a.members_count < b.members_count) {
                return 1;
            }
            if (a.members_count > b.members_count) {
                return -1;
            }
            // a должно быть равным b
            return 0;
        });
    }

    return (
        <div className='container'>
            {(error !== '') ? <Modal message={error} /> : null}
            {(isFetching) ? 'Загрузка' : <div>
                <div className='header'>
                    {(userId) ? null : <AuthButton />}
                    {(userId) ? <Filter groups={sortArrayDescending(groupsAll)} /> : null}
                </div>
                {(userId) ? <Content groups={groupsFiltered} /> : <div>Пожалуйста авторизуйтесь</div>}
            </div>
            }
        </div >
    )
}
