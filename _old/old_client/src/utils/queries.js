import { gql } from '@apollo/client';

export const QUERY_USER = gql`
    {
        user {
            userName
            orders {
                _id
                purchaseDate
                products {
                    _id
                    name
                    description
                    image
                    quantity
                    price
                    category {
                        _id
                        name
                    }
                }
            }
        }
    }
`;

export const QUERY_PRODUCTS = gql`
    query getProducts($category: ID) {
        products(category: $category) {
            _id
            name
            description
            price
            quantity
            image
            category {
                _id
            }
        }
    }
`;

export const QUERY_ALL_PRODUCTS = gql`
    {
        products {
            _id
            name
            description
            price
            quantity
            image
            category {
                _id
                name
            }
        }
    }
`;

export const QUERY_CATEGORIES = gql`
    {
        categories {
            _id
            name
        }
    }
`;