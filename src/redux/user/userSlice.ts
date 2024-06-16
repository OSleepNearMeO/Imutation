import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface Address {
  id: number;
  location: string;
  latitute: string;
  longtitute: string;
}

export interface User {
  username: string;
  email: string;
  profileImg: string;
  address?: Address[];
}

const initialState: User = {
  username: "Wasan",
  email: "Wasan@gmail.com",
  profileImg: "google.com",
  address: [],
};

type UpdateUserPayload = {
  username?: string;
  email?: string;
  profileImg?: string;
};

let runNumber = 0;
// Action creators are generated for each case reducer function
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser(state, action: PayloadAction<UpdateUserPayload>) {
      return { ...state, ...action.payload };
    },
    AddLocation(state, action: PayloadAction<Address>) {
      action.payload.id = runNumber;
      runNumber++;
      state.address?.push(action.payload);
    },

    UpdateLocation(state, action: PayloadAction<Address>) {
      const a = state.address?.map((x) => {
        if (x.id == action.payload.id) {
          return action.payload;
        } else {
          return x;
        }
      });
      return {
        ...state,
        address: a,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateUser, AddLocation, UpdateLocation } = userSlice.actions;

export default userSlice.reducer;
