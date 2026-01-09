/**
 * Entry point aplikasi frontend.
 * Menginisialisasi komponen utama, mengatur routing, dan logika awal aplikasi.
 * Contoh: redirect user sesuai role setelah login.
 */
import { applyGlobalStyles } from './styles/theme.js';
import { LoginComponent } from './components/LoginComponent.js';
import { RegisterComponent } from './components/RegisterComponent.js';
import { DashboardComponent } from './components/DashboardComponent.js';
import { clearContainer } from './utils/dom.js';
import authService from './services/authService.js';

class App {
  private appContainer: HTMLElement;
  private currentView: 'login' | 'register' | 'dashboard' | 'dashboard-peternak' | 'dashboard-investor' | 'dashboard-kios' | 'dashboard-admin' = 'login';

  constructor() {
    applyGlobalStyles();
    
    const container = document.getElementById('app');
    if (!container) {
      throw new Error('App container not found');
    }
    this.appContainer = container;

    this.init();
  }

  private init(): void {
    // Check if user is already authenticated
    if (authService.isAuthenticated()) {
      const user = authService.getCurrentUser();
      this.showDashboardByRole(user?.role);
    } else {
      this.showLogin();
    }
  }

  private showLogin(): void {
    this.currentView = 'login';
    clearContainer(this.appContainer);

    const loginComponent = new LoginComponent();
    
    // Setup event handlers
    loginComponent.onRegisterClick = () => this.showRegister();
    loginComponent.onLoginSuccess = () => {
      const user = authService.getCurrentUser();
      this.showDashboardByRole(user?.role);
    };

    this.appContainer.appendChild(loginComponent.getElement());
  }

  private showRegister(): void {
    this.currentView = 'register';
    clearContainer(this.appContainer);

    const registerComponent = new RegisterComponent();
    
    // Setup event handlers
    registerComponent.onLoginClick = () => this.showLogin();

    this.appContainer.appendChild(registerComponent.getElement());
  }

  // Fungsi untuk menampilkan dashboard sesuai role
  private showDashboardByRole(role: string): void {
    clearContainer(this.appContainer);
    this.appContainer.style.padding = '0';
    this.appContainer.style.alignItems = 'flex-start';

    // Sementara, gunakan DashboardComponent yang sama, bisa diubah sesuai role
    const dashboardComponent = new DashboardComponent(role);
    dashboardComponent.onLogout = () => {
      this.appContainer.style.padding = '20px';
      this.appContainer.style.alignItems = 'center';
      this.showLogin();
    };
    this.appContainer.appendChild(dashboardComponent.getElement());
  }
}

// Initialize app when DOM is ready
function initApp() {
  try {
    console.log('Initializing app...');
    new App();
    console.log('App initialized successfully');
  } catch (error) {
    console.error('Failed to initialize app:', error);
    document.body.innerHTML = `
      <div style="padding: 20px; text-align: center; color: red;">
        <h1>Error</h1>
        <p>Failed to initialize application: ${error}</p>
      </div>
    `;
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  // DOM already loaded
  initApp();
}
