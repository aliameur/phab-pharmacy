export default async function () {
  const storeImports = (await import(
    '@medusajs/medusa/dist/api/routes/store/products/index'
  )) as any;
  storeImports.allowedStoreProductsFields = [
    ...storeImports.allowedStoreProductsFields,
    'wholesaler_product_id',
    'max_quantity',
  ];
  storeImports.defaultStoreProductsFields = [
    ...storeImports.defaultStoreProductsFields,
    'wholesaler_product_id',
    'max_quantity',
  ];
  const adminImports = (await import(
    '@medusajs/medusa/dist/api/routes/admin/products/index'
  )) as any;
  adminImports.defaultAdminProductFields = [
    ...adminImports.defaultAdminProductFields,
    'wholesaler_product_id',
    'max_quantity',
  ];
  adminImports.defaultAdminProductRemoteQueryObject = {
    ...adminImports.defaultAdminProductRemoteQueryObject,
    fields: [
      ...adminImports.defaultAdminProductRemoteQueryObject.fields,
      'wholesaler_product_id',
      'max_quantity',
    ],
  };
}
