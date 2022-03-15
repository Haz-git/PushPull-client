//Appended ERROR here to avoid conflict with other reducer types, e.g QUERY_TEMPLATE

export enum ErrorType {
    queryTemplateError = 'queryTemplateError',
    queryViewTemplateError = 'queryViewTemplateError',
    saveViewTemplateError = 'saveViewTemplateError',
    viewPreviewError = 'viewPreviewError',
}
