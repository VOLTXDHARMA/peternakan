export const styles = {
  colors: {
    primary: '#8B4513',          // Coklat Saddle Brown
    primaryDark: '#654321',      // Coklat Dark Brown
    primaryLight: '#A0522D',     // Coklat Sienna
    secondary: '#D2691E',        // Coklat Chocolate
    secondaryDark: '#8B4513',    // Coklat Saddle Brown
    accent: '#CD853F',           // Coklat Peru
    danger: '#A52A2A',           // Coklat Maroon untuk error
    warning: '#D2691E',          // Coklat Chocolate untuk warning
    dark: '#3E2723',             // Coklat sangat gelap
    light: '#FFF8DC',            // Krem Cornsilk
    white: '#FFFFFF',            // Putih
    gray: '#8D6E63',             // Abu-abu Coklat
    purple: '#8B7355',           // Coklat Taupe
    pink: '#DEB887',             // Coklat Burlywood
    cyan: '#BC8F8F',             // Coklat Rosy Brown
    orange: '#D2691E',           // Coklat Chocolate
    gradients: {
      primary: 'linear-gradient(135deg, #8B4513 0%, #654321 100%)',        // Gradient coklat
      success: 'linear-gradient(135deg, #A0522D 0%, #8B4513 100%)',        // Gradient coklat terang
      warning: 'linear-gradient(135deg, #D2691E 0%, #CD853F 100%)',        // Gradient chocolate-peru
      purple: 'linear-gradient(135deg, #DEB887 0%, #D2B48C 100%)',         // Gradient tan
      pink: 'linear-gradient(135deg, #F5DEB3 0%, #DEB887 100%)',           // Gradient wheat
      cyan: 'linear-gradient(135deg, #D2B48C 0%, #BC8F8F 100%)',           // Gradient tan-rosy
      orange: 'linear-gradient(135deg, #CD853F 0%, #D2691E 100%)'          // Gradient peru-chocolate
    }
  },
  
  shadows: {
    sm: '0 2px 8px rgba(0, 0, 0, 0.08)',
    md: '0 4px 16px rgba(0, 0, 0, 0.12)',
    lg: '0 8px 32px rgba(0, 0, 0, 0.16)',
    xl: '0 16px 48px rgba(0, 0, 0, 0.2)',
    glow: '0 0 24px rgba(99, 102, 241, 0.4)',
    glowGreen: '0 0 24px rgba(16, 185, 129, 0.4)',
    glowPurple: '0 0 24px rgba(139, 92, 246, 0.4)'
  },

  animation: {
    duration: '0.3s',
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
    spring: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
  }
};

export const applyGlobalStyles = (): void => {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = `
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Inter', 'SF Pro Display', sans-serif;
      background: linear-gradient(-45deg, #F5F5DC, #FAEBD7, #FFE4C4, #FFEFD5, #FFF8DC, #FFFAF0);
      background-size: 400% 400%;
      animation: gradientShift 15s ease-in-out infinite;
      min-height: 100vh;
      overflow-x: hidden;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    @keyframes gradientShift {
      0% { background-position: 0% 50%; }
      25% { background-position: 50% 100%; }
      50% { background-position: 100% 50%; }
      75% { background-position: 50% 0%; }
      100% { background-position: 0% 50%; }
    }

    #app {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }

    @keyframes pulse {
      0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.5; }
      50% { transform: translate(-50%, -50%) scale(1.1); opacity: 0.3; }
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }

    @keyframes slideIn {
      from { transform: translateX(-100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }

    @keyframes float {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-10px); }
    }

    .animate-float {
      animation: float 3s ease-in-out infinite;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(-20px); }
      to { opacity: 1; transform: translateY(0); }
    }

    @keyframes slideIn {
      from { opacity: 0; transform: translateX(-20px); }
      to { opacity: 1; transform: translateX(0); }
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    @keyframes gradientSlide {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }

    .hidden {
      display: none !important;
    }
  `;
  document.head.appendChild(styleSheet);
  console.log('Global styles applied');
};
