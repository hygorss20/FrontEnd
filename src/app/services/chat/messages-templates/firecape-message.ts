import { Purchase, PurchaseItem } from "src/app/model/purchase";

export const getFirecapeMessage = (purchase: Purchase, totalPrice: string) => `
Hi, I'd like to ${getOrderType(purchase)} this itens below:
${getItemsList(purchase.items)}

Payment Method: ${purchase.paymentMethod.name};
Total: ${totalPrice}

Customer note: "${purchase.customerNote}"
`;

function getItemsList(purchaseItems: PurchaseItem[]) {
  return purchaseItems.map((purchase) => `- ${purchase.item.name};`);
}

function getOrderType(purchase: Purchase) {
  if (purchase.type === "BUY") {
    return "purchase";
  }

  return "sell";
}
