import { expect, test } from "@playwright/test";


test('list orders', async ({ page }) => {
  await page.goto('/orders', { waitUntil: 'networkidle' })

  expect(page.getByRole('cell', { name: 'order-1', exact: true })).toBeVisible()
  expect(
    page.getByRole('cell', { name: 'order-10', exact: true }),
  ).toBeVisible()
})


test("filter by status", async ({ page }) => {
  await page.goto("/orders", { waitUntil: "networkidle" }); // waitUntil significa esperar até que a página pare de fazer requisições de rede

  await page.getByRole("combobox").click();
  await page.getByLabel("Pendente").click();

  await page.getByRole("button", { name: "Filtrar resultados" }).click();

  await page.waitForLoadState("networkidle");

  const pendingTableRows =  page
    .getByRole("cell", { name: "Pendente" })
  

  expect(pendingTableRows).toHaveCount(10);
});
