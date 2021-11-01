/*
    Helper util function, checks if key exists in current data hash table.
*/
const isReviewIdInDataTable = (reviewId: string, currData: any) => {
    return reviewId in currData;
};

/*
    Utilizes util function to determine if review is within the current data. Uses that knowledge to make a shallow copy
    of currentData object (inside user's userfront) with the necessary manipulations. Sends the completed obj back for updating.
*/
const updateReviewVotes = (
    reviewType: 'ADD' | 'UPDATE' | 'DELETE',
    reviewVote: 'USEFUL' | 'NOTUSEFUL',
    reviewId: string,
    currData: any
) => {
    switch (reviewType) {
        case 'ADD':
            if (!isReviewIdInDataTable(reviewId, currData)) {
                //Key should not be inside data table for add function to take effect.
                let newObj = { ...currData, [reviewId]: reviewVote };
                return newObj;
            }
            break;
        case 'UPDATE':
            if (isReviewIdInDataTable(reviewId, currData)) {
                let updatedObj = { ...currData };
                updatedObj[reviewId] = reviewVote;
                return updatedObj;
            }
            break;

        case 'DELETE':
            if (isReviewIdInDataTable(reviewId, currData)) {
                let updatedObj = { ...currData };
                delete updatedObj[reviewId];
                return updatedObj;
            }
            break;

        default:
            throw new Error('Your review type was not specified. Aborting.');
    }
};

export default updateReviewVotes;
