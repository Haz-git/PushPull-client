//Appended ERROR here to avoid conflict with other reducer types, e.g QUERY_TEMPLATE

export enum ErrorType {
    queryTemplateError = 'QUERY_TEMPLATE_ERROR',
    queryViewTemplateError = 'QUERY_VIEW_TEMPLATE_ERROR',
    saveViewTemplateError = 'SAVE_VIEW_TEMPLATE_ERROR',
    viewPreviewError = 'VIEW_PREVIEW_ERROR',
}
