import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

import prismadb from "@/lib/prismadb";

import { SettingsForm } from "./components/settings-form";

const SettingsPage = async ({
  params,
}: {
  params: Promise<{ storeId: string }>;
}) => {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const store = await prismadb.store.findFirst({
    where: {
      id: (await params).storeId,
      userId,
    },
  });

  if (!store) {
    redirect("/");
  }

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SettingsForm initialData={store} />
      </div>
    </div>
  );
};

export default SettingsPage;
