import { slugify } from "../helpers";

const documentationCategoriesWithEndpoints = ({ endpoints }) => {  
  const categories = {};
  
  endpoints.forEach(endpoint => {
    const category = slugify(`${endpoint.category} API`);
    
    if(!categories[category]) {
      categories[category] = [endpoint];
    } else {
      categories[category].push(endpoint);
    }
  });
  
  return categories;
};

export {
  documentationCategoriesWithEndpoints
};