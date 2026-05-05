'use client'

import BasicTable from "@/app/Components/Table/Table";
import { getOrders } from "@/app/lib/clientApi";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

export default function OrdersPageClient(){

const { data, isError, isSuccess } = useQuery({
    queryKey: ["orders"],
    queryFn: () => getOrders(),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });


    console.log('orders:', data)
    return <section><h1>Orders page</h1>
    {isSuccess && <BasicTable dataList={data.orders}/>}
    <Toaster/></section>
}


