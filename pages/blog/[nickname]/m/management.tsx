import React from "react";
import { NextPage } from "next";
import MamagementCt from "../../../../src/components/containers/MamagementCt";
import { scanItem } from "../../../../src/common/DynamoDbUtil";

export async function getServerSideProps(context: any) {
  const item = await scanItem("CATEGORY", ["ALL_ATTRIBUTES"]);
  return {
    props: {
      menu: item.Items,
    },
  };
}

const ManagementPage: NextPage = () => {
  return <MamagementCt />;
};

export default ManagementPage;
