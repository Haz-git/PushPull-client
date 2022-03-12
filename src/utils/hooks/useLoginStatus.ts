import { useSelector, RootStateOrAny } from 'react-redux';
import Userfront from '@userfront/react';

Userfront.init('demo1234');

const useLoginStatus = (): boolean => {
    return Userfront.tokens.accessToken ? true : false;
};

export default useLoginStatus;
