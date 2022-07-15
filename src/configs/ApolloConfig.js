import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

export const client = new ApolloClient({
  uri: "https://2d5a-123-16-153-132.ap.ngrok.io/resource",
  cache: new InMemoryCache(),
});

export const ApolloConfig = ({ children }) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
