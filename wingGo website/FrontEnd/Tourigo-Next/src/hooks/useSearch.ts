import { tourData } from "@/data/tour-data";
import useGlobalContext from "./use-context";
export const useSearch = (searchType: string) => {
  const { filterSearch } = useGlobalContext();
  if (!filterSearch || filterSearch.trim() === "") {
    return [];
  }

  if (searchType === "tour") {
    const filterBySearch = tourData.filter(
      (item) =>
        item.tourTitle.toLowerCase().includes(filterSearch.toLowerCase()) ||
        item.tourLocation.toLowerCase().includes(filterSearch.toLowerCase())
    );
    return filterBySearch;
  }

  // filter data based on search Type
};
