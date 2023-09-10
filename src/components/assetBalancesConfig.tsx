import React from "react";
import { useAppStore } from "../AppStore";
import { IWeb3Session } from "../services/ApiService";

export interface AssetBalancesConfigProps {
  deviceId: string;
  accountId: string;
}

const AssetBalancesConfig: React.FC<AssetBalancesConfigProps> = ({ deviceId, accountId }) => {
  // Define any configuration options here
  // For example, you can define a refresh interval
  const refreshInterval = 60000; // 1 minute

  const [autoRefresh, setAutoRefresh] = useState(true);
  const [refreshCount, setRefreshCount] = useState(0);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (autoRefresh) {
      intervalId = setInterval(() => {
        setRefreshCount((count) => count + 1);
      }, refreshInterval);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [autoRefresh]);

  return (
    <div>
      <h1>Asset Balances Configuration</h1>
      <label>
        <input
          type="checkbox"
          checked={autoRefresh}
          onChange={() => setAutoRefresh(!autoRefresh)}
        />{" "}
        Auto Refresh Every {refreshInterval / 1000} seconds
      </label>
      <AssetBalances deviceId={deviceId} accountId={accountId} key={refreshCount} />
    </div>
  );
};

export default AssetBalancesConfig;
