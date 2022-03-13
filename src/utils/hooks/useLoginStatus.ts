import React, { useState, useEffect } from 'react';
import { useSelector, RootStateOrAny } from 'react-redux';
import Userfront from '@userfront/react';

const useLoginStatus = (): boolean => {
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
