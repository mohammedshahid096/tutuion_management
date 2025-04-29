import LoginActions from './login/action';
import UserActions from './userProfile/action';
import BatchActions from './batch/action';
import BoardActions from './boards/action';

export const loginActions = { ...LoginActions };
export const userActions = { ...UserActions };
export const batchActions = { ...BatchActions };
export const boardActions = { ...BoardActions };

// after adding reset the action in to the logout hook
