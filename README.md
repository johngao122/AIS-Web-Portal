This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

-   [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
-   [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# API Instructions

Currently the API is being hosted as a test service on render.com, because we are using the free tier for testing, the server will sleep and reset every 15 minutes of inactivity.

I suggest using POSTMAN to register a user first before using the API.

To register a user, use the POST method with the endpoint https://ais-testing-backend.onrender.com/register. The request body should be in JSON format and contain the following fields:

```json
{
    "username": "your_username",
    "password": "your_password"
}
```

For example, as shown in the screenshot, the payload includes:

```json
{
    "username": "john",
    "password": "1234"
}
```

Ensure the Content-Type header is set to application/json. Once the request is sent, you should receive a response confirming the registration. If the server has been inactive for over 15 minutes, it might take a short while to wake up due to the limitations of the free tier hosting.
