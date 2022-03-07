//I'm not sure if using a type is better than an interface here

type ConfiguredSet = {
    reps: string;
    fieldId: string;
    fieldKey: string;
    weightMetric: string;
    weightImperial: string;
};

type SheetContent = {
    [key: string]: {
        //Left off here. Todo.
    }[];
};

export type ViewTemplate = {
    id: string;
    savedTemplate: {
        id: string;
        templateFileTitle: string;
        templateFileDesc: string;
        templateCreatedBy: {
            username: string;
            userfrontUserId: string;
        };
        templateSchedule: null | string;
        templateWeightUnit: string;
        templateLegend: {
            id: string;
            label: string;
            colorHex: string;
            description: string;
        }[];
        templateSnapshot: null | string;
        templateUserInputs: {
            id: string;
            ResponseType: string;
            InputQuestion: string;
        }[];
        templateToolbarBlocks: {
            id: string;
            prefix: string;
            blockDetails: {
                desc: string;
                name: string;
                reps: string;
                sets: string;
                linkedColor: string;
                weightMetric: string;
                configuredSets: {
                    [key: number]: ConfiguredSet;
                };
                weightImperial: string;
                hasConfiguredSets: boolean;
                linkedViewerInput: string;
            };
        }[];
        templateEditingSurfaceBlocks: {
            sheetId: string;
            sheetName: string;
            sheetOrder: string[];
            sheetContent: SheetContent;
        }[];
    };
};
