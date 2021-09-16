const renderDrawerSize = (width: number) => {
    if (width !== undefined && width !== null) {
        if (width === 1440 || width >= 1440) return '40%';
        if (width === 1050 || width >= 1050) return '50%';
        if (width === 800 || width >= 800) return '60%';
        if (width === 700 || width >= 700) return '70%';
        if (width === 600 || width >= 600) return '90%';
        if (width === 500 || width >= 500) return '100%';

        return '40%';
    }
};

export default renderDrawerSize;
