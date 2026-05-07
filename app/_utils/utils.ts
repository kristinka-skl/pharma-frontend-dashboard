export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');

  const year = date.getFullYear();

  return `${day}.${month}.${year}`;
};

export const getSessionDuration = (start: string, finish: string) => {
  const startTime = new Date(start).getTime();
  const finishTime = new Date(finish).getTime();
  return Math.round((finishTime - startTime) / (1000 * 60));
};

export const appPages = new Map<string, string>();
 
appPages.set("/dashboard", "Dashboard");
appPages.set("/orders", "All orders");
appPages.set("/products", "All products");
appPages.set("/suppliers", "All suppliers");
appPages.set("/customers", "All customers");
