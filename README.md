# E-Pharmacy Admin Dashboard

### About the Project
E-Pharmacy Admin Dashboard is a responsive web application designed for a medical store's administrative panel. It allows the main administrator to monitor income, expenses, and other statistical data, as well as efficiently manage inventory, orders, suppliers, and registered customers. The interface is adaptive, supporting breakpoints from 375px mobile devices up to 1440px desktop screens.

<a href="https://pharma-frontend-dashboard.vercel.app/" target="_blank">
  <img src="https://pharma-frontend-dashboard.vercel.app/images/E_PharmacyOG.webp" alt="Site Preview" width="800"/>
</a>

### Live Demo
[Visit website](https://pharma-frontend-dashboard.vercel.app/)

### Backend Repository
[Pharma Backend API](https://github.com/kristinka-skl/pharma-backend) — Built with Node.js.

### Tech Stack
* **Framework:** Next.js 16 (App Router)
* **Language:** TypeScript
* **State Management & Data Fetching:** TanStack React Query (Server state & hydration), Zustand (Client state)
* **Forms & Validation:** React Hook Form, Yup
* **API Client:** Axios
* **UI & Styling:** CSS Modules, Material UI (MUI), Headless UI, Emotion
* **Dates:** Dayjs
* **Icons & Graphics:** SVG Sprite, Retina-optimized graphics

### Architecture & Patterns
* **Server-Side Rendering (SSR) & Hydration:** Utilizes Next.js Server Components to prefetch data on the server (e.g., initial queries for customers) and dehydrates the state to the client for seamless hydration via React Query.
* **BFF (Backend for Frontend) Proxy:** API requests are routed through Next.js server-side API endpoints (`/api/...`) to attach authentication cookies securely and hide backend endpoints from the browser network tab.
* **Server-Side Pagination & Filtering:** Both pagination and search filters are handled on the server, modifying URL parameters and fetching exact data slices to ensure optimal performance on large datasets.

### Authentication & Security
* **Protected Routes:** All administrative pages (Dashboard, Orders, Products, Customers, Suppliers) are private routes.
* **Session Management:** Relies on cookie-based authentication passed seamlessly through proxy server routes.
* **Form Protection:** Forms are heavily protected against invalid or malicious data submissions using `react-hook-form` coupled with strict `yup` validation schemas prior to dispatching asynchronous requests.

### Application Structure & Pages
The application is strictly divided into public access (for unauthorized users) and private access (for authorized administrators).

#### Public Pages
* `/login`: The entry point for the main administrator. Contains a secure form with Email and Password inputs. Upon successful authentication, the user is redirected to the main administrative dashboard.

#### Private Pages (Requires Authentication)
* **Global Layout**: The wrapper for all internal pages. Includes a Header (with a clickable application logo, the title "Medicine Store", and a Logout button) and a Sidebar containing a navigational menu built with sprite icons. The sidebar highlights the currently active route.
* `/dashboard`: The main overview page. Displays generalized statistics about the total number of products, suppliers, and customers. It also features tables for "Recent Customers" and an "Income/Expenses" breakdown.
* `/orders`: Manages user orders. Displays a comprehensive table with user info, delivery addresses, product lists, order dates, prices, and statuses. Features full server-side pagination and filtering by the user's name.
* `/products`: Manages the store's inventory. Displays the newest products first, detailing categories (e.g., Medicine, Dental Care, Skin Care), stock levels, suppliers, and prices. Administrators can add new items or edit existing data via modal windows. Includes server-side pagination and filtering by product name.
* `/suppliers`: A directory for supplier management. Lists supplier company details, delivery dates, transaction amounts, and statuses. Features dedicated modals to add or edit supplier profiles and includes server-side pagination and filtering by supplier name.
* `/customers`: A client management view containing a table of registered customers, including contact information (email, phone, address) and registration dates. Features full server-side pagination and server-side filtering by customer name.

### ⚙️ Installation & Running
Follow these steps to set up the project locally:

1. Clone the repository:
    git clone https://github.com/kristinka-skl/pharma-frontend-dashboard.git

2. Navigate to the project directory:
    cd pharma-frontend-dashboard

3. Install dependencies:
    npm install

4. Run the development server:
    npm run dev

Open http://localhost:3000 with your browser to see the result.

### Author
**Khrystyana Skliarchuk** — Junior Fullstack Developer  
Email: kristinka.skl@gmail.com  
GitHub: [Go to Profile](https://github.com/kristinka-skl)