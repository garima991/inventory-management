"use client";
import { useState, useEffect } from "react";
import { gqlClient } from "@/services/graphql";
import { GET_ALL_SALES, GET_SALES_BY_CATEGORY } from "@/lib/gql/queries";
import {Sale} from "../../generated/prisma";


export function useSales () {
    const[sales, setSales] = useState<Sale[]>([]);
    const[salesLoading, setSalesLoading] = useState(true)
     const [categorySales, setCategorySales] = useState<
        Array<{ category: string; totalQuantity: number; totalRevenue: number }>
      >([]);
      const [categorySalesLoading, setCategorySalesLoading] = useState(true);

      useEffect(() => {
        async function fetchSales(){
            try{
                const data = await gqlClient.request(GET_ALL_SALES);
                setSales(data.getAllSales || []);
            }
            catch(e){
                console.error("Error while fetching sales", e);
            }
            finally{
                setSalesLoading(false);
            }
        }
        fetchSales();
      }, [])


      useEffect(() => {
        async function fetchSalesByCategory() {
          try {
            const data = await gqlClient.request(GET_SALES_BY_CATEGORY);
            setCategorySales(data.getSalesByCategory || []);
          } catch (e) {
            console.error("Error fetching sales by category:", e);
          } finally {
            setCategorySalesLoading(false);
          }
        }
        fetchSalesByCategory();
      }, []);

    
    return {sales, salesLoading, categorySales, categorySalesLoading };

}