const truncateString = (type: string, string: string) => {
    switch (type) {
        case 'WORKOUT_PROGRAM_TITLE':
            if (string.length > 25) return string.substr(0, 25).concat('...');
            else return string;
        case 'WORKOUT_PROGRAM_DESC':
            if (string.length > 250) return string.substr(0, 250).concat('...');
            else return string;
        default:
            throw new Error('Type of truncate was not specified or wrong.');
    }
};

export default truncateString;
