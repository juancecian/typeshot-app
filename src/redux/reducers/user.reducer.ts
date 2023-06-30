import { createSlice } from '@reduxjs/toolkit';
import { UserModel } from '../../models/user.model';

const userSlice = createSlice({
  name: 'user',
  initialState: new UserModel(),
  reducers: {
    updateUser: (state, action) => (state = action.payload)
  }
});

export const { updateUser } = userSlice.actions;
export default userSlice.reducer;
