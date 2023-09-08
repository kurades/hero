import { createAction, props } from "@ngrx/store";
import { Login } from "src/app/core/models/login.user";
import { User } from "src/app/core/models/user";


export const login = createAction(
    '[Login page] Login',
    props<{ name: string, password: string }>()
)
export const loginSuccess = createAction(
    '[Login page] Login success',
    props<{ user: User, token: string }>()
)
export const loginFailure = createAction(
    '[Login page] Login failure',
    props<{ error: string }>()
)

export const register = createAction(
    '[register page] register',
    props<{ name: string, password: string, rePassword: string }>()
)
export const registerSuccess = createAction(
    '[register page] register success',
    props<{ user: User, token: string }>()
)
export const registerFailure = createAction(
    '[register page] register failure',
    props<{ error: string }>()
)

export const updateProfile = createAction(
    '[profile page] profile',
    props<{ user: User }>()
)

export const profileSuccess = createAction(
    '[profile page] updateprofile success',
    props<{ user: User }>()
)
export const profileFailure = createAction(
    '[profile page] update profile failure',
    props<{ error: string }>()
)
