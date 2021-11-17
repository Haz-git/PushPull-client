import { BuilderActionType } from './action-types';

interface findProject {
    type: BuilderActionType.USER_FIND_PROJECT;
    payload?: any;
}

interface addProject {
    type: BuilderActionType.USER_ADD_PROJECT;
    payload?: any;
}

interface deleteProject {
    type: BuilderActionType.USER_DELETE_PROJECT;
    payload?: any;
}

interface updateProject {
    type: BuilderActionType.USER_UPDATE_PROJECT;
    payload?: any;
}

interface addProjectMember {
    type: BuilderActionType.USER_ADD_PROJECT_MEMBER;
    payload?: any;
}

interface deleteProjectMember {
    type: BuilderActionType.USER_DELETE_PROJECT_MEMBER;
    payload?: any;
}

interface addTemplate {
    type: BuilderActionType.USER_ADD_TEMPLATE;
    payload?: any;
}

interface deleteTemplate {
    type: BuilderActionType.USER_DELETE_TEMPLATE;
    payload?: any;
}

interface updateTemplate {
    type: BuilderActionType.USER_UPDATE_TEMPLATE;
    payload?: any;
}
