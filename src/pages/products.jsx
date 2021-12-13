import { Spinner } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { InputField, ProductCard, SelectField } from '../components/design';
import { CloseIcon, HamburgerIcon, RefreshIcon } from '../icons';
import {
  getAllCategories,
  getAllProducts,
  selectCategories,
  selectProducts,
} from '../products/state';

const InitialFilterOptions = {
  universalCode: '',
  name: '',
  categoryId: null,
};

function Products() {
  const dispatch = useDispatch();

  const products = useSelector(selectProducts);
  const categories = useSelector(selectCategories);

  const [currentFilter, setCurrentFilter] = useState(InitialFilterOptions);

  const [isCollapsed, setIsCollapsed] = useState(true);

  const filterValues = (values) => {
    if (values) {
      let filterDraft = values;
      const { universalCode, categoryId, name } = currentFilter;
      if (universalCode) {
        filterDraft = filterDraft.filter((x) =>
          x.universalCode.toLowerCase().includes(universalCode.toLowerCase())
        );
      }
      if (name) {
        filterDraft = filterDraft.filter((x) =>
          x.name.toLowerCase().includes(name.toLowerCase())
        );
      }
      if (categoryId) {
        filterDraft = filterDraft.filter((x) => x.category.id === categoryId);
      }
      return filterDraft;
    }
  };

  const refreshProducts = async () => {
    await dispatch(getAllProducts());
  };

  const filteredProducts = filterValues(products);

  useEffect(() => {
    dispatch(getAllProducts());
    dispatch(getAllCategories());
  }, []);

  return (
    <div className="bg-lightdarkblue h-full overflow-y-auto flex flex-col">
      <div className="sticky top-0 bg-darkblue mb-2">
        <div className="px-4 py-2 text-lightblue bg-darkblue items-center gap-2 shadow sticky top-0">
          <div className="flex justify-between">
            <div className="flex items-center leading-none text-md lg:text-xl">
              Products
            </div>
            <div className="flex gap-2">
              <div
                className="flex items-center justify-end pl-2"
                onClick={refreshProducts}
              >
                <button className="p-1 text-lightblue hover:bg-lightdarkblue rounded">
                  <RefreshIcon className="w-6 h-6" />
                </button>
              </div>
              <div
                className="hover:bg-lightdarkblue rounded flex justify-center items-center p-1 transition-colors cursor-pointer lg:hidden"
                onClick={() => setIsCollapsed(!isCollapsed)}
              >
                <HamburgerIcon
                  className={`h-6 w-6 ${!isCollapsed ? 'text-blue' : ''}`}
                />
              </div>
            </div>
          </div>
          <div className={`${isCollapsed ? 'hidden' : 'block'} lg:block`}>
            <div className="border-b border-lightdarkblue my-2"></div>
            <div className="grid grid-cols-12 gap-2">
              <InputField
                label="Universal code"
                labelClassName="text-sm pb-0.5"
                name="universalCode"
                type="text"
                placeholder="Filter by code"
                containerClassName="col-span-6 md:col-span-4 lg:col-span-3 xl:col-span-2"
                className="h-8"
                textSize="md"
                onChange={(e) =>
                  setCurrentFilter({
                    ...currentFilter,
                    universalCode: e.target.value,
                  })
                }
                value={currentFilter.universalCode}
              />
              <InputField
                label="Product name"
                labelClassName="text-sm pb-0.5"
                name="name"
                type="text"
                className="h-8"
                textSize="md"
                placeholder="Filter by name"
                containerClassName="col-span-6 md:col-span-4 lg:col-span-3 xl:col-span-2"
                onChange={(e) =>
                  setCurrentFilter({
                    ...currentFilter,
                    name: e.target.value,
                  })
                }
                value={currentFilter.name}
              />
              <SelectField
                label="Category"
                labelClassName="text-sm pb-0.5"
                name="name"
                type="text"
                className="h-8"
                textSize="md"
                iconPlacement="bottom-1 right-2"
                options={[
                  { id: 0, name: 'Not selected' },
                  ...(categories || []),
                ]}
                containerClassName="col-span-6 md:col-span-4 lg:col-span-3 xl:col-span-2"
                onChange={(e) =>
                  setCurrentFilter({
                    ...currentFilter,
                    categoryId: +e.target.value,
                  })
                }
                value={currentFilter.categoryId}
              />
            </div>
          </div>
        </div>
      </div>
      {filteredProducts ? (
        <div className="grid grid-cols-12 gap-2 w-full px-2">
          {filteredProducts?.length > 0 ? (
            filteredProducts?.map((product) => (
              <ProductCard key={product.id} aggregatedProduct={product} />
            ))
          ) : (
            <div className="col-span-12 text-lightblue p-2">
              There are no products matching your criteria...
            </div>
          )}
        </div>
      ) : (
        <div className="flex items-center justify-center flex-grow">
          <Spinner thickness="4px" size="xl" className="text-brightgreen" />
        </div>
      )}
    </div>
  );
}

export { Products };
