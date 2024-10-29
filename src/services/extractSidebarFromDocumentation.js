import { slugify } from "../helpers"

const extractCategoryNamesFromDocumentation = documentation => {
  return documentation.endpoints.map(({ category }) => category).filter((category, pos, arr) => {
    return arr.indexOf(category) === pos;
  }).sort().map(categoryName => `${categoryName} API`);
};

const sidebarFromDocumentation = documentation => {
  const categories = extractCategoryNamesFromDocumentation(documentation).map(categoryName => ({
    categoryName,
    categoryUrl: `#${slugify(categoryName)}`
  }));
  
  return {
    categories
  };
};

export {
  sidebarFromDocumentation
};