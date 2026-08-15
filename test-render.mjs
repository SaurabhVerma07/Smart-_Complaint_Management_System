import puppeteer from 'puppeteer';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.static(path.join(__dirname, 'dist')));
app.use((req, res) => res.sendFile(path.join(__dirname, 'dist/index.html')));

const server = app.listen(3000, async () => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    page.on('console', msg => console.log('BROWSER LOG:', msg.text()));
    page.on('pageerror', err => console.error('BROWSER ERROR:', err.toString()));

    await page.goto('http://localhost:3000/login', { waitUntil: 'networkidle0' });
    
    // Check if login page rendered
    let bodyHTML = await page.evaluate(() => document.body.innerHTML);
    if (!bodyHTML.includes('Sign in')) {
      console.log('Login page empty!', bodyHTML.substring(0, 200));
    }

    // Try clicking the demo credentials
    await page.evaluate(() => {
      const demoBtns = document.querySelectorAll('.bg-gray-50.cursor-pointer');
      if (demoBtns.length > 0) demoBtns[0].click(); // Click Citizen
    });
    
    // Submit form
    await page.evaluate(() => {
      const btn = document.querySelector('button[type="submit"]');
      if (btn) btn.click();
    });

    // Wait for navigation
    await new Promise(r => setTimeout(r, 2000));

    const currentUrl = await page.url();
    console.log('Current URL after login:', currentUrl);
    
    bodyHTML = await page.evaluate(() => document.body.innerHTML);
    if (!bodyHTML.includes('Dashboard')) {
      console.log('Dashboard might be empty! HTML snippet:', bodyHTML.substring(0, 500));
    } else {
      console.log('Dashboard rendered successfully.');
    }

    await browser.close();
  } catch (err) {
    console.error('Puppeteer Error:', err);
  } finally {
    server.close();
  }
});
