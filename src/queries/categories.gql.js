import { gql } from "@apollo/client";

export const GET_CATEGORIES = gql`
  query Mutation {
    getCategories {
      ID
      CATEGORIES_NAME
      CREATE_AT
      UPDATE_AT
      STATE
      SLUG
      DESCRIPTION
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
