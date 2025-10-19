# GlowUp — Beauty & Hair Salon Booking Platform

GlowUp is a modern full-stack web application that helps clients discover curated beauty & hair salons,
book appointments, and share feedback. Salon owners can manage their services, pricing, and booking
pipeline from an elegant dashboard.

## Features at a glance

### Client experience
- 🌟 Immersive landing page with cinematic imagery, glassmorphism, and responsive layouts
- 🔍 Real-time salon discovery with filters for city, service type, and keyword search
- 📅 Seamless appointment booking with availability, notes, and automated reminders
- 📝 Social proof via rich review feeds and dynamic rating aggregation

### Salon owner tools
- 📊 Stats dashboard summarising booking pipeline, customer sentiment, and review health
- 🧾 Service management with pricing, duration, amenities, and gallery support
- 🔐 Secure JWT-based authentication with protected routes and persistent sessions

### Technical stack
- **Front-end:** React + Vite, React Router, custom glassmorphism design system
- **Back-end:** Node.js, Express.js, MongoDB (Mongoose ODM)
- **Auth & security:** JWT tokens, password hashing (PBKDF2), protected API routes

---

## Project structure
```
Beuty-Salon-App/
├── client/              # Vite + React front-end
│   ├── index.html
│   ├── package.json
│   └── src/
│       ├── components/  # Reusable UI building blocks
│       ├── context/     # Auth provider
│       ├── hooks/       # API helpers
│       ├── pages/       # Route screens
│       ├── sections/    # Landing page hero & highlights
│       └── styles/      # Global & component styling
├── server/              # Express + MongoDB API
│   ├── package.json
│   ├── .env.example
│   └── src/
│       ├── config/      # Database connection
│       ├── controllers/ # Route logic (auth, salons, appointments, reviews)
│       ├── middleware/  # Auth & error handlers
│       ├── models/      # Mongoose schemas
│       ├── routes/      # REST endpoints
│       └── utils/       # Password hashing helper
└── README.md            # You are here
```

---

## Getting started

> **Prerequisites**
>
> - Node.js 18+
> - npm (v9+) or pnpm/yarn
> - MongoDB 5+ (local instance or Atlas cluster)

### 1. Clone & install
```bash
# clone the repository
 git clone <repo-url>
 cd Beuty-Salon-App

# install server dependencies
 cd server
 npm install

# in a new terminal, install client dependencies
 cd ../client
 npm install
```

### 2. Configure environment variables
Copy the provided example file and adjust values for your MongoDB connection.
```bash
cd server
cp .env.example .env
```
Edit `.env` if needed:
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/beauty_salon_app
JWT_SECRET=change-me
```

### 3. Seed optional demo data
With MongoDB running, you can use MongoDB Compass or the shell to insert sample salons if desired.
The front-end also displays beautifully with live data created via the registration form.

### 4. Start development servers
Open two terminals:
```bash
# Terminal 1 - API server
cd server
npm run dev

# Terminal 2 - Vite front-end
cd client
npm run dev
```

The web UI will be available at **http://localhost:5173** and proxies API calls to
`http://localhost:5000` during development.

### 5. Build for production
```bash
# Front-end assets
cd client
npm run build

# API server
cd ../server
npm run start
```

---

## API overview

| Endpoint | Method | Description |
| --- | --- | --- |
| `/api/auth/register` | POST | Create a client or salon owner account |
| `/api/auth/login` | POST | Authenticate and receive a JWT |
| `/api/auth/me` | GET | Fetch current user profile |
| `/api/salons` | GET | Search salons (supports `city`, `service`, `search` query params) |
| `/api/salons/:id` | GET | Retrieve salon details + recent reviews |
| `/api/salons` | POST | Create a salon profile (authenticated owner) |
| `/api/salons/:id` | PATCH | Update salon profile (owner only) |
| `/api/salons/:id/stats` | GET | View booking & review analytics (owner only) |
| `/api/appointments` | POST | Book a new appointment |
| `/api/appointments` | GET | List appointments for the logged-in user |
| `/api/appointments/:id` | PATCH | Update appointment status |
| `/api/reviews` | POST | Leave a review for a salon |
| `/api/reviews/:id` | GET | View reviews for a salon |

JWT tokens should be supplied via the `Authorization: Bearer <token>` header. The front-end handles
this automatically once the user signs in.

---

## Design system highlights
- **Glassmorphism foundation:** Layered frosted panels, soft shadows, and blur to create depth.
- **Vivid gradients:** Sunset pinks and apricot gradients accentuate CTAs and key stats.
- **Modern typography:** Montserrat for UI readability paired with Playfair Display for luxe headlines.
- **Responsive grid:** Tailored breakpoints ensure the hero, cards, and dashboard adjust gracefully on
  phones, tablets, and desktops.

---

## Deployment tips
1. **Front-end:** After `npm run build`, deploy `client/dist` to Netlify, Vercel, or static hosting.
2. **Back-end:** Deploy the Express API to services like Render, Railway, or Heroku. Set environment
   variables for `PORT`, `MONGO_URI`, and `JWT_SECRET`.
3. **MongoDB:** Use a managed MongoDB Atlas cluster with IP allow-listing and SRV connection string.
4. **Environment variables:** Update the Vite proxy target (in `client/vite.config.js`) if the API is hosted on a different domain in production.

---

## Packaging the project
To create a single downloadable archive, run from the repository root:
```bash
zip -r glowup-beauty-salon.zip . -x 'node_modules/*' '.git/*'
```
This produces `glowup-beauty-salon.zip` containing both the client and server projects, ready to share.
The `.gitignore` already excludes `*.zip`, so the archive won't be added to commits or pull requests.

---

## Scripts reference

### Client
- `npm run dev` — Start Vite dev server with hot module reload
- `npm run build` — Create production build
- `npm run preview` — Preview production build locally
- `npm run lint` — Run ESLint checks

### Server
- `npm run dev` — Start Express server with Nodemon
- `npm run start` — Start Express server in production mode

---

## Contributing & feedback
We’d love to hear how you extend GlowUp—integrate calendar sync, add SMS reminders, or plug into
payment providers. Issues and pull requests are welcome!
