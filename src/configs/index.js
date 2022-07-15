import { AntdConfig } from "./AntdConfig";
import { ApolloConfig } from "./ApolloConfig";
import { MomentConfig } from "./MomentConfig";

export const AppConfig = ({ children }) => {
  return (
    <ApolloConfig>
      <MomentConfig>
        <AntdConfig>{children}</AntdConfig>
      </MomentConfig>
    </ApolloConfig>
  );
};
