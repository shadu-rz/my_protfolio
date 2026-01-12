# How to Host Your Portfolio for Free (Easiest Method)

Your React website is ready! Since I have already built the project, you now have a `dist` folder containing the live website files.

## Option 1: Netlify Drop (Fastest & Easiest)
You can deploy your site in less than 30 seconds without installing anything extra.

1.  **Locate the 'dist' folder**:
    *   Open your Finder/File Manager.
    *   Go to your project folder: `/Users/riyasu/React Website`.
    *   Find the folder named **`dist`** (this was created when I ran the build command).

2.  **Drag & Drop**:
    *   Open this link in your browser: [https://app.netlify.com/drop](https://app.netlify.com/drop).
    *   Drag the entire **`dist`** folder and drop it into the box on that page.

3.  **Done!**:
    *   Netlify will upload it instantly and give you a live URL (e.g., `random-name.netlify.app`).
    *   You can change the site name in "Site Settings" later to something like `shaduli-portfolio.netlify.app`.

---

## Option 2: Vercel (Best for functionality)
If you want to use the platform known for React/Next.js:

1.  Create a GitHub account and push this code to a repository.
2.  Go to [Vercel.com](https://vercel.com) and sign up/login.
3.  Click "Add New..." -> "Project".
4.  Import your GitHub repository.
5.  Click "Deploy". Vercel handles the rest automatically.
