# Sweet n Snacks 🍭

A modern, full-stack e-commerce website for premium sweets and snacks built with Next.js, TypeScript, Supabase, and Tailwind CSS.

## ✨ Features

- **Modern UI/UX**: Beautiful, responsive design with Tailwind CSS
- **Product Management**: Browse products by categories, search, and filter
- **Shopping Cart**: Add/remove items with persistent storage using Zustand
- **User Authentication**: Secure authentication with Supabase Auth
- **Database Integration**: PostgreSQL database with Supabase
- **Performance Optimized**: Next.js 14 with App Router and TypeScript
- **Mobile Responsive**: Optimized for all device sizes
- **SEO Friendly**: Meta tags and structured data
- **Deployment Ready**: Configured for Vercel deployment

## 🛠 Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, Lucide React Icons
- **State Management**: Zustand
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Deployment**: Vercel
- **Development**: ESLint, PostCSS

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account
- Vercel account (for deployment)

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd Sweet-n-Snacks
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Set Up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to Project Settings > API to get your keys
3. Run the SQL schema in your Supabase SQL Editor:

```sql
-- Copy and paste the contents of supabase-schema.sql
```

### 4. Environment Variables

Create a `.env.local` file in the root directory:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Next.js Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret
```

### 5. Run the Development Server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📁 Project Structure

```
Sweet-n-Snacks/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── globals.css        # Global styles
│   │   ├── layout.tsx         # Root layout
│   │   ├── page.tsx          # Home page
│   │   └── products/         # Products pages
│   ├── components/           # React components
│   │   ├── layout/          # Layout components
│   │   ├── home/            # Home page components
│   │   └── cart/            # Cart components
│   ├── lib/                 # Utility functions
│   │   └── supabase.ts      # Supabase client
│   └── store/               # State management
│       └── cartStore.ts     # Cart state with Zustand
├── public/                  # Static assets
├── supabase-schema.sql     # Database schema
├── tailwind.config.ts      # Tailwind configuration
├── next.config.js          # Next.js configuration
├── vercel.json            # Vercel deployment config
└── package.json           # Dependencies
```

## 🗄 Database Schema

The database includes the following main tables:

- **categories**: Product categories
- **products**: Product information
- **profiles**: User profiles
- **cart_items**: Shopping cart items
- **orders**: Order information
- **order_items**: Individual order items
- **reviews**: Product reviews
- **addresses**: User addresses
- **wishlist_items**: User wishlist

## 🔒 Authentication

The app uses Supabase Auth for user authentication with:

- Email/password signup and login
- Row Level Security (RLS) policies
- Automatic profile creation
- Protected routes and API endpoints

## 🛒 Shopping Cart

Shopping cart functionality includes:

- Add/remove items
- Update quantities
- Persistent storage
- Real-time updates
- Mobile-friendly sidebar

## 🎨 Styling

The app uses Tailwind CSS with:

- Custom color palette for brand consistency
- Responsive design patterns
- Dark mode support (can be enabled)
- Component-based styling
- Optimized for performance

## 📱 Responsive Design

- Mobile-first approach
- Tablet and desktop optimizations
- Touch-friendly interactions
- Optimized images and loading

## 🚀 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` 
   - `SUPABASE_SERVICE_ROLE_KEY`
4. Deploy!

### Environment Variables for Production

Make sure to set these in your Vercel dashboard:

```env
NEXT_PUBLIC_SUPABASE_URL=your_production_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_production_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_production_supabase_service_role_key
```

## 📋 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript compiler
```

## 🔧 Configuration

### Next.js Configuration

The `next.config.js` file includes:
- Image optimization settings
- Experimental app directory
- Performance optimizations

### Tailwind Configuration

Custom theme with:
- Brand colors (primary/secondary)
- Custom fonts
- Extended utilities
- Component classes

## 🎯 Features to Add

- [ ] User authentication UI
- [ ] Product detail pages
- [ ] Checkout process
- [ ] Order management
- [ ] Admin dashboard
- [ ] Payment integration (Stripe)
- [ ] Email notifications
- [ ] Product reviews
- [ ] Search functionality
- [ ] Wishlist feature

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [Supabase](https://supabase.com/) for the backend infrastructure
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Lucide](https://lucide.dev/) for the beautiful icons
- [Unsplash](https://unsplash.com/) for the high-quality images

## 📞 Support

If you have any questions or need help with setup, please open an issue or contact the development team.
