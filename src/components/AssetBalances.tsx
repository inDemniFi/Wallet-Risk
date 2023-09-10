import React from "react";
import { useAppStore } from "../AppStore";
import { Card, ICardAction } from "./ui/Card";
import { assetBalancesConfig } from "./assetBalancesConfig.tsx";

interface AssetBalancesProps {
  deviceId: string;
  accountId: string;
}

const AssetBalances: React.FC<AssetBalancesProps> = ({ deviceId, accountId }) => {
  const [assetBalances, setAssetBalances] = useState<{ [assetId: string]: number }>({});

  useEffect(() => {
    const apiService = new ApiService("your_base_url", "your_token"); // Replace with your actual base URL and token
    const fetchTransactions = async () => {
      try {
        const response = await apiService.getTransactions(deviceId, accountId); // Replace with the actual API call to fetch transactions
        const transactions: ITransactionDetails[] = await response.json();

        // Calculate the netAmount for each asset and update the balances
        const balances: { [assetId: string]: number } = {};
        transactions.forEach((transaction) => {
          const { assetId, netAmount } = transaction;
          if (assetId && netAmount !== undefined) {
            balances[assetId] = (balances[assetId] || 0) + netAmount;
          }
        });

        setAssetBalances(balances);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactions();
  }, [deviceId, accountId]);

  return (
    <div>
      <h2>Asset Balances</h2>
      <ul>
        {Object.entries(assetBalances).map(([assetId, balance]) => (
          <li key={assetId}>
            {assetId}: {balance} {assetId}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AssetBalances;
