describe('Task', () => {
   it('base example, visually looks correct', async () => {
      await page.goto('http://localhost:9009/iframe.html?args=&id=span-that-turns-into-an-input--default-case&viewMode=story')
      const image = await page.screenshot()

      expect(image).toMatchImageSnapshot();
   })
});