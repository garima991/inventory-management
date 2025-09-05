interface Sale{
  createdAt: string | number;
  quantity: number;
}

export function aggregateSales(
  sales: Sale[],
  groupBy: "day" | "month" | "year"
): { label: string; quantity: number }[] {
  const grouped: Record<string, number> = {};

  sales.forEach((sale) => {
    let dateObj: Date = new Date(Number(sale.createdAt));

    let key: string;
    switch (groupBy) {
      case "day":
        key = dateObj.toISOString().split("T")[0]; // yyyy-mm-dd
        break;
      case "month":
        key = `${dateObj.getFullYear()}-${String(
          dateObj.getMonth() + 1
        ).padStart(2, "0")}`; // yyyy-mm
        break;
      case "year":
        key = `${dateObj.getFullYear()}`;
        break;
    }

    grouped[key] = (grouped[key] || 0) + sale.quantity;
  });

  const sortedKeys = Object.keys(grouped).sort((a, b) => a.localeCompare(b));

  return sortedKeys.map((key) => ({
    label: key,
    quantity: grouped[key],
  }));
}
