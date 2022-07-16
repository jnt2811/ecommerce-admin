import { gql } from "@apollo/client";

export const GET_USERS = gql`
  query GetUsers($id: String, $searchString: String) {
    getUsers(ID: $id, search_string: $searchString) {
      ID
      CREATE_AT
      UPDATE_AT
      STATE
      FIRST_NAME
      LAST_NAME
      DATE_OF_BIRTH
      GENDER
      NATIONALITY
      ADDRESS
      PHONE_NUMBER
    }
  }
`;
