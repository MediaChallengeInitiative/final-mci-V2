const getFormattedDate = (publishedAt: string | Date): string => {
  const date = new Date(publishedAt);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
};

export default getFormattedDate;
