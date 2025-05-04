import useGlobalContext from "./use-context";
import { blogData } from "@/data/blog-data";
export const useBlogSearch = () => {
  const { filterSearch } = useGlobalContext();
  if (!filterSearch || filterSearch.trim() === "") {
    return [];
  }

  const filterBySearch = blogData.filter(
    (item) =>
      item.detail.toLowerCase().includes(filterSearch.toLowerCase()) ||
      item.author.toLowerCase().includes(filterSearch.toLowerCase())
  );
  return filterBySearch;

  // filter data based on search Type
};
