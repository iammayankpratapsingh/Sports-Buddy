# Sports Buddy - Sports Matching Web Application

A modern web platform connecting sports enthusiasts, enabling them to find partners, create and join events, and build an active community.

## Features

- User authentication and profiles
- Event creation and discovery
- Location-based matching
- Sport and skill level filtering
- Real-time notifications
- Responsive design for all devices
- Admin dashboard for content moderation

## Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (version 18 or higher)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/iammayankpratapsingh/Sports-Buddy
cd Sports-Buddy
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
   - Create a `.env` file in the root directory
   - Add the following variables:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Start the development server:
```bash
npm run dev
```

5. Open your browser and navigate to:
```
http://localhost:5173
```

## Project Structure

```
sports-buddy/
├── src/
│   ├── components/     # Reusable UI components
│   ├── context/       # React context providers
│   ├── pages/         # Page components
│   ├── types/         # TypeScript type definitions
│   └── data/          # Mock data (temporary)
├── public/            # Static assets
└── ...config files
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Supabase
- React Router DOM
- Lucide React (icons)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email support@sportsbuddy.com or join our Slack channel.
