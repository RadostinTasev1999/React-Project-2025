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

test('Login with valid credentials', async({ page }) => {
    await page.goto('http://localhost:5173/login')

    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456')

    await page.click('button[type="submit"]')

    await page.waitForSelector('#logout', { state: 'attached' });

    const logoutButton = await page.$('#logout')

    const isLogoutButtonVisible = await logoutButton.isVisible();

    expect(isLogoutButtonVisible).toBe(true);
})

// test('Register with valid credentials',async({ page }) => {
//     await page.goto('http://localhost:5173/register')

//     await page.fill('input[name="email"]', 'radostin@gmail.com');
//     await page.fill('input[name="username"]', 'Tasev1904');
//     await page.fill('input[name="password"]', '12345678910')
//     await page.fill('input[name="re-password"]', '12345678910')

//     await page.click('button[type="submit"]');

//     await page.waitForSelector('#logout', { state: 'attached' });

//     const logoutButton = await page.$('#logout')

//     const isLogoutButtonVisible = await logoutButton.isVisible();

//     expect(isLogoutButtonVisible).toBe(true);
// })

test('Verify redirection of Logout link after user Login',async({ page }) => {
    await page.goto('http://localhost:5173/login')

     await page.fill('input[name="email"]', 'peter@abv.bg');
     await page.fill('input[name="password"]', '123456')

     await page.click('button[type="submit"]')

     await page.waitForSelector('#logout', { state: 'attached' });

     const logoutButton = await page.$('#logout')

     await logoutButton.click();

     await page.waitForSelector('nav#nav-bar',{ state:'attached' })

     const loginButton = await page.$('a[href="/login"]')
     const isLoginButtonVisible = await loginButton.isVisible();

     const registerButton = await page.$('a[href="/register"]')
     const isRegisterButtonVisible = await registerButton.isVisible();

     expect(isLoginButtonVisible).toBe(true)
     expect(isRegisterButtonVisible).toBe(true)
})

test('Login with invalid password', async({ page }) => {
    await page.goto('http://localhost:5173/login')

    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123')

    // const response = await page.waitForResponse(res =>
    //     res.url().includes('/login') && res.status() === 403
    // )

    const [response] = await Promise.all([
        page.waitForResponse(res =>
            res.url().includes('/login') && res.status() === 403
        ),
        page.click('button[type="submit"]')
    ]);

    const body = await response.json();
    const status = await response.status();

    expect(body.message).toBe("Login or password don't match")
    expect(status).toBe(403)
})