import { gql } from "@apollo/client";

export const GET_SELLERS = gql`
  query GetSeller($id: String, $searchString: String) {
    getSeller(ID: $id, search_string: $searchString) {
      ID
      SELLER_NAME
      RATING
      FOLLOWER
      CREATE_AT
      UPDATE_AT
      STATE
    }
  }
`;
