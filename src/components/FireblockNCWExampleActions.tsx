import React from "react";

import { BackupAndRecover } from "./BackupAndRecover";
import { GenerateMPCKeys } from "./GenerateMPCKeys";
import { Takeover } from "./Takeover";
import { Transactions } from "./Transactions";
import { Web3 } from "./Web3";
import Web3ConnectionRow from "./Web3ConnectionRow";

export const FireblockNCWExampleActions: React.FC = () => {
  return (
    <>
      <GenerateMPCKeys />
      <Takeover />
      <BackupAndRecover />
      <Transactions />
      <Web3 />
      <AssetBalance />
      <Web3ConnectionRow />
    </>
  );
};
