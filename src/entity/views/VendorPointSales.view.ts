import { ViewEntity, ViewColumn, DataSource } from "typeorm";

@ViewEntity({
  name: "view_vendor_point_sales_summary",
  expression: (dataSource: DataSource) =>
    dataSource
      .createQueryBuilder()
      .select("vp.name", "vendor_point_name")
      .addSelect("COUNT(DISTINCT s.id)", "total_sales_transactions")
      .addSelect("SUM(si.quantity)", "total_quantity")
      .addSelect("SUM(si.sellingPrice * si.quantity)", "total_revenue")
      .from("sales", "s")
      .leftJoin("sale_items", "si", "si.saleId = s.id")
      .leftJoin("sales_stands", "vp", "s.vendorPointId = vp.id")
      .groupBy("vp.name"),
})
export class VendorPointSalesSummaryView {
  @ViewColumn({ name: "vendor_point_name" })
  vendorPointName: string;

  @ViewColumn({ name: "total_sales_transactions" })
  totalSalesTransactions: number;

  @ViewColumn({ name: "total_quantity" })
  totalQuantity: number;

  @ViewColumn({ name: "total_revenue" })
  totalRevenue: number;
}
