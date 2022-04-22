import * as React from 'react';
import { useMemo } from 'react';

//Redux:

//Components:
import { Text, View, StyleSheet } from '@react-pdf/renderer';
import { BlockFrame } from './BlockFrame';
import { ConfiguredSetFrame } from './ConfiguredSetFrame';

//Styles:
const styles = StyleSheet.create({
    blockMainContainer: {
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 10,
        paddingLeft: 10,
        paddingRight: 10,
    },
    exerciseNameContainer: {
        width: '100%',
        maxWidth: 165,
        marginRight: 10,
        textAlign: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    exerciseDescriptionItem: {
        width: '100%',
        maxWidth: 330,
        textAlign: 'center',
    },
    orderItem: {
        width: 20,
        marginRight: 10,
        textAlign: 'center',
    },
    text: {
        fontSize: 10,
    },
    divider: {
        height: 2,
        borderRadius: 10,
        backgroundColor: '#e5e5e5',
    },
});

//Interfaces:
interface IComponentProps {
    blockDetails: any;
    index: number;
    viewTemplate: any;
}

/**
 * @description This frame represents each exercise row.
 *
 */

export const RowFrame = ({
    blockDetails,
    index,
    viewTemplate,
}: IComponentProps): JSX.Element => {
    // console.log(blockDetails);

    const exerciseColorObject = useMemo(
        () =>
            viewTemplate.templateLegend.find((colorObject: any) => {
                return colorObject.id === blockDetails.linkedColor;
            }),
        [viewTemplate, blockDetails]
    );

    const composeColorSplotch = (): JSX.Element | null => {
        if (!exerciseColorObject) {
            return null;
        }

        return (
            <View
                style={{
                    backgroundColor: `${exerciseColorObject.colorHex}`,
                    height: 12,
                    width: 12,
                    borderRadius: 2,
                    marginRight: 5,
                }}
            />
        );
    };

    return (
        <>
            <View style={styles.blockMainContainer}>
                <View style={styles.orderItem}>
                    <Text style={styles.text}>{index}</Text>
                </View>
                <View style={styles.exerciseNameContainer}>
                    <View>{composeColorSplotch()}</View>
                    <Text style={styles.text}>{blockDetails.name}</Text>
                </View>
                <View style={styles.exerciseDescriptionItem}>
                    <ConfiguredSetFrame
                        sets={blockDetails.sets}
                        reps={blockDetails.reps}
                        restTime={blockDetails.restTime}
                        hasConfiguredSets={blockDetails.hasConfiguredSets}
                        configuredSets={blockDetails.configuredSets}
                        weightImperial={blockDetails.weightImperial}
                        weightMetric={blockDetails.weightMetric}
                    />
                </View>
            </View>
            <View style={styles.divider} />
        </>
    );
};
