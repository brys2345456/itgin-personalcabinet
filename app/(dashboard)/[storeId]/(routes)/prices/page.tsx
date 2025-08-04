import prismadb from "@/lib/prismadb"
import { PricesForm } from "./components/price-form"

const PricesPage = async () => {

  const prices = await prismadb.prices.findUnique({
    where: {
      id: 1,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <PricesForm initialData={prices} />
      </div>
    </div>
  );
};

export default PricesPage;
