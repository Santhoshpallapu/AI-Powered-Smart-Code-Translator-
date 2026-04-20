import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext.jsx';
import '../styles/login.css';

const features = [
  { icon: '🔧', title: 'Code Debugging', desc: 'Find and fix bugs instantly' },
  { icon: '📚', title: 'Code Explanation', desc: 'Understand code in plain English' },
  { icon: '⚡', title: 'AI Optimization', desc: 'Improve performance and efficiency' },
  { icon: '🧪', title: 'Test Generation', desc: 'Create comprehensive test cases' },
];

function LoginPage() {
  const { user, login, register, loading } = useAuth();
  const navigate = useNavigate();
  const googleEnabled = Boolean(import.meta.env.VITE_GOOGLE_CLIENT_ID?.trim());

  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  if (user) return <Navigate to="/" />;

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { username, email, password } = formData;

    if (!email || !password) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (isSignUp && !username) {
      toast.error('Please enter a username');
      return;
    }

    if (password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    try {
      let result;
      if (isSignUp) {
        result = await register(username, email, password);
      } else {
        result = await login(email, password);
      }

      if (result.success) {
        navigate('/');
      }
    } catch (error) {
      // Error is handled in AuthContext
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      toast.info('Google login coming soon!');
    } catch (error) {
      toast.error('Google login failed');
    }
  };

  const handleGoogleError = () => {
    toast.error('Google login failed');
  };

  return (
    <div className="login-page">
      {/* Left Panel */}
      <div className="login-left">
        <div>
          <div className="login-logo">
            <div className="login-logo-icon">{`</>`}</div>
            <span className="login-logo-text">Code Assistant</span>
          </div>

          <h1 className="login-hero-title">AI-Powered Code Assistant</h1>
          <p className="login-hero-subtitle">
            Debug, optimize, and understand your code with the help of advanced AI.
            Support for 10+ programming languages.
          </p>

          <div className="login-features">
            {features.map((f, i) => (
              <div key={i} className="login-feature-card">
                <div className="login-feature-icon">{f.icon}</div>
                <div>
                  <div className="login-feature-title">{f.title}</div>
                  <div className="login-feature-desc">{f.desc}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="login-footer">Powered by Google Gemini AI</div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="login-right">
        <div className="login-form">
          <h2>{isSignUp ? 'Create Account' : 'Sign In'}</h2>
          <p className="login-form-subtitle">
            {isSignUp ? 'Create your account to get started' : 'Enter your credentials to continue'}
          </p>

          <form onSubmit={handleSubmit}>
            {isSignUp && (
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  placeholder="Enter your username"
                  required={isSignUp}
                />
              </div>
            )}

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter your password"
                required
                minLength="6"
              />
            </div>

            <button
              type="submit"
              className="login-btn"
              disabled={loading}
            >
              {loading ? 'Please wait...' : (isSignUp ? 'Create Account' : 'Sign In')}
            </button>
          </form>

          {googleEnabled && (
            <>
              <div className="login-divider">
                <span>or</span>
              </div>

              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleError}
                theme="outline"
                size="large"
                text={isSignUp ? 'signup_with' : 'signin_with'}
                shape="rectangular"
              />
            </>
          )}

          <div className="login-toggle">
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}
            <button
              type="button"
              className="toggle-btn"
              onClick={() => setIsSignUp(!isSignUp)}
            >
              {isSignUp ? 'Sign In' : 'Sign Up'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
