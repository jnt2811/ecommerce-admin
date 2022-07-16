import { gql } from "@apollo/client";

export const GET_CATEGORIES = gql`
  query GetCategories($id: String, $searchString: String) {
    getCategories(ID: $id, search_string: $searchString) {
      ID
      CATEGORIES_NAME
      SLUG
      DESCRIPTION
      CREATE_AT
      UPDATE_AT
      STATE
    }
  }
`;

export const ADD_CATEGORY = gql`
  mutation AddNewCategories($categories: [CateInsertInput]!) {
    addNewCategories(categories: $categories) {
      status
      message
      error
    }
  }
`;

export const UPDATE_CATEGORY = gql`
  mutation UpdateCategories($category: CateUpdateInput) {
    updateCategories(category: $category) {
      status
      message
      error
    }
  }
`;
