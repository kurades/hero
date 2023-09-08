import { createReducer, on } from '@ngrx/store'
import * as UserAction from './user.actions'
import { UserState } from './user.selector'
import { User } from 'src/app/core/models/user'





export const initialState: UserState = {
    user: null,
    token: '',
    status: 'pending',
    error: ''
}

export const UserReducer = createReducer(
    initialState,
    on(UserAction.loginSuccess, (state, { user, token }) => {

        return ({
            ...state,
            user,
            token,
            status: 'success' as 'success'
        })
    }),
    on(UserAction.loginFailure, (state, { error }) => ({
        ...state,
        status: 'Error' as 'Error',
        error
    })),
    on(UserAction.registerSuccess, (state, { user, token }) => ({
        ...state,
        user,
        token,
        status: 'success' as 'success',
    })),
    on(UserAction.registerFailure, (state, { error }) => ({
        ...state,
        status: 'Error' as 'Error',
        error
    })),
    on(UserAction.profileSuccess, (state, { user }) => ({
        ...state,
        user,
        status: 'success' as 'success',
    })),
    on(UserAction.profileFailure, (state, { error }) => ({
        ...state,
        status: 'Error' as 'Error',
        error
    }))
)