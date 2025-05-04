import products_data from "@/data/product-data";
import useGlobalContext from "./use-context";
export const useProductSearch = () => {
  const { filterSearch } = useGlobalContext();
  if (!filterSearch || filterSearch.trim() === "") {
    return [];
  }

  const filterBySearch = products_data.filter((item) =>
    item.title.toLowerCase().includes(filterSearch.toLowerCase())
  );
  return filterBySearch;

  // filter data based on search Type
};
