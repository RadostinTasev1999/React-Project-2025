import { test,expect } from '@playwright/test'

test('Verify "All Posts" link is visible', async({ page }) => {
    await page.goto('http://localhost:5173/')

    await page.waitForSelector('nav#nav-bar',{ state:'attached' })

    const allPostsLink = await page.$('a[href="/posts"]')

    const isPostLinkVisible = await allPostsLink.isVisible();

    expect(isPostLinkVisible).toBe(true);
})

test('Verify "Login" button is visible', async({ page }) => {
    await page.goto('http://localhost:5173/');

    await page.waitForSelector('nav#nav-bar',{ state:'attached' })

    const loginButton = await page.$('a[href="/login"]');

    const isLoginButtonVisible = await loginButton.isVisible();

    expect(isLoginButtonVisible).toBe(true);

});

test.only('Login with valid credentials', async({ page }) => {
    await page.goto('http://localhost:5173/login')

    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456')

    await page.click('button[type="submit"]')

    await page.waitForSelector('#logout', { state: 'attached' });

    const logoutButton = await page.$('#logout')

    const isLogoutButtonVisible = await logoutButton.isVisible();

    expect(isLogoutButtonVisible).toBe(true);
})

// test('Verify "Create Post" link is visible after user login', async({ page }) => {
//     await page.goto('http://localhost:5173/login')

//     await page.fill('input[name="email"]', 'peter@abv.bg');
//     await page.fill('input[name="password"]', '123456');
//     await page.click('button[type="submit"]');



    
// })