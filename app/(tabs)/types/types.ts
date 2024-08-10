// types.ts

export type RootStackParamList = {
  Main: { 
    isEventTypeSaved?: boolean; 
    isBudgetSaved?: boolean; 
    activeFilter?: string; // Add this line to include the activeFilter parameter
  };
  EventType: undefined;
  Budget: undefined;
  Filter: { 
    activeFilter: string; // Include this if the Filter screen also needs to accept activeFilter
  };
  // Add other screens if necessary
};
