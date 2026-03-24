import OrdersEmptyState from "../molecules/OrdersEmptyState";

export default function OrdersOrganism() {
  return (
    <section className="w-full ">
      <OrdersEmptyState
        title="Orders"
        subtitle="No orders so far recorded"
      />
    </section>
  );
}