// import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// import { IAppState, LocationOption } from '@/types';

// const initialState: IAppState = {
//   showMobileHeader: false,
//   location: [],
//   filterName: '',
//   licenceFeeUser: 1,
//   isLogoutModel: false,
//   expandedIndex: null,
//   isDrawerOpen: false,
// };

// export const appSlice = createSlice({
//   name: 'app',
//   initialState,
//   reducers: {
//     onFilterName: (state, action) => {
//       state.filterName = action.payload;
//     },

//     toggleMobileHeader: (state, action: PayloadAction<boolean>) => {
//       state.showMobileHeader = action.payload;
//     },

//     addLocationInfo: (state, action: PayloadAction<LocationOption[]>) => {
//       state.location = action.payload;
//     },
//     addUser: (state) => {
//       state.licenceFeeUser = state.licenceFeeUser + 1;
//     },
//     removeUser: (state) => {
//       state.licenceFeeUser = state.licenceFeeUser - 1;
//     },
//     setExpandedIndex: (state, action) => {
//       state.expandedIndex = action.payload;
//     },
//     setIsDrawerOpen: (state, action) => {
//       state.isDrawerOpen = action.payload;
//     },
//     setIsLogoutModel: (state, action) => {
//       state.isLogoutModel = action.payload;
//     },
//     resetLogoutState: (state) => {
//       state.isLogoutModel = false;
//     },
//     resetIsDrawerOpen: (state) => {
//       state.isDrawerOpen = false;
//     },
//   },
// });

// export const {
//   toggleMobileHeader,
//   addLocationInfo,
//   onFilterName,
//   addUser,
//   removeUser,
//   setIsDrawerOpen,
//   setExpandedIndex,
//   setIsLogoutModel,
//   resetLogoutState,
//   resetIsDrawerOpen,
// } = appSlice.actions;
// import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { IAppState, LocationOption } from '@/types';

// const initialState: IAppState & {
//   isEditDayDrawerOpen: boolean;
// } = {
//   showMobileHeader: false,
//   location: [],
//   filterName: '',
//   licenceFeeUser: 1,
//   isLogoutModel: false,
//   expandedIndex: null,
//   isDrawerOpen: false,

//   // ✅ NEW (Edit Day Drawer)
//   isEditDayDrawerOpen: false,
// };

// export const appSlice = createSlice({
//   name: 'app',
//   initialState,
//   reducers: {
//     onFilterName: (state, action: PayloadAction<string>) => {
//       state.filterName = action.payload;
//     },

//     toggleMobileHeader: (state, action: PayloadAction<boolean>) => {
//       state.showMobileHeader = action.payload;
//     },

//     addLocationInfo: (state, action: PayloadAction<LocationOption[]>) => {
//       state.location = action.payload;
//     },

//     addUser: (state) => {
//       state.licenceFeeUser = state.licenceFeeUser + 1;
//     },

//     removeUser: (state) => {
//       state.licenceFeeUser = state.licenceFeeUser - 1;
//     },

//     setExpandedIndex: (state, action: PayloadAction<number | null>) => {
//       state.expandedIndex = action.payload;
//     },

//     setIsDrawerOpen: (state, action: PayloadAction<boolean>) => {
//       state.isDrawerOpen = action.payload;
//     },

//     setIsLogoutModel: (state, action: PayloadAction<boolean>) => {
//       state.isLogoutModel = action.payload;
//     },

//     resetLogoutState: (state) => {
//       state.isLogoutModel = false;
//     },

//     resetIsDrawerOpen: (state) => {
//       state.isDrawerOpen = false;
//     },

//     // ✅ NEW ACTIONS (Edit Day)
//     setEditDayDrawerOpen: (state, action: PayloadAction<boolean>) => {
//       state.isEditDayDrawerOpen = action.payload;
//     },

//     resetEditDayDrawerOpen: (state) => {
//       state.isEditDayDrawerOpen = false;
//     },
//   },
// });

// export const {
//   toggleMobileHeader,
//   addLocationInfo,
//   onFilterName,
//   addUser,
//   removeUser,
//   setIsDrawerOpen,
//   setExpandedIndex,
//   setIsLogoutModel,
//   resetLogoutState,
//   resetIsDrawerOpen,

//   // ✅ EXPORT NEW ACTIONS
//   setEditDayDrawerOpen,
//   resetEditDayDrawerOpen,
// } = appSlice.actions;

// export default appSlice.reducer;
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAppState, LocationOption } from "@/types";

/* ---------------- TYPES ---------------- */
export interface DayConfig {
  date: string; // e.g. 2026-1-15
  startTime: string; // 09:00
  endTime: string; // 17:00
}

/* ---------------- INITIAL STATE ---------------- */
const initialState: IAppState & {
  isEditDayDrawerOpen: boolean;
  selectedDate: string;
  dayConfigs: DayConfig[];
} = {
  showMobileHeader: false,
  location: [],
  filterName: "",
  licenceFeeUser: 1,
  isLogoutModel: false,
  expandedIndex: null,
  isDrawerOpen: false,

  /* ✅ Edit Day */
  isEditDayDrawerOpen: false,
  selectedDate: "",
  dayConfigs: [],
};

/* ---------------- SLICE ---------------- */
export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    onFilterName: (state, action: PayloadAction<string>) => {
      state.filterName = action.payload;
    },

    toggleMobileHeader: (state, action: PayloadAction<boolean>) => {
      state.showMobileHeader = action.payload;
    },

    addLocationInfo: (state, action: PayloadAction<LocationOption[]>) => {
      state.location = action.payload;
    },

    addUser: (state) => {
      state.licenceFeeUser += 1;
    },

    removeUser: (state) => {
      state.licenceFeeUser -= 1;
    },

    setExpandedIndex: (state, action: PayloadAction<number | null>) => {
      state.expandedIndex = action.payload;
    },

    setIsDrawerOpen: (state, action: PayloadAction<boolean>) => {
      state.isDrawerOpen = action.payload;
    },

    setIsLogoutModel: (state, action: PayloadAction<boolean>) => {
      state.isLogoutModel = action.payload;
    },

    resetLogoutState: (state) => {
      state.isLogoutModel = false;
    },

    resetIsDrawerOpen: (state) => {
      state.isDrawerOpen = false;
    },

    /* =================================================
       ✅ EDIT DAY (NEW LOGIC)
    ================================================= */

    setEditDayDrawerOpen: (state, action: PayloadAction<boolean>) => {
      state.isEditDayDrawerOpen = action.payload;
    },

    setSelectedDate: (state, action: PayloadAction<string>) => {
      state.selectedDate = action.payload;
    },

    saveDayConfig: (state, action: PayloadAction<DayConfig>) => {
      const existing = state.dayConfigs.find(
        (d) => d.date === action.payload.date,
      );

      if (existing) {
        existing.startTime = action.payload.startTime;
        existing.endTime = action.payload.endTime;
      } else {
        state.dayConfigs.push(action.payload);
      }
    },

    resetEditDayDrawerOpen: (state) => {
      state.isEditDayDrawerOpen = false;
    },
  },
});

/* ---------------- EXPORT ACTIONS ---------------- */
export const {
  toggleMobileHeader,
  addLocationInfo,
  onFilterName,
  addUser,
  removeUser,
  setIsDrawerOpen,
  setExpandedIndex,
  setIsLogoutModel,
  resetLogoutState,
  resetIsDrawerOpen,

  /* ✅ Edit Day */
  setEditDayDrawerOpen,
  setSelectedDate,
  saveDayConfig,
  resetEditDayDrawerOpen,
} = appSlice.actions;

export default appSlice.reducer;
