import { useDispatch } from 'react-redux';

import { login } from '../../store/main/actions';

export default function AuthButton() {
    const dispatch = useDispatch();

    const handleAuth = () => {
        dispatch(login());
    }

    return (
        <div>
            <button onClick={handleAuth}>Авторизоваться ВКонтакте</button>
        </div>
    )
}
