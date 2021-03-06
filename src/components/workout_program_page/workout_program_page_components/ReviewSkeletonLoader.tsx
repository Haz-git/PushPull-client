import * as React from 'react';

//Components:
import { deviceMin } from '../../../devices/breakpoints';
import { BrowserView, MobileOnlyView } from 'react-device-detect';

//Styles:
import styled from 'styled-components';
import {
    load,
    SkeletonLoaderLine,
    IStyledProps,
} from '../../general_components/WorkoutProgramSkeletonLoader';

const LeftColumnContainer = styled.div`
    width: 25rem;
    border-right: 1px solid #e5e5e5;
    text-align: left;
    height: 100%;
`;

const LeftHeaderContainer = styled.div`
    border-bottom: 1px solid #e5e5e5;
`;

const LeftNameContainer = styled.div`
    display: flex;
    align-items: center;
`;

const LeftCategoryContainer = styled.div`
    padding: 2rem 0;
    border-bottom: 1px solid #e5e5e5;
`;

const LeftChartContainer = styled.div`
    padding: 2rem 0;
    border-bottom: 1px solid #e5e5e5;
`;

const SubcategoryContainer = styled.div`
    display: flex;
    align-items: center;
`;

const MobileSubcategoryContainer = styled.div`
    display: block;
    margin: 0.5rem 0;
`;

const MobileRatingGrouper = styled.div`
    display: flex;
    align-items: center;
    padding-left: 1.5rem;
`;

const RightColumnContainer = styled.div`
    padding: 2rem 2rem;
`;

const RightHeaderContainer = styled.div`
    margin-bottom: 3rem;
`;

const RightDrawerContainer = styled.div`
    margin-top: 1rem;
    border-top: 1px solid #e5e5e5;
    border-bottom: 1px solid #e5e5e5;
    padding-top: 1rem;
    padding-bottom: 1rem;
    margin-bottom: 2rem;
`;

export const RightResultsContainer = styled.div`
    padding: 0rem 1.5rem;
`;

//Interfaces:

