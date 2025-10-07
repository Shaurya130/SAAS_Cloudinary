# Nexus Playground - AI-Powered Video Processing SaaS

A modern, full-stack SaaS application for video processing, compression, and social media optimization. Built with Next.js 15, powered by Cloudinary's AI-driven media processing, and featuring seamless user authentication.

## 🚀 Features

### Video Processing
- **AI-Powered Compression** - Reduce video file sizes by up to 80% while maintaining quality
- **Cloud-Based Processing** - Fast, scalable video optimization using Cloudinary
- **Multiple Format Support** - Handle MP4, MOV, AVI, and other popular video formats
- **Batch Processing** - Upload and process multiple videos efficiently

### Social Media Integration
- **Image Transformation** - Convert images to perfect social media formats
- **Pre-configured Templates** - Instagram Square/Portrait, Twitter Posts, Facebook Covers
- **Smart Cropping** - AI-powered automatic cropping for optimal visual appeal
- **One-Click Downloads** - Export optimized content instantly

### User Experience
- **Modern UI/UX** - Clean, professional interface built with DaisyUI
- **Responsive Design** - Seamless experience across all devices
- **Real-time Progress** - Live upload and processing status updates
- **Intuitive Dashboard** - Easy-to-navigate video library and management

### Security & Authentication
- **Clerk Integration** - Secure user authentication and session management
- **Protected Routes** - Middleware-based route protection
- **User Profiles** - Complete user management system

## 🛠️ Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **DaisyUI** - Component library for consistent UI

### Backend & APIs
- **Next.js API Routes** - Serverless API endpoints
- **Prisma ORM** - Type-safe database operations
- **PostgreSQL** - Reliable relational database (Neon)

### Third-Party Services
- **Cloudinary** - AI-powered media processing and optimization
- **Clerk** - User authentication and management
- **Vercel** - Deployment and hosting platform

### Development Tools
- **ESLint** - Code linting and formatting
- **PostCSS** - CSS processing and optimization
- **React Toastify** - User notifications

## 📦 Installation

1. **Clone the repository**
```bash
git clone https://github.com/Shaurya130/SAAS_Cloudinary.git
cd ai-powered-saas
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Set up environment variables**
Create a `.env.local` file in the root directory:
```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# Database
DATABASE_URL=your_postgresql_connection_string

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

4. **Set up the database**
```bash
npx prisma generate
npx prisma db push
```

5. **Run the development server**
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 🔧 Configuration

### Database Setup
The application uses PostgreSQL with Prisma ORM. The database schema includes:
- **Videos** - Store video metadata, processing status, and file information
- **Users** - Managed through Clerk authentication

### Cloudinary Setup
1. Create a Cloudinary account
2. Get your Cloud name, API key, and API secret
3. Configure video upload presets for optimization

### Clerk Setup
1. Create a Clerk application
2. Configure authentication providers
3. Set up redirect URLs for your domain

## 🎯 Usage

### Video Upload
1. Navigate to `/video-upload`
2. Fill in video title and description
3. Select your video file (max 70MB)
4. Click "Upload Video" to process

### Social Media Creator
1. Go to `/social-share`
2. Upload an image file
3. Select your desired social media format
4. Preview and download the optimized image

### Dashboard
- View all your processed videos
- Track storage usage and statistics
- Quick access to upload and share features

## 📱 API Endpoints

### Video Processing
- `POST /api/video-upload` - Upload and process videos
- `GET /api/videos` - Retrieve user's video library

### Image Processing
- `POST /api/image-upload` - Upload images for social media optimization

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy automatically on every push to main branch

### Other Platforms
The application can be deployed on any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform

## 🔐 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk public key | ✅ |
| `CLERK_SECRET_KEY` | Clerk secret key | ✅ |
| `DATABASE_URL` | PostgreSQL connection string | ✅ |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name | ✅ |
| `CLOUDINARY_API_KEY` | Cloudinary API key | ✅ |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret | ✅ |

## 📝 Project Structure

```
ai-powered-saas/
├── app/
│   ├── (app)/              # Protected app routes
│   │   ├── home/           # Dashboard
│   │   ├── video-upload/   # Video upload page
│   │   └── social-share/   # Social media creator
│   ├── (auth)/             # Authentication routes
│   ├── api/                # API endpoints
│   └── globals.css         # Global styles
├── components/             # Reusable components
├── prisma/                 # Database schema
├── types/                  # TypeScript definitions
└── middleware.ts           # Route protection
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework for production
- [Cloudinary](https://cloudinary.com/) - AI-powered media processing
- [Clerk](https://clerk.com/) - User authentication made simple
- [Prisma](https://prisma.io/) - Next-generation ORM
- [DaisyUI](https://daisyui.com/) - Beautiful UI components

## 📞 Support

For support, email [your-email@example.com](mailto:your-email@example.com) or create an issue on GitHub.

---

**Built with ❤️ by [Shaurya130](https://github.com/Shaurya130)**
