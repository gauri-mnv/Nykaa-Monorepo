# MiniNykaa 💄✨

### Overview

This project is a **High-Performance E-commerce Monorepo** inspired by Nykaa. It features a scalable **Microservices Architecture** to manage products, carts, and user interactions. Built with a modern tech stack, it provides a premium shopping experience with a clean "Luxe" design, category filtering, and a real-time responsive interface.

The application is structured as a monorepo to ensure seamless coordination between the frontend and multiple backend services.

### Features

  * **Nykaa-Inspired UI:** A clean, professional, and luxurious interface featuring a "Luxe Edit" hero banner and portrait-style product cards.
  * **Microservices Architecture:** Independent services for Products and Cart management, communicating through an API Gateway.
  * **Dynamic Product Feed:** Fetches and displays products by categories (Makeup, Skincare, etc.) with real-time data from the backend.
  * **Advanced Filtering & Sorting:** Filter products by category and sort by price (Low to High / High to Low), popularity, or ratings.
  * **Smart Shopping Bag:** A dedicated cart page to manage items, quantities, and real-time price calculations.
  * **Search Functionality:** Real-time search to find favorite beauty brands and products instantly.
  * **Responsive Layout:** Fully optimized for both desktop and mobile viewing using pure CSS Flexbox and Grid.
  * **Monorepo Management:** Powered by **TurboRepo** for lightning-fast builds and shared configurations.

