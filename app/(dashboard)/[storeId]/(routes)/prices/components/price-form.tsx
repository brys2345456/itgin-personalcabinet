"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { useParams, useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Heading } from "@/components/ui/heading"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { prices } from '@/lib/generated/prisma'

const formSchema = z.object({
  basePrice: z.number().int().positive("Base Price is required"),
  distancePrice: z.number().int().positive("Distance Price is required"),
});

type PricesFormValues = z.infer<typeof formSchema>

interface PricesFormProps {
  initialData: prices | null;
};

export const PricesForm: React.FC<PricesFormProps> = ({
  initialData
}) => {
  const params = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const title = 'Редагувати ціни';
  const description = 'Редагувати базову ціну та ціну за кілометр.';
  const toastMessage = 'Ціни оновлено.';
  const action = 'Зберегти зміни';

  const form = useForm<PricesFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData ? {
      basePrice: initialData.basePrice || 0,
      distancePrice: initialData.distancePrice || 0
    } : {
      basePrice: 0,
      distancePrice: 0
    }
  });
  

  const onSubmit = async (data: PricesFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(`/api/${params.storeId}/prices`, data);
      }
      router.refresh();
      toast.success(toastMessage);
    } catch (error: any) {
      toast.error('Трапилась помилка.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
      </div>

      <Separator />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
          <div className="md:grid md:grid-cols-2 gap-8">

            <FormField
              control={form.control}
              name="basePrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Базова ціна</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={loading}
                      placeholder="Базова ціна"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="distancePrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ціна за кілометр</FormLabel>
                  <FormControl>
                    <Input  
                      type="number"
                      disabled={loading}
                      placeholder="Базова ціна"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))} 
                      />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};