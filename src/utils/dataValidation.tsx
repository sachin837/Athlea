// Define a recursive type for nested data validation
type ValidatableData = {
  [key: string]: number | any[] | ValidatableData | null | undefined;
};

// Helper type to ensure the object conforms to ValidatableData
type NestedValidatableData = {
  [key in keyof ValidatableData]: ValidatableData;
};

export const isDataValid = (data: ValidatableData): boolean => {
  let hasValidData = false;

  for (const key in data) {
    const value = data[key];
    if (value !== null && value !== undefined) {
      if (typeof value === 'number' && value !== 0) {
        hasValidData = true;
        break;
      }
      if (Array.isArray(value) && value.length > 0) {
        hasValidData = true;
        break;
      }
      // Check if the value is an object and exclude arrays and null values
      if (
        typeof value === 'object' &&
        !Array.isArray(value) &&
        value !== null &&
        isDataValid(value as NestedValidatableData)
      ) {
        hasValidData = true;
        break;
      }
    }
  }

  return hasValidData;
};