### Screenshots


  - Home Page with Luxe Banner

    ![Alt Text](https://i.ibb.co/RkyZPrBM/Screenshot-from-2026-03-31-14-50-14.png)
    ---



  - Product Listing with Sidebar Filters

    ![Alt Text](https://i.ibb.co/fG4HHQrm/Screenshot-from-2026-03-31-14-51-01.png)
---



  - Shopping Bag / Cart View

     ![Alt Text](https://i.ibb.co/ym8HfBGF/Screenshot-from-2026-03-31-14-50-35.png)
     ---





### Technologies Used

  * **Frontend:** React, TypeScript, Vite
  * **Styling:** Pure CSS (Custom Nykaa Theme), Lucide/HeroIcons
  * **Backend:** NestJS (Microservices)
  * **Monorepo Tooling:** TurboRepo
  * **Communication:** REST API, API Gateway
  * **State Management:** React Hooks (useState, useMemo, useEffect)

### Getting Started

#### Prerequisites

  * Node.js (v18+) and npm installed
  * TurboRepo installed globally (`npm install turbo --global`)

#### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/gauri-mnv/Nykaa-Monorepo.git
    ```

2.  **Navigate to the project folder:**

    ```bash
    cd nykaa-monorepo
    ```

3.  **Install dependencies for the entire monorepo:**

    ```bash
    npm install
    ```

#### Running the Application

You can start all services (Gateway, Products, Cart, and Frontend) with a single command:

```bash
npx turbo run dev
```

**Access the services at:**

  - **Frontend:** `http://localhost:5173`,`https://nykaa-frontend-pu8y.onrender.com/`
  - **API Gateway:** `http://localhost:3000`,`https://nykaa-gateway.onrender.com/products`
  - **Product Service:** `http://localhost:3001`,`https://nykaa-product-service.onrender.com/all-products`
  - **Cart Service:** `http://localhost:3002`,`https://nykaa-frontend-pu8y.onrender.com/cart`

### Approach and Design

  * **Scalability First:** Using NestJS Microservices allows each part of the app (like Cart or Products) to scale independently.
  * **API Gateway Pattern:** All frontend requests go through a central Gateway to ensure security and simplified routing.
  * **Pure CSS Elegance:** Avoided heavy CSS frameworks to maintain a lightweight bundle and achieve a specific "Nykaa" brand aesthetic.
  * **Type Safety:** Shared TypeScript interfaces across the monorepo to prevent runtime errors between frontend and backend.

### Known Issues / Limitations

  * **CORS Configuration:** Ensure the Gateway allows `http://localhost:5173` for cross-origin requests.
  * **Mock Data:** Currently using DummyJSON for product data; integration with a production database (PostgreSQL/MongoDB) is in progress.
  * **Auth:** User authentication is planned for the next sprint.

### Repository

**GitHub:** [https://github.com/gauri-mnv/Nykaa-Monorepo](https://www.google.com/url?sa=E&source=gmail&q=https://github.com/gauri-mnv/Nykaa-Monorepo.git)

### Contact

Questions, suggestions, or want to collaborate?  
**Email:** [g4ur131@gmail.com]





<!-- # Turborepo starter

This Turborepo starter is maintained by the Turborepo core team.

https://i.ibb.co/zWygtrvC/Screenshot-from-2026-03-31-18-30-07.png


 npx turbo run dev --filter=api-gateway --filter=product-service --filter=cart-service

 npx turbo run dev --filter=frontend --filter=api-gateway --filter=product-service --filter=cart-service
## Using this example

Run the following command:

```sh
npx create-turbo@latest
```

## What's inside?

This Turborepo includes the following packages/apps:

### Apps and Packages

- `docs`: a [Next.js](https://nextjs.org/) app
- `web`: another [Next.js](https://nextjs.org/) app
- `@repo/ui`: a stub React component library shared by both `web` and `docs` applications
- `@repo/eslint-config`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `@repo/typescript-config`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This Turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

### Build

To build all apps and packages, run the following command:

With [global `turbo`](https://turborepo.dev/docs/getting-started/installation#global-installation) installed (recommended):

```sh
cd my-turborepo
turbo build
```

Without global `turbo`, use your package manager:

```sh
cd my-turborepo
npx turbo build
yarn dlx turbo build
pnpm exec turbo build
```

You can build a specific package by using a [filter](https://turborepo.dev/docs/crafting-your-repository/running-tasks#using-filters):

With [global `turbo`](https://turborepo.dev/docs/getting-started/installation#global-installation) installed:

```sh
turbo build --filter=docs
```

Without global `turbo`:

```sh
npx turbo build --filter=docs
yarn exec turbo build --filter=docs
pnpm exec turbo build --filter=docs
```

### Develop

To develop all apps and packages, run the following command:

With [global `turbo`](https://turborepo.dev/docs/getting-started/installation#global-installation) installed (recommended):

```sh
cd my-turborepo
turbo dev
```

Without global `turbo`, use your package manager:

```sh
cd my-turborepo
npx turbo dev
yarn exec turbo dev
pnpm exec turbo dev
```

You can develop a specific package by using a [filter](https://turborepo.dev/docs/crafting-your-repository/running-tasks#using-filters):

With [global `turbo`](https://turborepo.dev/docs/getting-started/installation#global-installation) installed:

```sh
turbo dev --filter=web
```

Without global `turbo`:

```sh
npx turbo dev --filter=web
yarn exec turbo dev --filter=web
pnpm exec turbo dev --filter=web
```

### Remote Caching

> [!TIP]
> Vercel Remote Cache is free for all plans. Get started today at [vercel.com](https://vercel.com/signup?utm_source=remote-cache-sdk&utm_campaign=free_remote_cache).

Turborepo can use a technique known as [Remote Caching](https://turborepo.dev/docs/core-concepts/remote-caching) to share cache artifacts across machines, enabling you to share build caches with your team and CI/CD pipelines.

By default, Turborepo will cache locally. To enable Remote Caching you will need an account with Vercel. If you don't have an account you can [create one](https://vercel.com/signup?utm_source=turborepo-examples), then enter the following commands:

With [global `turbo`](https://turborepo.dev/docs/getting-started/installation#global-installation) installed (recommended):

```sh
cd my-turborepo
turbo login
```

Without global `turbo`, use your package manager:

```sh
cd my-turborepo
npx turbo login
yarn exec turbo login
pnpm exec turbo login
```

This will authenticate the Turborepo CLI with your [Vercel account](https://vercel.com/docs/concepts/personal-accounts/overview).

Next, you can link your Turborepo to your Remote Cache by running the following command from the root of your Turborepo:

With [global `turbo`](https://turborepo.dev/docs/getting-started/installation#global-installation) installed:

```sh
turbo link
```

Without global `turbo`:

```sh
npx turbo link
yarn exec turbo link
pnpm exec turbo link
```

## Useful Links

Learn more about the power of Turborepo:

- [Tasks](https://turborepo.dev/docs/crafting-your-repository/running-tasks)
- [Caching](https://turborepo.dev/docs/crafting-your-repository/caching)
- [Remote Caching](https://turborepo.dev/docs/core-concepts/remote-caching)
- [Filtering](https://turborepo.dev/docs/crafting-your-repository/running-tasks#using-filters)
- [Configuration Options](https://turborepo.dev/docs/reference/configuration)
- [CLI Usage](https://turborepo.dev/docs/reference/command-line-reference) -->
