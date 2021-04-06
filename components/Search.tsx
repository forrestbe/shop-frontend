import React from 'react';
import { DropDown, DropDownItem, SearchStyles } from './styles/DropDown';
import { resetIdCounter, useCombobox } from 'downshift';
import gql from 'graphql-tag';
import { useLazyQuery } from '@apollo/client';
import debounce from 'lodash.debounce';
import { useRouter } from 'next/router'
import { Product } from '../models/Product.model';

const SEARCH_PRODUCTS_QUERY = gql`
  query SEARCH_PRODUCTS_QUERY($searchTerm: String!) {
    searchTerms: allProducts(
      where: {
        OR: [
          { name_contains_i: $searchTerm },
          { description_contains_i: $searchTerm },
        ]
      }
    ) {
      id
      name
      photo {
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

export default function Search(): JSX.Element {
  const router = useRouter();
  const [findItems, {loading, data}] = useLazyQuery(SEARCH_PRODUCTS_QUERY, {
    fetchPolicy: 'no-cache'
  })
  const items = data?.searchTerms || [];
  const findItemsButChill = debounce(findItems, 350);
  resetIdCounter();
  const { isOpen, inputValue, getMenuProps, getInputProps, getComboboxProps, getItemProps, highlightedIndex } = useCombobox({
    items,
    onInputValueChange() {
      findItemsButChill({
        variables: {
          searchTerm: inputValue
        }
      });
    },
    onSelectedItemChange(change) {
      const selectedItem = change?.selectedItem as Product;
      router.push({
        pathname: `/product/${selectedItem.id}`,
      })
    },
    itemToString: (item: Product) => item?.name || '',
  });

  return (
    <SearchStyles>
      <div {...getComboboxProps()}>
        <input {...getInputProps({
          type: 'search',
          placeholder: 'Search for an item',
          id: 'search',
          className: loading ? 'loading' : '',
        })} />
      </div>
      <DropDown {...getMenuProps()}>
        {isOpen && items.map((item, index) =>
          <DropDownItem key={item.id} {...getItemProps({ item })} highlighted={index === highlightedIndex}>
            <img src={item.photo.image.publicUrlTransformed} alt={item.name} width="50px" />
            {item.name}
          </DropDownItem>
        )}
        {isOpen && !items.length && !loading && (
          <DropDownItem>Sorry no items found {inputValue}</DropDownItem>
        )}
      </DropDown>
    </SearchStyles>
  )
}
