
LabSync-AI
AI-powered app for uploading and analyzing medical lab reports (PDF). Uses cloud OCR to extract data, visualize trends, and deliver health insights. Built with React, Tailwind, Supabase, and Google Cloud Functions.

🚀 Overview

The LabSync-AI is a React-based web application that allows users to upload PDF lab reports, processes them using Google Cloud Functions, and provides detailed analytics and insights about medical test results. The application features user authentication, report management, and sophisticated analytics with trend visualization.

🏗 Architecture

Frontend

Framework: React 18 with TypeScript
Build Tool: Vite
Styling: Tailwind CSS with shadcn/ui components
State Management: React Query (@tanstack/react-query)
Routing: React Router DOM
Icons: Lucide React
Charts: Recharts
Backend

Database: Supabase (PostgreSQL)
Authentication: Supabase Auth
File Processing: Google Cloud Functions
File Storage: Supabase Storage
UI Components

Component Library: shadcn/ui built on Radix UI
Responsive Design: Mobile-first approach
Accessibility: ARIA compliant components
📁 Project Structure

src/
├── components/
│   ├── analytics/          # Analytics dashboard components
│   ├── auth/              # Authentication components
│   ├── layout/            # Layout components
│   ├── reports/           # Report management components
│   └── ui/               # Reusable UI components
├── hooks/                 # Custom React hooks
├── integrations/
│   └── supabase/         # Supabase client and types
├── lib/
│   ├── constants/        # Application constants
│   ├── services/         # Business logic services
│   └── utils/           # Utility functions
└── pages/                # Page components
🗄 Database Schema

Tables

reports

Stores uploaded lab reports metadata
Links to user accounts
Contains processed data and file URLs
test_results

Individual test result values
Links to parameters and users
Timestamped for trend analysis
parameters

Master list of medical test parameters
Includes normal ranges and units
Categorized by test type
parameter_insights

AI-generated insights for each parameter
Includes deficiency reasons and improvement suggestions
Fun facts for user engagement
reference_ranges

Normal value ranges for parameters
Age and gender-specific ranges
Used for anomaly detection
🔐 Authentication

The application uses Supabase Auth with:

Email/password authentication
Protected routes using ProtectedRoute component
Persistent session management
Automatic redirects for unauthenticated users
📊 Features

1. File Upload & Processing

PDF Upload: Drag-and-drop interface for lab reports
Cloud Processing: Google Cloud Functions for OCR and data extraction
Progress Tracking: Real-time upload progress indicators
Error Handling: Comprehensive error reporting
2. Report Management

Report List: Tabular view of all uploaded reports
Search & Filter: Find reports by date, type, or patient
Download: Access original PDF files
Delete: Remove reports with confirmation
Details View: Modal with comprehensive report information
3. Analytics Dashboard

Test Categories: CBC, Liver Function, Lipid Profile, Diabetes
Trend Analysis: Time-series charts for parameter tracking
Metric Insights: AI-generated health insights
Comparative Analysis: Compare values against normal ranges
Date Range Filtering: Flexible date selection
Overview Mode: Multi-parameter dashboard view
4. Data Visualization

Interactive Charts: Recharts-based line graphs
Metric Cards: Key performance indicators
Trend Indicators: Up/down trend visualization
Color-coded Status: Normal, high, low value indicators
Responsive Design: Mobile-optimized charts
🔧 Configuration

Environment Variables

VITE_SUPABASE_URL: Supabase project URL
VITE_SUPABASE_ANON_KEY: Supabase anonymous key
Supabase Configuration

Project URL: https://kjltywepybuznrmctglq.supabase.co
Row Level Security (RLS) enabled
Real-time subscriptions for live updates
Google Cloud Functions

Endpoint: https://asia-south1-healthpay-434611.cloudfunctions.net/swasthx
Processes PDF files and extracts medical data
Returns structured JSON with test results
🧪 Test Categories & Parameters

Complete Blood Count (CBC)

Hemoglobin, WBC, Platelets, RBC
Hematocrit, MCV, MCH, MCHC
Neutrophils, Lymphocytes, Monocytes, Eosinophils, Basophils
Liver Function Tests (LFT)

Bilirubin (Total, Direct, Indirect)
Enzymes (AST, ALT, ALP, GGT, LDH)
Proteins (Total Protein, Albumin, Globulin)
A/G Ratio
Lipid Profile

Total Cholesterol, HDL, LDL, Triglycerides
Diabetes Panel

Glucose, HbA1c
📱 User Interface

Pages

Home (/): File upload and feature overview
Reports (/reports): Report management interface
Analytics (/analytics): Data visualization dashboard
Settings (/settings): User preferences
Login (/login): Authentication interface
Components

Responsive Design: Mobile-first approach
Accessibility: WCAG 2.1 compliant
Dark Mode: Theme switching capability
Loading States: Skeleton loaders and progress indicators
Error Boundaries: Graceful error handling
🔄 Data Flow

Upload: User uploads PDF lab report
Processing: Google Cloud Function extracts data
Storage: Report metadata and results stored in Supabase
Analytics: Data processed for trend analysis
Visualization: Charts and insights generated
Insights: AI-powered health recommendations
🛠 Development

Scripts

npm run dev: Start development server
npm run build: Build for production
npm run preview: Preview production build
npm run lint: Run ESLint
Dependencies

Core: React, TypeScript, Vite
UI: Radix UI, Tailwind CSS, Lucide React
Data: React Query, Supabase
Charts: Recharts
Forms: React Hook Form, Zod
Routing: React Router DOM
Development Tools

ESLint: Code linting
TypeScript: Type checking
Tailwind CSS: Utility-first styling
PostCSS: CSS processing
Vite: Fast build tool
🚀 Deployment

Build Configuration

Development: npm run build:dev
Production: npm run build
Preview: npm run preview
Environment Setup

Configure Supabase project
Set up Google Cloud Functions
Configure environment variables
Deploy to hosting platform
📊 Analytics Features

Metric Tracking

Latest Values: Most recent test results
Historical Trends: Time-series analysis
Average Calculations: Period-based averages
Normal Range Comparison: Health status indicators
Insights Generation

Deficiency Analysis: Identify low values
Improvement Suggestions: Actionable health tips
Fun Facts: Educational health information
Trend Alerts: Significant changes notification
Filtering & Customization

Date Range Selection: Custom period analysis
Report Limits: Control data volume
Category Switching: Focus on specific test types
Metric Selection: Individual parameter analysis
🔒 Security

Authentication

Supabase Auth integration
JWT token management
Session persistence
Automatic logout on token expiry
Data Protection

Row Level Security (RLS)
User-specific data isolation
Encrypted data transmission
Secure file storage
Error Handling

Comprehensive error boundaries
User-friendly error messages
Logging for debugging
Graceful degradation
🎨 UI/UX Design

Design System

Colors: Teal primary, gray secondary
Typography: Inter font family
Spacing: Consistent 8px grid
Animations: Smooth transitions
Icons: Lucide React icon set
Responsive Design

Mobile First: Optimized for mobile devices
Breakpoints: sm, md, lg, xl, 2xl
Flexible Layouts: CSS Grid and Flexbox
Touch Friendly: Appropriate touch targets
🤝 Contributing

Fork the repository
Create a feature branch
Make your changes
Add tests if applicable
Submit a pull request
📄 License

This project is licensed under the MIT License.

🆘 Support

For support and questions:

Create an issue in the repository
Contact the development team
Check the documentation
This documentation covers the current state of the LabSync-AI application. For the most up-to-date information, please refer to the source code and inline comments.