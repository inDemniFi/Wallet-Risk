import React, { useEffect, useState } from "react";
import { useAppStore } from "../AppStore";

const AssetList: React.FC = () => {
  const { fireblocksNCW } = useAppStore();
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSupportedAssets = async () => {
      try {
        const supportedAssets = await fireblocksNCW.getSupportedAssets();
        setAssets(supportedAssets);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching supported assets:", error);
        setLoading(false);
      }
    };

    fetchSupportedAssets();
  }, [fireblocksNCW]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Supported Assets</h2>
      <ul>
        {assets.map((asset) => (
          <li key={asset.assetId}>
            <strong>Name:</strong> {asset.name}
            <br />
            <strong>Symbol:</strong> {asset.symbol}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AssetList;

