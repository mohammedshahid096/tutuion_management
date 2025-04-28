import LoginActions from './login/action';
import UserActions from './userProfile/action';
import BatchActions from './batch/action';

export const loginActions = { ...LoginActions };
export const userActions = { ...UserActions };
export const batchActions = { ...BatchActions };

// after adding reset the action in to the logout hook
