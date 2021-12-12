import React from 'react';
import { Link } from 'react-router-dom';

const SellerComponent = ({ seller: { fullName, quantity, price, id } }) => {
  return (
    <Link
      to={(id && `/products/${id}`) || '/products'}
      className="flex py-1 px-2 h-8 bg-lightdarkblue rounded text-sm shadow transition-colors hover:bg-lighterdarkblue"
    >
      {fullName && quantity && price ? (
        <>
          <div className="truncate flex-shrink flex items-center text-sm">
            {fullName}
          </div>
          <div className="flex-grow text-blue whitespace-nowrap text-sm flex leading-none justify-end items-center">
            {price} $
          </div>
        </>
      ) : (
        <div className="truncate flex items-center">
          Listing not available...
        </div>
      )}
    </Link>
  );
};

function ProductCard({ aggregatedProduct: product }) {
  function getSellerComponent() {
    const sellers = product?.sellers?.slice(0, 3);
    for (let i = 0; i < 3; i++) {
      if (!sellers[i]) {
        sellers.push({});
      }
    }
    return sellers.map((x) => <SellerComponent key={x.fullName} seller={x} />);
  }

  return (
    product && (
      <div className="bg-darkblue rounded col-span-6 md:col-span-4 xl:col-span-3 xxl:col-span-2 text-lightblue p-3 flex flex-col shadow-md">
        <div className="h-36 bg-white rounded shadow">
          <img
            className="h-full w-full object-contain rounded"
            src={product?.imageUrl}
          />
        </div>
        <div className="flex flex-col flex-grow">
          <div className="text-md text- pt-2 flex-grow">{product.name}</div>
          <div className="border-lightdarkblue border-b my-2" />
          <div className="flex flex-col gap-1">{getSellerComponent()}</div>
          <div className="flex items-center justify-between pt-2">
            <div className="text-xs rounded bg-blue text-darkblue font-bold px-2 py-1 shadow-sm">
              {product.category.name}
            </div>
            <div className="text-xs  text-mutedgreen">
              #{product.universalCode}
            </div>
          </div>
        </div>
      </div>
    )
  );
}

export { ProductCard };
