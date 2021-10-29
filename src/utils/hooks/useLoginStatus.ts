import { useSelector, RootStateOrAny } from 'react-redux';

const useLoginStatus = () => {
    const User = useSelector((state: RootStateOrAny) => state.user.user);

    if (
        User &&
        Object.keys(User).length !== 0 &&
        Object.getPrototypeOf(User) === Object.prototype
    )
        return true;

    return false;
};

export default useLoginStatus;
