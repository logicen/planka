import { createSelector } from 'redux-orm';

import orm from '../orm';
import { selectPath } from './router';
import { selectCurrentUserId } from './users';
import { isLocalId } from '../utils/local-id';

export const selectCurrentProject = createSelector(
  orm,
  (state) => selectPath(state).projectId,
  ({ Project }, id) => {
    if (!id) {
      return id;
    }

    const projectModel = Project.withId(id);

    if (!projectModel) {
      return projectModel;
    }

    return projectModel.ref;
  },
);

export const selectManagersForCurrentProject = createSelector(
  orm,
  (state) => selectPath(state).projectId,
  (state) => selectCurrentUserId(state),
  ({ Project }, id, currentUserId) => {
    if (!id) {
      return id;
    }

    const projectModel = Project.withId(id);

    if (!projectModel) {
      return projectModel;
    }

    return projectModel
      .getOrderedManagersQuerySet()
      .toModelArray()
      .map((projectManagerModel) => ({
        ...projectManagerModel.ref,
        isPersisted: !isLocalId(projectManagerModel.id),
        user: {
          ...projectManagerModel.user.ref,
          isCurrent: projectManagerModel.user.id === currentUserId,
        },
      }));
  },
);

export const selectBoardsForCurrentProject = createSelector(
  orm,
  (state) => selectPath(state).projectId,
  (state) => selectCurrentUserId(state),
  ({ Project }, id, currentUserId) => {
    if (!id) {
      return id;
    }

    const projectModel = Project.withId(id);

    if (!projectModel) {
      return projectModel;
    }

    return projectModel
      .getOrderedBoardsModelArrayAvailableForUser(currentUserId)
      .map((boardModel) => ({
        ...boardModel.ref,
        isPersisted: !isLocalId(boardModel.id),
      }));
  },
);

export const selectIsCurrentUserManagerForCurrentProject = createSelector(
  orm,
  (state) => selectPath(state).projectId,
  (state) => selectCurrentUserId(state),
  ({ Project }, id, currentUserId) => {
    if (!id) {
      return false;
    }

    const projectModel = Project.withId(id);

    if (!projectModel) {
      return false;
    }

    return projectModel.hasManagerForUser(currentUserId);
  },
);

/**
 * Selects project revenue for current project
 * a project has many boards and boards have many cards
 * so, get project by id then get the boards associated to the project
 * and finally get the cards associated to the boards
 */
export const selectProjectRevenue = createSelector(
  orm,
  (state) => selectPath(state).projectId,
  ({ Project }, id) => {
    if (!id) {
      return id;
    }

    const projectModel = Project.withId(id);

    if (!projectModel) {
      return projectModel;
    }

    let revenue = 0;

    projectModel.boards.toModelArray().forEach((boardModel) => {
      revenue += boardModel.cards.toModelArray().reduce((acc, cardModel) => {
        if (!cardModel.revenue) {
          return acc;
        }
        return parseInt(cardModel.revenue, 10) + parseInt(acc, 10);
      }, 0);
    });

    return revenue;
  },
);

export default {
  selectProjectRevenue,
  selectCurrentProject,
  selectManagersForCurrentProject,
  selectBoardsForCurrentProject,
  selectIsCurrentUserManagerForCurrentProject,
};
