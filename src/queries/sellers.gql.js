import { gql } from "@apollo/client";

export const GET_SELLERS = gql`
  query GetSeller($id: String, $searchString: String) {
    getSeller(ID: $id, search_string: $searchString) {
      ID
      EMAIL
      PHONE_NUMBER
      MAIN_CATEGORIES
      SELLER_NAME
      RATING
      FOLLOWER
      CREATE_AT
      UPDATE_AT
      STATE
    }
  }
`;
