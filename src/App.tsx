import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import { CartProvider } from "@/contexts/CartContext";
import { SubscriptionProvider } from "@/hooks/useSubscription";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { AccessibilityEnhancer } from "@/components/AccessibilityEnhancer";
import { PerformanceMonitor } from "@/components/PerformanceMonitor";
import { ScrollManager } from "@/components/ScrollManager";
import { AdminRoute } from "@/components/AdminRoute";
import Index from "./pages/Index";
import About from "./pages/About";
import Products from "./pages/Products";
import CVBooster from "./pages/CVBooster";
import InterviewSim from "./pages/InterviewSim";
import GapMap from "./pages/GapMap";
import OtherUKExams from "./pages/gapmap/OtherUKExams";
import TrackDetail from "./pages/gapmap/TrackDetail";
import Launch from "./pages/gapmap/Launch";
import RoadmapResult from "./pages/gapmap/RoadmapResult";
import SponsorMatch from "./pages/SponsorMatch";
import PLAB from "./pages/exams/PLAB";
import Postgraduate from "./pages/exams/Postgraduate";
import IELTS_OET from "./pages/exams/IELTS-OET";
import MRCP from "./pages/exams/MRCP";
import MRCS from "./pages/exams/MRCS";
import MRCOG from "./pages/exams/MRCOG";
import MRCPCH from "./pages/exams/MRCPCH";
import RoyalCollege from "./pages/exams/RoyalCollege";
import EnglishProficiency from "./pages/english/EnglishProficiency";
import WriterPro from "./pages/english/WriterPro";
import SpeechSim from "./pages/english/SpeechSim";
import TranscriptAnalyzer from "./pages/english/TranscriptAnalyzer";
import ReadingAssistant from "./pages/english/ReadingAssistant";
import Research from "./pages/Research";
import Mentors from "./pages/Mentors";
import Login from "./pages/Login";
import GetStarted from "./pages/GetStarted";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import PLABQuizPage from "./pages/PLABQuiz";
import StudyMaterialsPage from "./pages/StudyMaterials";
import Pricing from "./pages/Pricing";
import Consultation from "./pages/Consultation";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import MentorCodeOfConduct from "./pages/MentorCode";
import Refund from "./pages/Refund";
import Cookies from "./pages/Cookies";
import AdminDashboard from "@/components/AdminDashboard";
import AdvancedAIChatbot from "@/components/AdvancedAIChatbot";
import UnifiedConsentBanner from "@/components/UnifiedConsentBanner";
import CheckoutSuccess from "./pages/CheckoutSuccess";
import CheckoutCancel from "./pages/CheckoutCancel";
import { InstagramVerificationFlow } from "@/components/InstagramVerificationFlow";
// import PhoneOtpSignIn from "./pages/PhoneOTPLogin";
// import PhoneOtpSignup from "./pages/PhoneOTPRegister";
// import ProtectedRoute from "./components/ProtectedRoutes";
// import ReRouter from "./components/ProtectedRoutes";
// import { SignUp } from "@clerk/clerk-react";

const queryClient = new QueryClient();

const App = () => (
  <ErrorBoundary>
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <CartProvider>
            <SubscriptionProvider>
              <AccessibilityEnhancer>
                <PerformanceMonitor />
                <Toaster />
                <Sonner />
                <BrowserRouter>
                  <ScrollManager />
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/cv-booster" element={<CVBooster />} />
                    <Route path="/interviewsim" element={<InterviewSim />} />
                    <Route path="/gapmap" element={<GapMap />} />
                    <Route path="/gapmap/other-uk-exams" element={<OtherUKExams />} />
                    <Route path="/gapmap/launch" element={<Launch />} />
                    <Route path="/gapmap/roadmap" element={<RoadmapResult />} />
                    <Route path="/gapmap/:college/:exam/:track" element={<TrackDetail />} />
                    <Route path="/sponsormatch" element={<SponsorMatch />} />
                    <Route path="/english" element={<EnglishProficiency />} />
                    <Route path="/english/writing" element={<WriterPro />} />
                    <Route path="/english/speaking" element={<SpeechSim />} />
                    <Route path="/english/listening" element={<TranscriptAnalyzer />} />
                    <Route path="/english/reading" element={<ReadingAssistant />} />
                    <Route path="/exams/ielts-oet" element={<IELTS_OET />} />
                    <Route path="/exams/plab" element={<PLAB />} />
                    <Route path="/exams/mrcp" element={<MRCP />} />
                    <Route path="/exams/mrcs" element={<MRCS />} />
                    <Route path="/exams/mrcog" element={<MRCOG />} />
                    <Route path="/exams/mrcpch" element={<MRCPCH />} />
                    <Route path="/exams/royal-college" element={<RoyalCollege />} />
                    <Route path="/exams/postgraduate" element={<Postgraduate />} />
                    <Route path="/labs" element={<Research />} />
                    <Route path="/research" element={<Navigate to="/labs" replace />} />
                    <Route path="/white-papers" element={<Navigate to="/labs" replace />} />
                    <Route path="/ndg-labs" element={<Navigate to="/labs" replace />} />
                    <Route path="/mentors" element={<Mentors />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/get-started" element={<GetStarted />} />
                    <Route path="/auth" element={<Auth />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/plab-quiz" element={<PLABQuizPage />} />
                    <Route path="/study-materials" element={<StudyMaterialsPage />} />
                    <Route path="/pricing" element={<Pricing />} />
                    <Route path="/consultation" element={<Consultation />} />
                    <Route path="/terms" element={<Terms />} />
                    <Route path="/privacy" element={<Privacy />} />
                    <Route path="/mentor-code-of-conduct" element={<MentorCodeOfConduct />} />
                    <Route path="/refund" element={<Refund />} />
                    <Route path="/cookies" element={<Cookies />} />
                    <Route path="/checkout/success" element={<CheckoutSuccess />} />
                    <Route path="/checkout/cancel" element={<CheckoutCancel />} />
                    <Route path="/auth/instagram/callback" element={<InstagramVerificationFlow />} />
                    <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
                    {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                  <AdvancedAIChatbot />
                  <UnifiedConsentBanner />
                </BrowserRouter>
              </AccessibilityEnhancer>
            </SubscriptionProvider>
          </CartProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  </ErrorBoundary>
);

export default App;
