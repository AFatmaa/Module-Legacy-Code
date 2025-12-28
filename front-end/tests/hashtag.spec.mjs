import { test, expect } from "@playwright/test";

test.describe("Hashtag View Tests", () => {
    
  test("should only make one fetch request (no infinite loop)", async ({ page }) => {
  
    // How many requests go to the server
    let fetchCount = 0;

    // Network requests
    page.on("request", (request) => {
      if (
        request.url().includes("hashtag") && 
        request.resourceType() === "fetch"
      ) {
        fetchCount++;
      }
    });

    // Go to the hashtag page
    await page.goto("/#/hashtag/do");

    // Wait for a short time (0.5 seconds)
    await page.waitForTimeout(500);

    // We expect only 1 or 2 requests. 
    expect(fetchCount).toBeLessThan(3); 
  });

});