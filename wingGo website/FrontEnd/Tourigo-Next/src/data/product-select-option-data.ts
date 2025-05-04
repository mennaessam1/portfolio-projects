interface TProductSelect {
  id: number;
  option: number | string;
}
export const productSelectOptionData: TProductSelect[] = [
  {
    id: 2,
    option: "Newest",
  },
  {
    id: 3,
    option: "Price (Low > High)",
  },
  {
    id: 4,
    option: "Price (High > Low)",
  },
  {
    id: 5,
    option: "Rating (High > Low)", // New sort option
  },
];

export const showProductNumber: TProductSelect[] = [
  {
    id: 1,
    option: 6,
  },
  {
    id: 2,
    option: 12,
  },
  {
    id: 3,
    option: 14,
  },
  {
    id: 4,
    option: 16,
  },
  {
    id: 5,
    option: "All",
  },
];
