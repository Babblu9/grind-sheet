# GrindSheet 🚀

> Master Data Structures & Algorithms with curated roadmaps and competitive programming contest tracking

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/grindsheet)

## ✨ Features

- **📚 Curated DSA Roadmaps**: Follow NeetCode's proven patterns and roadmaps
- **✅ Progress Tracking**: Track completed questions with visual heatmap
- **📅 Contest Calendar**: Never miss contests from LeetCode, Codeforces, AtCoder, GeeksforGeeks, and CodeChef
- **🔐 Authentication**: Secure Google OAuth authentication via Supabase
- **☁️ Cloud Sync**: Your progress syncs across devices
- **🎨 Modern UI**: Beautiful dark theme with glassmorphism effects
- **📱 Responsive**: Works seamlessly on desktop and mobile

## 🛠️ Tech Stack

- **Framework**: [Astro](https://astro.build/) - Fast, modern static site generator
- **UI Library**: [React](https://react.dev/) - For interactive components
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- **Authentication**: [Supabase Auth](https://supabase.com/auth) - Google OAuth
- **Database**: [Supabase](https://supabase.com/) - PostgreSQL database
- **State Management**: [Nanostores](https://github.com/nanostores/nanostores) - Tiny state manager
- **Deployment**: [Vercel](https://vercel.com/) - Serverless deployment platform

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- A Supabase account ([sign up here](https://supabase.com))
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/grindsheet.git
   cd grindsheet
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Copy the example environment file:
   ```bash
   cp .env.example .env
   ```
   
   Update `.env` with your Supabase credentials:
   ```env
   PUBLIC_SUPABASE_URL=your_supabase_project_url
   PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```
   
   Get these values from your [Supabase project settings](https://app.supabase.com/project/_/settings/api).

4. **Set up Supabase database**
   
   Run this SQL in your Supabase SQL Editor:
   ```sql
   -- Create user_progress table
   create table user_progress (
     id uuid default gen_random_uuid() primary key,
     user_id uuid references auth.users not null,
     question_id text not null,
     completed boolean default false,
     completed_at timestamp with time zone default now(),
     created_at timestamp with time zone default now(),
     unique(user_id, question_id)
   );

   -- Enable Row Level Security
   alter table user_progress enable row level security;

   -- Create policies
   create policy "Users can view own progress"
     on user_progress for select
     using (auth.uid() = user_id);

   create policy "Users can insert own progress"
     on user_progress for insert
     with check (auth.uid() = user_id);

   create policy "Users can update own progress"
     on user_progress for update
     using (auth.uid() = user_id);
   ```

5. **Enable Google OAuth in Supabase**
   
   - Go to [Authentication > Providers](https://app.supabase.com/project/_/auth/providers) in your Supabase dashboard
   - Enable Google provider
   - Add your Google OAuth credentials
   - Add `http://localhost:4321/practice` to authorized redirect URLs for development

6. **Start the development server**
   ```bash
   npm run dev
   ```
   
   Open [http://localhost:4321](http://localhost:4321) in your browser.

## 📦 Build for Production

```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## 🚢 Deployment

### Deploy to Vercel (Recommended)

1. **Push your code to GitHub**

2. **Import to Vercel**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Import your GitHub repository
   - Vercel will auto-detect Astro

3. **Add environment variables**
   - In Vercel project settings, add:
     - `PUBLIC_SUPABASE_URL`
     - `PUBLIC_SUPABASE_ANON_KEY`

4. **Update Supabase redirect URLs**
   - Add your Vercel domain to Supabase Auth redirect URLs
   - Example: `https://your-app.vercel.app/practice`

5. **Deploy!**
   - Vercel will automatically deploy on every push to main

### Other Platforms

GrindSheet can be deployed to any platform that supports static sites:
- **Netlify**: `npm run build` → deploy `dist` folder
- **Cloudflare Pages**: Connect GitHub repo, build command: `npm run build`
- **GitHub Pages**: Use [withastro/action](https://github.com/withastro/action)

## 📁 Project Structure

```
grindsheet/
├── public/              # Static assets
│   ├── favicon.png
│   ├── logo.png
│   └── robots.txt
├── src/
│   ├── components/      # React & Astro components
│   │   ├── landing/     # Landing page components
│   │   └── ui/          # Reusable UI components
│   ├── data/            # Static data (questions, roadmaps)
│   ├── layouts/         # Page layouts
│   ├── lib/             # Utilities (Supabase, logger)
│   ├── pages/           # Astro pages (routes)
│   ├── stores/          # Nanostores state management
│   └── styles/          # Global styles
├── .env.example         # Environment variables template
├── astro.config.mjs     # Astro configuration
├── package.json
├── tailwind.config.mjs  # Tailwind configuration
└── vercel.json          # Vercel deployment config
```

## 🔒 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `PUBLIC_SUPABASE_URL` | Your Supabase project URL | ✅ Yes |
| `PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anonymous key | ✅ Yes |

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- [NeetCode](https://neetcode.io/) for the curated DSA roadmaps
- [Codolio](https://codolio.com/) for the contest calendar API
- Contest platforms: LeetCode, Codeforces, AtCoder, GeeksforGeeks, CodeChef

## 📧 Support

If you have any questions or run into issues, please [open an issue](https://github.com/yourusername/grindsheet/issues).

---

Made with ❤️ by developers, for developers
