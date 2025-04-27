import LoginActions from './login/action';
import UserActions from './userProfile/action';

export const loginActions = { ...LoginActions };
export const userActions = { ...UserActions };

// after adding reset the action in to the logout hook
