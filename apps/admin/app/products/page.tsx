import { getCategories, getProductsByCategoryHandle } from '@phab/data-next';

import RedirectLogin from '../login/Redirect';
import ProductsViewer from './ProductsViewer';

export default async function ProductsPage() {
  const categories = await getCategories();
  const productsPromises = categories.map((category) =>
    getProductsByCategoryHandle(category.handle),
  );
  const productsByCategory = await Promise.all(productsPromises);

  console.log(productsByCategory);

  return (
    <div>
      <RedirectLogin />
      <ProductsViewer
        productsByCategory={productsByCategory}
        categories={categories}
      />
    </div>
  );
}
