export async function restockProduct(productId: string, quantity: number): Promise<boolean> {
  await new Promise((resolve) => setTimeout(resolve, 500));
  console.log('Restocking product:', productId, 'quantity:', quantity);
  return true;
}
