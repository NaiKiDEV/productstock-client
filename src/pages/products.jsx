import { Spinner } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ProductCard } from '../components/design';
import { getAllProducts, selectProducts } from '../products/state';

function Products() {
  const dispatch = useDispatch();

  const products = useSelector(selectProducts);

  useEffect(() => {
    dispatch(getAllProducts());
  }, []);

  console.log(products);

  return (
    <div className="bg-lightdarkblue h-full px-4 overflow-y-auto flex flex-col">
      {products ? (
        <>
          <div className="py-4 text-white">Drop down select</div>
          <div className="grid grid-cols-12 gap-4 w-full">
            {products?.map((product) => (
              <ProductCard key={product.id} aggregatedProduct={product} />
            ))}
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center flex-grow">
          <Spinner thickness="4px" size="xl" className="text-brightgreen" />
        </div>
      )}
    </div>
  );
}

export { Products };
