// import JSDOM from 'jsdom'
import { compier } from "../lib/main";

test("xxx", async () => {
  // Object.defineProperty(document, 'execCommand', { value: jest.fn() })
  await expect(compier("copied")).resolves.toBe("copied");
});
