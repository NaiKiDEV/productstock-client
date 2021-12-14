import { Spinner } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { client } from '../api';
import { selectAuth } from '../auth';
import {
  InputField,
  ProductCard,
  SelectField,
  Dialog,
} from '../components/design';
import { RoleEnum } from '../constants';
import {
  CloseIcon,
  HamburgerIcon,
  RefreshIcon,
  SadIcon,
  TrashIcon,
} from '../icons';
import {
  getAllCategories,
  getAllProducts,
  getSingleProduct,
  selectEntireState,
} from '../products/state';

const InitialFilterOptions = {
  universalCode: '',
  name: '',
  categoryId: null,
};

function Products() {
  const dispatch = useDispatch();

  const { role, email } = useSelector(selectAuth);
  const { products, categories, productView } = useSelector(selectEntireState);

  const [currentFilter, setCurrentFilter] = useState(InitialFilterOptions);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    <div className="bg-lightdarkblue h-full overflow-y-auto flex flex-col relative">
      <div className="sticky top-0 bg-darkblue mb-2">
        <div className="px-2 py-2 text-lightblue bg-darkblue items-center gap-2 shadow sticky top-0">
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
        <>
          <div className="grid grid-cols-12 gap-2 w-full px-2">
            {filteredProducts?.length > 0 ? (
              filteredProducts?.map((product, index) => (
                <ProductCard
                  key={product.id || index}
                  aggregatedProduct={product}
                  onOpenProduct={(id) => {
                    dispatch(getSingleProduct(id));
                    setIsModalOpen(true);
                  }}
                />
              ))
            ) : (
              <div className="col-span-12 text-lightblue p-2">
                There are no products matching your criteria...
              </div>
            )}
          </div>
          {filteredProducts?.length > 0 && (
            <footer className="px-2 py-10 flex flex-col items-center text-lightblue">
              <div className="py-2">
                <SadIcon className="w-8 h-8 text-" />
              </div>
              <div>
                Looks like you have reached the end of the product list...
              </div>
              <div className="text-xs">
                Contact warehouses or admins if you want to see more products.
              </div>
            </footer>
          )}
        </>
      ) : (
        <div className="flex items-center justify-center flex-grow">
          <Spinner thickness="4px" size="xl" className="text-brightgreen" />
        </div>
      )}
      {filteredProducts && (
        <>
          <Dialog isOpen={isModalOpen}>
            <div className="w-full mx-2 lg:w-1/2 bg-darkblue rounded text-lightblue p-4">
              <div className="flex justify-between">
                <div className="text-lg">Product info</div>
                <div className="hover:bg-lightdarkblue rounded p-1 cursor-pointer">
                  <CloseIcon
                    className="w-5 h-5"
                    onClick={() => setIsModalOpen(false)}
                  />
                </div>
              </div>
              <div className="border-b border-lightdarkblue my-2 col-span-full" />
              {productView ? (
                <div className="gap-2">
                  <div className="col-span-12 rounded bg-white h-56">
                    <img
                      className="rounded h-full w-full object-contain"
                      src={productView?.imageUrl}
                    />
                  </div>
                  <div className="leading-tight text-lg flex justify-between items-center flex-nowrap my-2">
                    <div>{productView.name}</div>
                    <div className="px-2 py-1 text-xs rounded bg-blue text-darkblue font-bold">
                      {productView.category?.name}
                    </div>
                  </div>
                  <div className="border-b border-lightdarkblue my-2 col-span-full" />
                  <div className="leading-none text-sm">
                    {productView?.description}
                  </div>
                  <div className="text-sm flex justify-between pt-6">
                    <div>{`Quantity: ${productView.quantity}`}</div>
                    <div>
                      {`Sold by: ${productView.user.name} ${productView.user.surname}`}
                    </div>
                  </div>
                  <div className="border-b border-lightdarkblue my-2 col-span-full" />
                  <div className="flex justify-between">
                    <div className="flex gap-2">
                      <div className="bg-blue py-1 px-4 text-darkblue font-bold rounded">
                        {productView?.price} $
                      </div>
                      {(role === RoleEnum.Admin ||
                        (role === RoleEnum.Warehouse &&
                          productView.user?.email === email)) && (
                        <div
                          className="cursor-pointer hover:bg-lightdarkblue transition-colors rounded p-1"
                          onClick={async () => {
                            try {
                              await client.delete(`products/${productView.id}`);
                              dispatch(getAllProducts());
                              setIsModalOpen(false);
                            } catch {}
                          }}
                        >
                          <TrashIcon className="w-6 h-6 text-red-500" />
                        </div>
                      )}
                    </div>
                    <div className="text-mutedgreen text-sm flex items-center">
                      #{productView?.universalCode}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex justify-center items-center py-12">
                  <Spinner
                    thickness="4px"
                    size="xl"
                    className="text-brightgreen"
                  />
                </div>
              )}
            </div>
          </Dialog>
        </>
      )}
    </div>
  );
}

export { Products };