const ReviewSkeletonLoader = () => {
    return (
        <>
            <LeftColumnContainer>
                <LeftHeaderContainer>
                    <SkeletonLoaderLine
                        width="13rem"
                        height="2rem"
                        margin="1rem 1rem 0rem 1.5rem"
                    />
                    <SkeletonLoaderLine
                        width="15rem"
                        height="2.5rem"
                        margin="2rem 1rem 0rem 1.5rem"
                    />
                    <LeftNameContainer>
                        <SkeletonLoaderLine
                            width="2rem"
                            height="2rem"
                            margin="1rem 1.5rem 0rem 1.5rem"
                        />
                        <SkeletonLoaderLine
                            width="2rem"
                            height="2rem"
                            margin="1rem .4rem 0rem 0rem"
                        />
                        <SkeletonLoaderLine
                            width="2rem"
                            height="2rem"
                            margin="1rem .4rem 0rem 0rem"
                        />
                        <SkeletonLoaderLine
                            width="2rem"
                            height="2rem"
                            margin="1rem .4rem 0rem 0rem"
                        />
                        <SkeletonLoaderLine
                            width="2rem"
                            height="2rem"
                            margin="1rem .4rem 0rem 0rem"
                        />
                        <SkeletonLoaderLine
                            width="2rem"
                            height="2rem"
                            margin="1rem .4rem 0rem 0rem"
                        />
                    </LeftNameContainer>
                    <SkeletonLoaderLine
                        width="17rem"
                        height="2.5rem"
                        margin="1rem 1rem 2rem 1.5rem"
                    />
                </LeftHeaderContainer>
                <LeftCategoryContainer>
                    <SkeletonLoaderLine
                        width="15rem"
                        height="2.5rem"
                        margin="0rem 1rem 0rem 1.5rem"
                    />
                    <BrowserView>
                        <SubcategoryContainer>
                            <SkeletonLoaderLine
                                width="7rem"
                                height="2rem"
                                margin="1rem 1rem 0rem 1.5rem"
                            />
                            <SkeletonLoaderLine
                                width="2rem"
                                height="2rem"
                                margin="1rem .4rem 0rem 0rem"
                            />
                            <SkeletonLoaderLine
                                width="2rem"
                                height="2rem"
                                margin="1rem .4rem 0rem 0rem"
                            />
                            <SkeletonLoaderLine
                                width="2rem"
                                height="2rem"
                                margin="1rem .4rem 0rem 0rem"
                            />
                            <SkeletonLoaderLine
                                width="2rem"
                                height="2rem"
                                margin="1rem .4rem 0rem 0rem"
                            />
                            <SkeletonLoaderLine
                                width="2rem"
                                height="2rem"
                                margin="1rem .4rem 0rem 0rem"
                            />
                        </SubcategoryContainer>
                        <SubcategoryContainer>
                            <SkeletonLoaderLine
                                width="9rem"
                                height="2rem"
                                margin="1rem 1rem 0rem 1.5rem"
                            />
                            <SkeletonLoaderLine
                                width="2rem"
                                height="2rem"
                                margin="1rem .4rem 0rem 0rem"
                            />
                            <SkeletonLoaderLine
                                width="2rem"
                                height="2rem"
                                margin="1rem .4rem 0rem 0rem"
                            />
                            <SkeletonLoaderLine
                                width="2rem"
                                height="2rem"
                                margin="1rem .4rem 0rem 0rem"
                            />
                            <SkeletonLoaderLine
                                width="2rem"
                                height="2rem"
                                margin="1rem .4rem 0rem 0rem"
                            />
                            <SkeletonLoaderLine
                                width="2rem"
                                height="2rem"
                                margin="1rem .4rem 0rem 0rem"
                            />
                        </SubcategoryContainer>
                        <SubcategoryContainer>
                            <SkeletonLoaderLine
                                width="8rem"
                                height="2rem"
                                margin="1rem 1rem 0rem 1.5rem"
                            />
                            <SkeletonLoaderLine
                                width="2rem"
                                height="2rem"
                                margin="1rem .4rem 0rem 0rem"
                            />
                            <SkeletonLoaderLine
                                width="2rem"
                                height="2rem"
                                margin="1rem .4rem 0rem 0rem"
                            />
                            <SkeletonLoaderLine
                                width="2rem"
                                height="2rem"
                                margin="1rem .4rem 0rem 0rem"
                            />
                            <SkeletonLoaderLine
                                width="2rem"
                                height="2rem"
                                margin="1rem .4rem 0rem 0rem"
                            />
                            <SkeletonLoaderLine
                                width="2rem"
                                height="2rem"
                                margin="1rem .4rem 0rem 0rem"
                            />
                        </SubcategoryContainer>
                    </BrowserView>
                    <MobileOnlyView>
                        <MobileSubcategoryContainer>
                            <SkeletonLoaderLine
                                width="8rem"
                                height="2rem"
                                margin="1rem 1rem 0rem 1.5rem"
                            />
                            <MobileRatingGrouper>
                                <SkeletonLoaderLine
                                    width="2rem"
                                    height="2rem"
                                    margin="1rem .4rem 0rem 0rem"
                                />
                                <SkeletonLoaderLine
                                    width="2rem"
                                    height="2rem"
                                    margin="1rem .4rem 0rem 0rem"
                                />
                                <SkeletonLoaderLine
                                    width="2rem"
                                    height="2rem"
                                    margin="1rem .4rem 0rem 0rem"
                                />
                                <SkeletonLoaderLine
                                    width="2rem"
                                    height="2rem"
                                    margin="1rem .4rem 0rem 0rem"
                                />
                                <SkeletonLoaderLine
                                    width="2rem"
                                    height="2rem"
                                    margin="1rem .4rem 0rem 0rem"
                                />
                            </MobileRatingGrouper>
                        </MobileSubcategoryContainer>
                        <MobileSubcategoryContainer>
                            <SkeletonLoaderLine
                                width="8rem"
                                height="2rem"
                                margin="1rem 1rem 0rem 1.5rem"
                            />
                            <MobileRatingGrouper>
                                <SkeletonLoaderLine
                                    width="2rem"
                                    height="2rem"
                                    margin="1rem .4rem 0rem 0rem"
                                />
                                <SkeletonLoaderLine
                                    width="2rem"
                                    height="2rem"
                                    margin="1rem .4rem 0rem 0rem"
                                />
                                <SkeletonLoaderLine
                                    width="2rem"
                                    height="2rem"
                                    margin="1rem .4rem 0rem 0rem"
                                />
                                <SkeletonLoaderLine
                                    width="2rem"
                                    height="2rem"
                                    margin="1rem .4rem 0rem 0rem"
                                />
                                <SkeletonLoaderLine
                                    width="2rem"
                                    height="2rem"
                                    margin="1rem .4rem 0rem 0rem"
                                />
                            </MobileRatingGrouper>
                        </MobileSubcategoryContainer>
                        <MobileSubcategoryContainer>
                            <SkeletonLoaderLine
                                width="8rem"
                                height="2rem"
                                margin="1rem 1rem 0rem 1.5rem"
                            />
                            <MobileRatingGrouper>
                                <SkeletonLoaderLine
                                    width="2rem"
                                    height="2rem"
                                    margin="1rem .4rem 0rem 0rem"
                                />
                                <SkeletonLoaderLine
                                    width="2rem"
                                    height="2rem"
                                    margin="1rem .4rem 0rem 0rem"
                                />
                                <SkeletonLoaderLine
                                    width="2rem"
                                    height="2rem"
                                    margin="1rem .4rem 0rem 0rem"
                                />
                                <SkeletonLoaderLine
                                    width="2rem"
                                    height="2rem"
                                    margin="1rem .4rem 0rem 0rem"
                                />
                                <SkeletonLoaderLine
                                    width="2rem"
                                    height="2rem"
                                    margin="1rem .4rem 0rem 0rem"
                                />
                            </MobileRatingGrouper>
                        </MobileSubcategoryContainer>
                    </MobileOnlyView>
                </LeftCategoryContainer>
                <LeftChartContainer>
                    <SkeletonLoaderLine
                        width="15rem"
                        height="2.5rem"
                        margin="0rem 1rem 0rem 1.5rem"
                    />
                    <BrowserView>
                        <SkeletonLoaderLine
                            width="20rem"
                            height="15rem"
                            margin="1rem 1rem 0rem 1.5rem"
                        />
                    </BrowserView>
                    <MobileOnlyView>
                        <SkeletonLoaderLine
                            width="17rem"
                            height="15rem"
                            margin="1rem 1rem 0rem 1.5rem"
                        />
                    </MobileOnlyView>
                </LeftChartContainer>
            </LeftColumnContainer>
            <RightColumnContainer>
                <BrowserView>
                    <RightHeaderContainer>
                        <SkeletonLoaderLine
                            width="40rem"
                            height="3.5rem"
                            margin="1rem 1rem 0rem 1.5rem"
                        />
                        <RightDrawerContainer>
                            <SkeletonLoaderLine
                                width="20rem"
                                height="2rem"
                                margin="0rem 1rem 0rem 1.5rem"
                            />
                        </RightDrawerContainer>
                        <SkeletonLoaderLine
                            width="15rem"
                            height="2.5rem"
                            margin="1rem 1rem 0rem 1.5rem"
                        />
                    </RightHeaderContainer>
                </BrowserView>
                <MobileOnlyView>
                    <RightHeaderContainer>
                        <SkeletonLoaderLine
                            width="17rem"
                            height="3rem"
                            margin="1rem 1rem 0rem -.5rem"
                        />
                        <RightDrawerContainer>
                            <SkeletonLoaderLine
                                width="17rem"
                                height="2rem"
                                margin="0rem 1rem 0rem -.5rem"
                            />
                        </RightDrawerContainer>
                        <SkeletonLoaderLine
                            width="15rem"
                            height="2.5rem"
                            margin="1rem 1rem 0rem -.5rem"
                        />
                    </RightHeaderContainer>
                </MobileOnlyView>
                <RightResultsContainer>
                    <SkeletonLoaderLine
                        width="100%"
                        height="15rem"
                        margin="0rem 0rem 2rem 0rem"
                    />
                    <SkeletonLoaderLine
                        width="100%"
                        height="15rem"
                        margin="0rem 0rem 2rem 0rem"
                    />
                </RightResultsContainer>
            </RightColumnContainer>
        </>
    );
};

export default ReviewSkeletonLoader;
