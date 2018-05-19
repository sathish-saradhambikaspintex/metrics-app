import { prop, compose, dissoc, values } from "ramda";

export const filterItems = compose(dissoc("isLoading"), dissoc("error"), dissoc("message"));
export const getIsLoading = prop("isLoading");
export const getItemsArray = values;
