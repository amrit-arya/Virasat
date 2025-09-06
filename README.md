# Virasat - The Legacy Guardian

A comprehensive digital legacy management platform that helps users securely store and manage important documents, assets, and information for their beneficiaries.

## 🚀 Features

### Authentication & Security
- **Email/Password Authentication**: Secure login with Supabase
- **Google OAuth Integration**: One-click social authentication
- **Protected Routes**: Dashboard access control
- **Death Certificate Verification**: .gov.in domain validation for nominee access

### Document Management
- **Secure Upload**: Multi-file upload with drag & drop
- **Categorized Storage**: Organized by Insurance, Banking, Medical, Properties, PINs
- **File Preview & Download**: Built-in document viewer
- **Search & Filter**: Quick document discovery

### Asset Categories
- **Insurance Policies**: Life, Health, Vehicle insurance management
- **Banking & Investments**: Account tracking, investment portfolios
- **Medical Records**: Health documents, prescription tracking
- **Properties & Assets**: Real estate, vehicles, valuable items
- **PINs & Passwords**: Secure credential storage with visibility toggle
- **Nominee Management**: Beneficiary details with verification system

### User Experience
- **Responsive Design**: Mobile-first approach (phone, tablet, desktop)
- **Lemon Yellow Theme**: Beautiful #FFD700 accent color throughout
- **Smooth Navigation**: Back buttons and intuitive routing
- **Toast Notifications**: User feedback for all actions
- **Loading States**: Professional loading indicators

## 🛠️ Technology Stack

- **Frontend**: React+ TypeScript + Vite
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: shadcn/ui with custom variants
- **Authentication**: Supabase Auth
- **Database**: Supabase (SQL)
- **State Management**: React useState/useEffect
- **Routing**: React Router v6
- **Icons**: Lucide React
- **Notifications**: Sonner + Custom Toast System

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/                     # shadcn/ui components
│   ├── AppSidebar.tsx         # Navigation sidebar
│   └── DeathCertificateVerification.tsx
├── pages/
│   ├── Landing.tsx            # Home page with hero section
│   ├── Login.tsx / Signup.tsx # Authentication pages
│   ├── Dashboard.tsx          # Main dashboard
│   ├── Upload.tsx             # Document upload
│   ├── Nominees.tsx           # Beneficiary management
│   ├── Insurance.tsx          # Insurance management
│   ├── Banking.tsx            # Financial assets
│   ├── Medical.tsx            # Health records
│   ├── Properties.tsx         # Real estate & vehicles
│   └── Pins.tsx               # Secure credentials
├── lib/
│   ├── supabase.ts           # Supabase client & auth helpers
│   └── utils.ts              # Utility functions
└── hooks/
    └── use-toast.ts          # Toast notification hook
```

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm
- Supabase account and project

### Installation

1. **Clone the repository**
   ```bash
   git clone <YOUR_GIT_URL>
   cd <YOUR_PROJECT_NAME>
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create `.env.local` file:
   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   Navigate to `http://localhost:5173`

## 🌐 Deployment Options
### Option 1: Vercel
1. Connect GitHub repository to Vercel
2. Add environment variables in dashboard
3. Auto-deploy on push to main branch

### Option 2: Netlify
1. Build project: `npm run build`
2. Upload `dist` folder to Netlify
3. Configure environment variables

### Option 3: Traditional VPS
1. Build: `npm run build`
2. Upload to server with nginx/apache
3. Configure SSL and domain

## 📱 Responsive Design

- **Mobile (320px+)**: Sidebar becomes bottom navigation
- **Tablet (768px+)**: Collapsible sidebar with icons
- **Desktop (1024px+)**: Full sidebar with labels
- **Large (1440px+)**: Expanded content areas

## 🔐 Security Features

- **Authentication**: Supabase Auth with secure sessions
- **File Upload**: Secure file handling with type validation
- **Domain Verification**: Government certificate validation
- **Access Control**: Protected routes and data
- **Encrypted Storage**: Supabase encryption at rest

## 🎨 Design System

### Color Palette
- **Primary**: Lemon Yellow (#FFD700)
- **Background**: White (#FFFFFF)
- **Text**: Dark grey for readability
- **Accents**: Soft gradients and shadows

### Typography
- **Headings**: Bold, clear hierarchy
- **Body**: Readable font sizes
- **Buttons**: Consistent styling with hover states

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

