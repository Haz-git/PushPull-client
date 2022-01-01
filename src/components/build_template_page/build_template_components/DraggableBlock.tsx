import * as React from 'react';

//Components:
import BlockTypeExercise from './BlockTypeExercise';
import BlockTypeDate from './BlockTypeDate';

//Styles:

//Interfaces:

interface IComponentProps {
    type?: 'EXERCISE' | 'DATE';
    blockTitle: string;
    uuid?: string;
    i?: string;
    x?: number;
    y?: number;
    w?: number;
    h?: number;
    minW?: number;
    maxW?: number;
    minH?: number;
    maxH?: number;
    style?: any;
    className?: any;
    children?: React.ReactNode;
}

const DraggableBlock = React.forwardRef(
    (
        {
            type,
            blockTitle,
            uuid,
            i,
            x,
            y,
            w,
            h,
            minW,
            maxW,
            minH,
            maxH,
            style,
            className,
            children,
            ...rest
        }: IComponentProps,
        ref: any
    ): JSX.Element => {
        const identifyAndReturnBlockType = () => {
            if (type && type === 'DATE') {
                return <BlockTypeDate blockTitle={blockTitle} />;
            }

            return <BlockTypeExercise blockTitle={blockTitle} />;
        };

        return (
            <div
                style={{ border: '1px solid red', ...style }}
                className={[className].join(' ')}
                key={uuid}
                ref={ref}
                {...rest}
            >
                {identifyAndReturnBlockType()}
            </div>
        );
    }
);

export default DraggableBlock;
