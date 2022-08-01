import { Purchase, PurchaseItem } from "src/app/model/purchase";

export const getDefaultMessage = (purchase: Purchase) => `
Hi, I'd like to ${getOrderType(purchase)} this itens below:
${getItemsList(purchase.items)}

Payment Method: ${purchase.paymentMethod.name};
Total: ${purchase.currency.symbol} ${getFormattedTotalPrice(purchase)}

Customer note: "${purchase.customerNote}"
`;

function getItemsList(purchaseItems: PurchaseItem[]) {
  return purchaseItems.map(getItemDescriptionForList);
}

function getItemDescriptionForList(purchase: PurchaseItem) {
  const unit = purchase.item.unit ? purchase.item.unit : "";

  return `- ${purchase.item.name}: ${purchase.quantity} ${unit};`;
}

function getOrderType(purchase: Purchase) {
  if (purchase.type === "BUY") {
    return "purchase";
  }

  return "sell";
}

function getFormattedTotalPrice(purchase: Purchase) {
  return (purchase.total * purchase.currency.conversionToUSDValue).toFixed(2);
}
