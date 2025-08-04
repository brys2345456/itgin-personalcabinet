"use client";

import { Plus, PenLine } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

import { columns, DriverColumn } from "./columns";

interface SizesClientProps {
  data: DriverColumn[];
}

export const SizesClient: React.FC<SizesClientProps> = ({
  data
}) => {
  const params = useParams();
  const router = useRouter();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={`Курєри (${data.length})`} description="Організовуй дані курєрів" />
        <div className='flex gap-4'>
          <Button onClick={() => router.push(`/${params.storeId}/prices`)}>
            <PenLine className="mr-2 h-4 w-4" /> Змінити ціни
          </Button>
          <Button onClick={() => router.push(`/${params.storeId}/sizes/new`)}>
            <Plus className="mr-2 h-4 w-4" /> Додати нового
          </Button>
        </div>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
    </>
  );
};
