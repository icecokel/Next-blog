import React from "react";
import { NextPage } from "next";
import MamagementCt from "../../../../src/components/containers/MamagementCt";
import { scanItem } from "../../../../src/common/service/DynamoService";

export async function getServerSideProps(context: any) {
  const item = await scanItem("MENU", ["ALL_ATTRIBUTES"]);
  return {
    props: {
      menu: item.Items,
    },
  };
}

const ManagementPage: NextPage = (props: any) => {
  return <MamagementCt />;
};

export default ManagementPage;
