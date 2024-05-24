import { configureStore} from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import databaseReducer from '../features/database/databaseSlice'
import settingsReducer from '../features/settings/settingsSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    database: databaseReducer,
    settings: settingsReducer
  }
})

export default store;