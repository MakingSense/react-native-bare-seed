describe('Example', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should have login screen', async () => {
    await expect(element(by.id('login-button'))).toBeVisible();
    await element(by.id('email-input')).typeText('mi super email');
    await element(by.id('login-button')).tap();
  });
});
