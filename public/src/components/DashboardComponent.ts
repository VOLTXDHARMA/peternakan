import { createElement, showMessage, clearContainer } from '../utils/dom.js';
import { styles } from '../styles/theme.js';
import { User } from '../types.js';
import userService from '../services/userService.js';
import authService from '../services/authService.js';

export class DashboardComponent {
  private container: HTMLElement;
  private userTableBody: HTMLElement | null = null;
  private modal: HTMLElement | null = null;
  private editingUserId: number | null = null;
  private currentPage: string = 'dashboard';
  private contentArea: HTMLElement | null = null;
  private stats: any = { users: 0, umkm: 0, ternak: 0, pembiayaan: 0 };

  constructor() {
    this.container = this.render();
    this.loadStats();
    this.showPage('dashboard');
  }

  private render(): HTMLElement {
    const container = createElement('div', {
      className: 'dashboard-container',
      style: `
        width: calc(100% - 80px);
        max-width: 1300px;
        min-height: calc(100vh - 80px);
        margin: 40px;
        background: ${styles.colors.white};
        border-radius: 20px;
        overflow: hidden;
        box-shadow: ${styles.shadows.lg};
        animation: fadeIn 0.6s ease-out;
        display: flex;
        flex-direction: column;
      `
    });

    const navbar = this.createNavbar();
    const mainContent = createElement('div', {
      style: 'display: flex; flex: 1; overflow: hidden;'
    });

    const sidebar = this.createSidebar();
    const content = createElement('div', {
      id: 'main-content',
      style: `
        flex: 1;
        padding: 16px;
        overflow-y: auto;
        background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
      `
    });

    this.contentArea = content;
    
    mainContent.appendChild(sidebar);
    mainContent.appendChild(content);
    
    container.appendChild(navbar);
    container.appendChild(mainContent);

    return container;
  }

  private createNavbar(): HTMLElement {
    const navbar = createElement('nav', {
      style: `
        background: linear-gradient(135deg, #8B4513 0%, #654321 50%, #A0522D 100%);
        background-size: 200% 100%;
        animation: gradientSlide 8s ease infinite;
        color: white;
        padding: 20px 40px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        gap: 15px;
        box-shadow: 0 8px 32px rgba(139, 69, 19, 0.4), 0 0 60px rgba(101, 67, 33, 0.3);
        position: relative;
        overflow: hidden;
        border-bottom: 2px solid rgba(255,255,255,0.2);
      `
    });

    // Add animated background overlay
    const overlay = createElement('div', {
      style: `
        position: absolute;
        top: -50%;
        left: -50%;
        width: 200%;
        height: 200%;
        background: radial-gradient(circle at 30% 50%, rgba(255,255,255,0.15) 0%, transparent 50%),
                    radial-gradient(circle at 70% 50%, rgba(240,147,251,0.2) 0%, transparent 50%);
        animation: pulse 12s ease-in-out infinite;
        pointer-events: none;
      `
    });
    navbar.appendChild(overlay);

    const brand = createElement('div', {
      innerHTML: `
        <div style="display: flex; align-items: center; gap: 12px; position: relative; z-index: 1;">
          <div style="
            width: 52px;
            height: 52px;
            background: linear-gradient(135deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.1) 100%);
            backdrop-filter: blur(20px);
            border-radius: 16px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 26px;
            box-shadow: 0 8px 32px rgba(255,255,255,0.2), inset 0 1px 1px rgba(255,255,255,0.4);
            border: 1px solid rgba(255,255,255,0.3);
            transition: all 0.3s ease;
          ">
            <i class="fas fa-cow" style="text-shadow: 0 2px 8px rgba(0,0,0,0.2);"></i>
          </div>
          <div>
            <div style="font-size: 26px; font-weight: 900; letter-spacing: -0.5px; text-shadow: 0 2px 12px rgba(0,0,0,0.15);">Peternakan UMKM</div>
            <div style="font-size: 12px; opacity: 0.95; font-weight: 600; text-shadow: 0 1px 4px rgba(0,0,0,0.1);">Platform Manajemen Terpadu</div>
          </div>
        </div>
      `
    });

    const userSection = createElement('div', {
      style: 'display: flex; align-items: center; gap: 15px; position: relative; z-index: 1;'
    });

    const userInfo = createElement('div', {
      innerHTML: `
        <div style="
          background: linear-gradient(135deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.1) 100%);
          backdrop-filter: blur(20px);
          padding: 10px 18px;
          border-radius: 50px;
          display: flex;
          align-items: center;
          gap: 12px;
          border: 1px solid rgba(255,255,255,0.3);
          box-shadow: 0 4px 16px rgba(0,0,0,0.1), inset 0 1px 1px rgba(255,255,255,0.3);
        ">
          <div style="
            width: 36px;
            height: 36px;
            background: linear-gradient(135deg, #fff 0%, #f0f0f0 100%);
            color: ${styles.colors.primary};
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 700;
            font-size: 14px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.15);
          ">
            AU
          </div>
          <div>
            <div style="font-size: 14px; font-weight: 700; text-shadow: 0 1px 4px rgba(0,0,0,0.1);">Admin User</div>
            <div style="font-size: 11px; opacity: 0.9; font-weight: 500;">Administrator</div>
          </div>
        </div>
      `
    });

    const logoutBtn = createElement('button', {
      innerHTML: '<i class="fas fa-sign-out-alt"></i> Logout',
      style: `
        background: linear-gradient(135deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.15) 100%);
        backdrop-filter: blur(20px);
        color: white;
        border: 2px solid rgba(255,255,255,0.4);
        padding: 12px 24px;
        border-radius: 50px;
        cursor: pointer;
        font-weight: 700;
        transition: all ${styles.animation.duration};
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 14px;
        box-shadow: 0 4px 16px rgba(0,0,0,0.1), inset 0 1px 1px rgba(255,255,255,0.3);
        text-shadow: 0 1px 4px rgba(0,0,0,0.1);
      `,
      onclick: () => this.handleLogout()
    });

    logoutBtn.addEventListener('mouseenter', () => {
      logoutBtn.style.background = 'linear-gradient(135deg, #ffffff 0%, #f5f5f5 100%)';
      logoutBtn.style.color = styles.colors.primary;
      logoutBtn.style.transform = 'translateY(-3px) scale(1.05)';
      logoutBtn.style.boxShadow = '0 8px 24px rgba(255,255,255,0.4), 0 0 0 4px rgba(255,255,255,0.2)';
      logoutBtn.style.textShadow = 'none';
    });

    logoutBtn.addEventListener('mouseleave', () => {
      logoutBtn.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.15) 100%)';
      logoutBtn.style.color = 'white';
      logoutBtn.style.transform = 'translateY(0) scale(1)';
      logoutBtn.style.boxShadow = '0 4px 16px rgba(0,0,0,0.1), inset 0 1px 1px rgba(255,255,255,0.3)';
      logoutBtn.style.textShadow = '0 1px 4px rgba(0,0,0,0.1)';
    });

    userSection.appendChild(userInfo);
    userSection.appendChild(logoutBtn);

    navbar.appendChild(brand);
    navbar.appendChild(userSection);

    return navbar;
  }

  private createSidebar(): HTMLElement {
    const sidebar = createElement('div', {
      style: `
        width: 280px;
        background: white;
        border-right: 1px solid #e5e7eb;
        padding: 24px 0;
        display: flex;
        flex-direction: column;
        gap: 8px;
      `
    });

    const menuItems = [
      { id: 'dashboard', icon: 'fas fa-chart-line', label: 'Dashboard', gradient: styles.colors.gradients.primary },
      { id: 'users', icon: 'fas fa-users', label: 'Manajemen User', gradient: styles.colors.gradients.purple },
      { id: 'umkm', icon: 'fas fa-store', label: 'UMKM', gradient: styles.colors.gradients.success },
      { id: 'ternak', icon: 'fas fa-cow', label: 'Ternak', gradient: styles.colors.gradients.warning },
      { id: 'pelatihan', icon: 'fas fa-graduation-cap', label: 'Pelatihan', gradient: styles.colors.gradients.pink },
      { id: 'pembiayaan', icon: 'fas fa-money-bill-wave', label: 'Pembiayaan', gradient: styles.colors.gradients.cyan }
    ];

    menuItems.forEach(item => {
      const menuItem = createElement('div', {
        id: `menu-${item.id}`,
        style: `
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 14px 24px;
          margin: 0 12px;
          cursor: pointer;
          transition: all ${styles.animation.duration} ${styles.animation.spring};
          color: ${styles.colors.gray};
          font-weight: 600;
          border-radius: 12px;
          position: relative;
          overflow: hidden;
        `,
        onclick: () => this.showPage(item.id)
      });

      menuItem.innerHTML = `
        <div style="
          width: 42px;
          height: 42px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          transition: all ${styles.animation.duration};
          background: #f3f4f6;
          color: ${styles.colors.gray};
        " class="menu-icon">
          <i class="${item.icon}"></i>
        </div>
        <span style="flex: 1; font-size: 15px;">${item.label}</span>
        <i class="fas fa-chevron-right" style="font-size: 12px; opacity: 0; transition: all ${styles.animation.duration};"></i>
      `;

      menuItem.addEventListener('mouseenter', () => {
        if (this.currentPage !== item.id) {
          menuItem.style.background = '#f9fafb';
          menuItem.style.transform = 'translateX(4px)';
          const chevron = menuItem.querySelector('.fa-chevron-right') as HTMLElement;
          if (chevron) chevron.style.opacity = '0.5';
        }
      });

      menuItem.addEventListener('mouseleave', () => {
        if (this.currentPage !== item.id) {
          menuItem.style.background = 'transparent';
          menuItem.style.transform = 'translateX(0)';
          const chevron = menuItem.querySelector('.fa-chevron-right') as HTMLElement;
          if (chevron) chevron.style.opacity = '0';
        }
      });

      sidebar.appendChild(menuItem);
    });

    return sidebar;
  }

  private showPage(pageId: string): void {
    this.currentPage = pageId;
    
    const menuItems = [
      { id: 'dashboard', gradient: styles.colors.gradients.primary },
      { id: 'users', gradient: styles.colors.gradients.purple },
      { id: 'umkm', gradient: styles.colors.gradients.success },
      { id: 'ternak', gradient: styles.colors.gradients.orange },
      { id: 'pelatihan', gradient: styles.colors.gradients.pink },
      { id: 'pembiayaan', gradient: styles.colors.gradients.cyan }
    ];
    
    // Update active menu
    const allMenuItems = document.querySelectorAll('[id^="menu-"]');
    allMenuItems.forEach(item => {
      const el = item as HTMLElement;
      el.style.background = 'transparent';
      el.style.color = styles.colors.gray;
      el.style.transform = 'translateX(0)';
      const icon = el.querySelector('.menu-icon') as HTMLElement;
      if (icon) {
        icon.style.background = '#f3f4f6';
        icon.style.color = styles.colors.gray;
      }
      const chevron = el.querySelector('.fa-chevron-right') as HTMLElement;
      if (chevron) chevron.style.opacity = '0';
    });
    
    const activeMenuItem = menuItems.find(m => m.id === pageId);
    const activeMenu = document.getElementById(`menu-${pageId}`);
    if (activeMenu && activeMenuItem) {
      activeMenu.style.background = `linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)`;
      activeMenu.style.color = styles.colors.primary;
      activeMenu.style.transform = 'translateX(4px)';
      const icon = activeMenu.querySelector('.menu-icon') as HTMLElement;
      if (icon) {
        icon.style.background = activeMenuItem.gradient;
        icon.style.color = 'white';
        icon.style.boxShadow = styles.shadows.md;
      }
      const chevron = activeMenu.querySelector('.fa-chevron-right') as HTMLElement;
      if (chevron) chevron.style.opacity = '1';
    }

    // Load page content
    if (this.contentArea) {
      clearContainer(this.contentArea);
      switch(pageId) {
        case 'dashboard':
          this.contentArea.appendChild(this.createDashboardPage());
          break;
        case 'users':
          this.contentArea.appendChild(this.createUsersPage());
          break;
        case 'umkm':
          this.contentArea.appendChild(this.createUMKMPage());
          break;
        case 'ternak':
          this.contentArea.appendChild(this.createTernakPage());
          break;
        case 'pelatihan':
          this.contentArea.appendChild(this.createPelatihanPage());
          break;
        case 'pembiayaan':
          this.contentArea.appendChild(this.createPembiayaanPage());
          break;
      }
    }
  }

  private async loadStats(): Promise<void> {
    try {
      const users = await userService.getAllUsers();
      this.stats.users = users.length;
      // TODO: Load other stats from API
      this.stats.umkm = 2;
      this.stats.ternak = 3;
      this.stats.pembiayaan = 1;
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  }

  private createDashboardPage(): HTMLElement {
    const page = createElement('div');

    const header = createElement('div', {
      innerHTML: `
        <h2 style="color: ${styles.colors.dark}; font-size: 20px; font-weight: 800; margin-bottom: 3px;">
          Dashboard Overview 
        </h2>
        <p style="color: ${styles.colors.gray}; font-size: 12px;">
          <i class="far fa-clock"></i> ${new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      `,
      style: 'margin-bottom: 12px;'
    });

    // Stats Cards Grid
    const statsGrid = createElement('div', {
      style: `
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 16px;
        margin-bottom: 24px;
      `
    });

    const statsCards = [
      { icon: 'fa-users', label: 'Total Users', value: this.stats.users, gradient: styles.colors.gradients.purple, iconBg: 'rgba(139, 92, 246, 0.1)', trend: '+12%' },
      { icon: 'fa-store', label: 'Total UMKM', value: this.stats.umkm, gradient: styles.colors.gradients.success, iconBg: 'rgba(16, 185, 129, 0.1)', trend: '+8%' },
      { icon: 'fa-cow', label: 'Total Ternak', value: this.stats.ternak, gradient: styles.colors.gradients.warning, iconBg: 'rgba(245, 158, 11, 0.1)', trend: '+15%' },
      { icon: 'fa-money-bill-wave', label: 'Pembiayaan Aktif', value: this.stats.pembiayaan, gradient: styles.colors.gradients.cyan, iconBg: 'rgba(6, 182, 212, 0.1)', trend: '+5%' }
    ];

    statsCards.forEach(stat => {
      const card = createElement('div', {
        style: `
          background: white;
          border-radius: 14px;
          padding: 16px;
          box-shadow: ${styles.shadows.sm};
          transition: all ${styles.animation.duration} ${styles.animation.spring};
          cursor: pointer;
          border: 1px solid rgba(0,0,0,0.05);
          position: relative;
          overflow: hidden;
        `
      });

      card.innerHTML = `
        <div style="position: absolute; top: -12px; right: -12px; width: 70px; height: 70px; background: ${stat.iconBg}; border-radius: 50%; opacity: 0.5;"></div>
        <div style="position: relative; z-index: 1;">
          <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 12px;">
            <div style="
              width: 42px;
              height: 42px;
              border-radius: 10px;
              background: ${stat.gradient};
              display: flex;
              align-items: center;
              justify-content: center;
              color: white;
              font-size: 20px;
              box-shadow: ${styles.shadows.md};
            ">
              <i class="fas ${stat.icon}"></i>
            </div>
            <div style="
              background: rgba(16, 185, 129, 0.1);
              color: #059669;
              padding: 4px 8px;
              border-radius: 50px;
              font-size: 10px;
              font-weight: 700;
            ">
              <i class="fas fa-arrow-up" style="font-size: 9px;"></i> ${stat.trend}
            </div>
          </div>
          <div>
            <div style="color: ${styles.colors.gray}; font-size: 11px; font-weight: 600; margin-bottom: 5px; text-transform: uppercase; letter-spacing: 0.4px;">
              ${stat.label}
            </div>
            <div style="color: ${styles.colors.dark}; font-size: 24px; font-weight: 800; line-height: 1;">
              ${stat.value}
            </div>
          </div>
        </div>
      `;

      card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-6px) scale(1.02)';
        card.style.boxShadow = styles.shadows.lg;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
        card.style.boxShadow = styles.shadows.sm;
      });

      statsGrid.appendChild(card);
    });

    // Quick Actions
    const quickActionsSection = createElement('div', {
      style: 'margin-top: 20px;'
    });

    const quickActionsHeader = createElement('div', {
      innerHTML: `
        <h3 style="color: ${styles.colors.dark}; font-size: 18px; font-weight: 700; margin-bottom: 4px;">Quick Actions</h3>
        <p style="color: ${styles.colors.gray}; font-size: 13px; margin-bottom: 14px;">Akses cepat ke fitur-fitur utama</p>
      `
    });

    const actionsGrid = createElement('div', {
      style: `
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 16px;
      `
    });

    const actions = [
      { icon: 'fa-user-plus', label: 'Tambah User', gradient: styles.colors.gradients.purple, onClick: () => this.showPage('users') },
      { icon: 'fa-store', label: 'Daftar UMKM', gradient: styles.colors.gradients.success, onClick: () => this.showPage('umkm') },
      { icon: 'fa-plus-circle', label: 'Tambah Ternak', gradient: styles.colors.gradients.warning, onClick: () => this.showPage('ternak') },
      { icon: 'fa-file-invoice-dollar', label: 'Ajukan Pembiayaan', gradient: styles.colors.gradients.cyan, onClick: () => this.showPage('pembiayaan') }
    ];

    actions.forEach(action => {
      const btn = createElement('button', {
        style: `
          background: white;
          border: 2px solid #f3f4f6;
          padding: 16px;
          border-radius: 14px;
          cursor: pointer;
          transition: all ${styles.animation.duration} ${styles.animation.spring};
          text-align: left;
          position: relative;
          overflow: hidden;
        `,
        onclick: action.onClick
      });

      btn.innerHTML = `
        <div style="position: relative; z-index: 1;">
          <div style="
            width: 42px;
            height: 42px;
            border-radius: 10px;
            background: ${action.gradient};
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 18px;
            margin-bottom: 12px;
            box-shadow: ${styles.shadows.md};
          ">
            <i class="fas ${action.icon}"></i>
          </div>
          <div style="color: ${styles.colors.dark}; font-weight: 700; font-size: 14px; margin-bottom: 4px;">
            ${action.label}
          </div>
          <div style="color: ${styles.colors.gray}; font-size: 12px; display: flex; align-items: center; gap: 4px;">
            Klik untuk mulai <i class="fas fa-arrow-right" style="font-size: 9px;"></i>
          </div>
        </div>
      `;

      btn.addEventListener('mouseenter', () => {
        btn.style.transform = 'translateY(-4px)';
        btn.style.boxShadow = styles.shadows.lg;
        btn.style.borderColor = '#e5e7eb';
      });

      btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translateY(0)';
        btn.style.boxShadow = 'none';
        btn.style.borderColor = '#f3f4f6';
      });

      actionsGrid.appendChild(btn);
    });

    quickActionsSection.appendChild(quickActionsHeader);
    quickActionsSection.appendChild(actionsGrid);

    page.appendChild(header);
    page.appendChild(statsGrid);
    page.appendChild(quickActionsSection);

    return page;
  }

  private createUsersPage(): HTMLElement {
    const page = createElement('div');
    const content = this.createContent();
    page.appendChild(content);
    this.loadUsers();
    return page;
  }

  private createUMKMPage(): HTMLElement {
    const page = createElement('div');
    page.innerHTML = `
      <h2 style="color: ${styles.colors.dark}; font-size: 28px; margin-bottom: 20px;">
        <i class="fas fa-store"></i> Manajemen UMKM
      </h2>
      <div style="
        background: white;
        padding: 60px;
        border-radius: 16px;
        text-align: center;
        border: 2px dashed #e5e7eb;
      ">
        <i class="fas fa-store" style="font-size: 64px; color: #d1d5db; margin-bottom: 20px;"></i>
        <h3 style="color: ${styles.colors.dark}; margin-bottom: 10px;">Fitur UMKM</h3>
        <p style="color: #6b7280;">Kelola profil usaha peternakan Anda</p>
        <button style="
          margin-top: 20px;
          background: ${styles.colors.secondary};
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 600;
        ">
          <i class="fas fa-plus"></i> Daftar UMKM Baru
        </button>
      </div>
    `;
    return page;
  }

  private createTernakPage(): HTMLElement {
    const page = createElement('div');
    page.innerHTML = `
      <h2 style="color: ${styles.colors.dark}; font-size: 28px; margin-bottom: 20px;">
        <i class="fas fa-cow"></i> Manajemen Ternak
      </h2>
      <div style="
        background: white;
        padding: 60px;
        border-radius: 16px;
        text-align: center;
        border: 2px dashed #e5e7eb;
      ">
        <i class="fas fa-cow" style="font-size: 64px; color: #d1d5db; margin-bottom: 20px;"></i>
        <h3 style="color: ${styles.colors.dark}; margin-bottom: 10px;">Inventory Ternak</h3>
        <p style="color: #6b7280;">Kelola data ternak (sapi, kambing, ayam, bebek, domba)</p>
        <button style="
          margin-top: 20px;
          background: #f59e0b;
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 600;
        ">
          <i class="fas fa-plus"></i> Tambah Ternak
        </button>
      </div>
    `;
    return page;
  }

  private createPelatihanPage(): HTMLElement {
    const page = createElement('div');
    page.innerHTML = `
      <h2 style="color: ${styles.colors.dark}; font-size: 28px; margin-bottom: 20px;">
        <i class="fas fa-graduation-cap"></i> Pelatihan & Materi
      </h2>
      <div style="
        background: white;
        padding: 60px;
        border-radius: 16px;
        text-align: center;
        border: 2px dashed #e5e7eb;
      ">
        <i class="fas fa-graduation-cap" style="font-size: 64px; color: #d1d5db; margin-bottom: 20px;"></i>
        <h3 style="color: ${styles.colors.dark}; margin-bottom: 10px;">Program Pelatihan</h3>
        <p style="color: #6b7280;">Akses pelatihan manajemen kandang, kesehatan, kewirausahaan</p>
        <button style="
          margin-top: 20px;
          background: #8B4513;
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 600;
        ">
          <i class="fas fa-play-circle"></i> Mulai Belajar
        </button>
      </div>
    `;
    return page;
  }

  private createPembiayaanPage(): HTMLElement {
    const page = createElement('div');
    page.innerHTML = `
      <h2 style="color: ${styles.colors.dark}; font-size: 28px; margin-bottom: 20px;">
        <i class="fas fa-money-bill-wave"></i> Pembiayaan UMKM
      </h2>
      <div style="
        background: white;
        padding: 60px;
        border-radius: 16px;
        text-align: center;
        border: 2px dashed #e5e7eb;
      ">
        <i class="fas fa-money-bill-wave" style="font-size: 64px; color: #d1d5db; margin-bottom: 20px;"></i>
        <h3 style="color: ${styles.colors.dark}; margin-bottom: 10px;">Ajukan Pembiayaan</h3>
        <p style="color: #6b7280;">Dapatkan modal usaha untuk pengembangan peternakan</p>
        <button style="
          margin-top: 20px;
          background: #D2691E;
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 600;
        ">
          <i class="fas fa-file-invoice-dollar"></i> Ajukan Sekarang
        </button>
      </div>
    `;
    return page;
  }

  private createContent(): HTMLElement {
    const content = createElement('div', {
      style: 'padding: 30px;'
    });

    const header = createElement('div', {
      style: 'display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; flex-wrap: wrap; gap: 15px;'
    });

    const title = createElement('h2', {
      textContent: 'Manajemen User',
      style: `color: ${styles.colors.dark}; font-size: 28px;`
    });

    const addBtn = createElement('button', {
      innerHTML: '<i class="fas fa-plus"></i> Tambah User',
      style: `
        background: ${styles.colors.secondary};
        color: white;
        border: none;
        padding: 12px 24px;
        border-radius: 8px;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 8px;
        font-weight: 600;
        transition: all ${styles.animation.duration};
      `,
      onclick: () => this.openModal()
    });

    addBtn.addEventListener('mouseenter', () => {
      addBtn.style.transform = 'translateY(-2px)';
      addBtn.style.boxShadow = '0 5px 15px rgba(16, 185, 129, 0.3)';
    });

    addBtn.addEventListener('mouseleave', () => {
      addBtn.style.transform = 'translateY(0)';
      addBtn.style.boxShadow = 'none';
    });

    header.appendChild(title);
    header.appendChild(addBtn);

    const table = this.createTable();
    
    content.appendChild(header);
    content.appendChild(table);

    return content;
  }

  private createTable(): HTMLElement {
    const tableContainer = createElement('div', {
      style: `
        background: ${styles.colors.white};
        border-radius: 12px;
        overflow: hidden;
        box-shadow: ${styles.shadows.sm};
        overflow-x: auto;
      `
    });

    const table = createElement('table', {
      style: `
        width: 100%;
        border-collapse: collapse;
        min-width: 800px;
      `
    });

    const thead = createElement('thead', {
      style: `background: ${styles.colors.light};`
    });

    const headerRow = createElement('tr');
    const headers = ['ID', 'Username', 'Email', 'Role', 'Verified', 'Created At', 'Actions'];
    
    headers.forEach(header => {
      const th = createElement('th', {
        textContent: header,
        style: `
          padding: 15px;
          text-align: left;
          color: ${styles.colors.dark};
          font-weight: 600;
          font-size: 14px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        `
      });
      headerRow.appendChild(th);
    });

    thead.appendChild(headerRow);

    const tbody = createElement('tbody', {
      id: 'userTableBody'
    });

    this.userTableBody = tbody;

    table.appendChild(thead);
    table.appendChild(tbody);
    tableContainer.appendChild(table);

    return tableContainer;
  }

  private async loadUsers(): Promise<void> {
    try {
      console.log('Loading users from API...');
      const users = await userService.getAllUsers();
      console.log('Users loaded:', users);
      this.displayUsers(users);
    } catch (error) {
      console.error('Error loading users:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      
      if (errorMessage.includes('Failed to fetch') || errorMessage.includes('NetworkError') || errorMessage.toLowerCase().includes('network')) {
        showMessage('Tidak dapat terhubung ke backend. Pastikan server backend berjalan di http://localhost:3000', 'error');
      } else if (errorMessage.includes('401') || errorMessage.includes('Unauthorized')) {
        showMessage('Session expired. Silakan login kembali', 'error');
        setTimeout(() => {
          window.location.href = '/';
        }, 2000);
      } else {
        showMessage(`Gagal memuat data user: ${errorMessage}`, 'error');
      }
      
      // Display empty state instead of just error
      if (this.userTableBody) {
        clearContainer(this.userTableBody);
        const emptyRow = createElement('tr');
        const emptyCell = createElement('td', {
          colSpan: 7,
          style: 'padding: 40px; text-align: center; color: #9ca3af;',
          innerHTML: `
            <i class="fas fa-exclamation-circle" style="font-size: 48px; margin-bottom: 16px; display: block; color: #ef4444;"></i>
            <div style="font-size: 16px; font-weight: 600; margin-bottom: 8px;">Tidak dapat memuat data</div>
            <div style="font-size: 14px; margin-bottom: 12px;">Pastikan backend server sudah berjalan di port 3000</div>
            <div style="font-size: 12px; color: #6b7280;">${errorMessage}</div>
          `
        });
        emptyRow.appendChild(emptyCell);
        this.userTableBody.appendChild(emptyRow);
      }
    }
  }

  private displayUsers(users: User[]): void {
    if (!this.userTableBody) return;
    
    clearContainer(this.userTableBody);

    users.forEach(user => {
      const tr = createElement('tr', {
        style: 'transition: background 0.2s; cursor: pointer;'
      });

      tr.addEventListener('mouseenter', () => {
        tr.style.background = '#f9fafb';
      });

      tr.addEventListener('mouseleave', () => {
        tr.style.background = 'transparent';
      });

      const cells = [
        user.id.toString(),
        user.username,
        user.email,
        this.createBadge(user.role),
        user.is_verified ? '<i class="fas fa-check-circle" style="color: #10b981;"></i>' : '<i class="fas fa-times-circle" style="color: #ef4444;"></i>',
        new Date(user.created_at).toLocaleDateString('id-ID'),
        this.createActionButtons(user.id)
      ];

      cells.forEach((content, index) => {
        const td = createElement('td', {
          style: 'padding: 15px; border-top: 1px solid #e5e7eb; color: #4b5563;'
        });
        
        if (typeof content === 'string') {
          td.innerHTML = content;
        } else {
          td.appendChild(content);
        }
        
        tr.appendChild(td);
      });

      this.userTableBody!.appendChild(tr);
    });
  }

  private createBadge(role: string): string {
    const colors: { [key: string]: { bg: string; color: string } } = {
      peternak: { bg: '#dbeafe', color: '#1e40af' },
      investor: { bg: '#d1fae5', color: '#065f46' },
      penyedia_kios: { bg: '#fef3c7', color: '#92400e' },
      admin: { bg: '#fee2e2', color: '#991b1b' }
    };

    const style = colors[role] || colors.peternak;

    return `<span style="padding: 4px 12px; border-radius: 12px; font-size: 12px; font-weight: 600; text-transform: capitalize; background: ${style.bg}; color: ${style.color};">${role}</span>`;
  }

  private createActionButtons(userId: number): HTMLElement {
    const container = createElement('div', {
      style: 'display: flex; gap: 8px;'
    });

    const editBtn = createElement('button', {
      innerHTML: '<i class="fas fa-edit"></i>',
      style: `
        width: 36px;
        height: 36px;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        background: #dbeafe;
        color: ${styles.colors.primary};
        transition: all 0.2s;
      `,
      onclick: () => this.editUser(userId)
    });

    editBtn.addEventListener('mouseenter', () => {
      editBtn.style.background = styles.colors.primary;
      editBtn.style.color = 'white';
    });

    editBtn.addEventListener('mouseleave', () => {
      editBtn.style.background = '#dbeafe';
      editBtn.style.color = styles.colors.primary;
    });

    const deleteBtn = createElement('button', {
      innerHTML: '<i class="fas fa-trash"></i>',
      style: `
        width: 36px;
        height: 36px;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        background: #fee2e2;
        color: ${styles.colors.danger};
        transition: all 0.2s;
      `,
      onclick: () => this.deleteUser(userId)
    });

    deleteBtn.addEventListener('mouseenter', () => {
      deleteBtn.style.background = styles.colors.danger;
      deleteBtn.style.color = 'white';
    });

    deleteBtn.addEventListener('mouseleave', () => {
      deleteBtn.style.background = '#fee2e2';
      deleteBtn.style.color = styles.colors.danger;
    });

    container.appendChild(editBtn);
    container.appendChild(deleteBtn);

    return container;
  }

  private openModal(user?: User): void {
    this.editingUserId = user?.id || null;
    
    const modal = createElement('div', {
      style: `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        backdrop-filter: blur(5px);
        animation: fadeIn 0.3s ease-out;
      `,
      onclick: (e) => {
        if (e.target === modal) this.closeModal();
      }
    });

    const modalContent = createElement('div', {
      style: `
        background: white;
        border-radius: 16px;
        width: 90%;
        max-width: 500px;
        animation: slideIn 0.3s ease-out;
      `
    });

    const modalHeader = createElement('div', {
      style: `
        padding: 20px 25px;
        border-bottom: 1px solid #e5e7eb;
        display: flex;
        justify-content: space-between;
        align-items: center;
      `
    });

    const modalTitle = createElement('h3', {
      textContent: user ? 'Edit User' : 'Tambah User',
      style: `color: ${styles.colors.dark}; font-size: 20px;`
    });

    const closeBtn = createElement('button', {
      innerHTML: '<i class="fas fa-times"></i>',
      style: `
        background: none;
        border: none;
        font-size: 24px;
        color: #9ca3af;
        cursor: pointer;
        transition: color 0.2s;
      `,
      onclick: () => this.closeModal()
    });

    closeBtn.addEventListener('mouseenter', () => {
      closeBtn.style.color = styles.colors.dark;
    });

    closeBtn.addEventListener('mouseleave', () => {
      closeBtn.style.color = '#9ca3af';
    });

    modalHeader.appendChild(modalTitle);
    modalHeader.appendChild(closeBtn);

    const form = this.createUserForm(user);

    modalContent.appendChild(modalHeader);
    modalContent.appendChild(form);

    modal.appendChild(modalContent);
    document.body.appendChild(modal);

    this.modal = modal;
  }

  private createUserForm(user?: User): HTMLElement {
    const form = createElement('form', {
      onsubmit: (e) => this.handleUserSubmit(e)
    });

    const formBody = createElement('div', {
      style: 'padding: 20px 25px;'
    });

    const fields = [
      { id: 'username', label: 'Username', type: 'text', value: user?.username || '' },
      { id: 'email', label: 'Email', type: 'email', value: user?.email || '' },
      { id: 'password', label: 'Password', type: 'password', value: '', placeholder: user ? 'Kosongkan jika tidak ingin mengubah' : 'Minimal 6 karakter', required: !user },
      { id: 'nomor_hp', label: 'Nomor HP', type: 'tel', value: user?.nomor_hp || '', placeholder: 'Contoh: 081234567890' }
    ];

    fields.forEach(field => {
      const group = createElement('div', {
        style: 'margin-bottom: 20px;'
      });

      const label = createElement('label', {
        textContent: field.label,
        style: `
          display: block;
          color: ${styles.colors.dark};
          font-weight: 600;
          margin-bottom: 8px;
          font-size: 14px;
        `
      });

      const input = createElement('input', {
        type: field.type,
        id: field.id,
        value: field.value,
        placeholder: (field as any).placeholder || '',
        required: (field as any).required !== undefined ? (field as any).required : true,
        style: `
          width: 100%;
          padding: 12px;
          border: 2px solid #e5e7eb;
          border-radius: 8px;
          font-size: 14px;
          transition: all ${styles.animation.duration};
          outline: none;
        `
      });

      input.addEventListener('focus', () => {
        input.style.borderColor = styles.colors.primary;
        input.style.boxShadow = '0 0 0 3px rgba(37, 99, 235, 0.1)';
      });

      input.addEventListener('blur', () => {
        input.style.borderColor = '#e5e7eb';
        input.style.boxShadow = 'none';
      });

      group.appendChild(label);
      group.appendChild(input);
      formBody.appendChild(group);
    });

    // Role select
    const roleGroup = createElement('div', {
      style: 'margin-bottom: 20px;'
    });

    const roleLabel = createElement('label', {
      textContent: 'Role',
      style: `
        display: block;
        color: ${styles.colors.dark};
        font-weight: 600;
        margin-bottom: 8px;
        font-size: 14px;
      `
    });

    const roleSelect = createElement('select', {
      id: 'role',
      required: true,
      style: `
        width: 100%;
        padding: 12px;
        border: 2px solid #e5e7eb;
        border-radius: 8px;
        font-size: 14px;
        transition: all ${styles.animation.duration};
        outline: none;
      `
    });

    const roles = ['peternak', 'investor', 'penyedia_kios', 'admin'];
    roles.forEach(role => {
      const option = createElement('option', {
        value: role,
        textContent: role.charAt(0).toUpperCase() + role.slice(1).replace('_', ' '),
        selected: user?.role === role
      });
      roleSelect.appendChild(option);
    });

    roleSelect.addEventListener('focus', () => {
      roleSelect.style.borderColor = styles.colors.primary;
      roleSelect.style.boxShadow = '0 0 0 3px rgba(37, 99, 235, 0.1)';
    });

    roleSelect.addEventListener('blur', () => {
      roleSelect.style.borderColor = '#e5e7eb';
      roleSelect.style.boxShadow = 'none';
    });

    roleGroup.appendChild(roleLabel);
    roleGroup.appendChild(roleSelect);
    formBody.appendChild(roleGroup);

    form.appendChild(formBody);

    // Form actions
    const actions = createElement('div', {
      style: `
        padding: 20px 25px;
        border-top: 1px solid #e5e7eb;
        display: flex;
        gap: 10px;
        justify-content: flex-end;
      `
    });

    const cancelBtn = createElement('button', {
      type: 'button',
      textContent: 'Batal',
      style: `
        padding: 10px 24px;
        border: none;
        border-radius: 8px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s;
        background: #e5e7eb;
        color: ${styles.colors.dark};
      `,
      onclick: () => this.closeModal()
    });

    cancelBtn.addEventListener('mouseenter', () => {
      cancelBtn.style.background = '#d1d5db';
    });

    cancelBtn.addEventListener('mouseleave', () => {
      cancelBtn.style.background = '#e5e7eb';
    });

    const saveBtn = createElement('button', {
      type: 'submit',
      textContent: 'Simpan',
      style: `
        padding: 10px 24px;
        border: none;
        border-radius: 8px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s;
        background: ${styles.colors.primary};
        color: white;
      `
    });

    saveBtn.addEventListener('mouseenter', () => {
      saveBtn.style.background = styles.colors.primaryDark;
    });

    saveBtn.addEventListener('mouseleave', () => {
      saveBtn.style.background = styles.colors.primary;
    });

    actions.appendChild(cancelBtn);
    actions.appendChild(saveBtn);

    form.appendChild(actions);

    return form;
  }

  private async handleUserSubmit(e: Event): Promise<void> {
    e.preventDefault();

    const username = (document.getElementById('username') as HTMLInputElement).value;
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const password = (document.getElementById('password') as HTMLInputElement).value;
    const nomor_hp = (document.getElementById('nomor_hp') as HTMLInputElement).value;
    const role = (document.getElementById('role') as HTMLSelectElement).value;

    try {
      if (this.editingUserId) {
        const updateData: any = { username, email, role };
        if (nomor_hp) updateData.nomor_hp = nomor_hp;
        if (password) updateData.password = password; // Only update if filled
        
        await userService.updateUser(this.editingUserId, updateData);
        showMessage('User berhasil diupdate!', 'success');
      } else {
        // Validasi password untuk user baru
        if (!password || password.length < 6) {
          showMessage('Password minimal 6 karakter!', 'error');
          return;
        }
        
        await userService.createUser({ 
          username, 
          email, 
          password,
          nomor_hp: nomor_hp || '0',
          role 
        } as any);
        showMessage('User berhasil ditambahkan!', 'success');
      }
      
      this.closeModal();
      await this.loadUsers();
    } catch (error) {
      showMessage((error as Error).message, 'error');
    }
  }

  private async editUser(userId: number): Promise<void> {
    try {
      const user = await userService.getUserById(userId);
      this.openModal(user);
    } catch (error) {
      showMessage('Gagal memuat data user', 'error');
    }
  }

  private async deleteUser(userId: number): Promise<void> {
    if (!confirm('Yakin ingin menghapus user ini?')) return;

    try {
      await userService.deleteUser(userId);
      showMessage('User berhasil dihapus!', 'success');
      await this.loadUsers();
    } catch (error) {
      showMessage('Gagal menghapus user', 'error');
    }
  }

  private closeModal(): void {
    if (this.modal) {
      this.modal.remove();
      this.modal = null;
    }
    this.editingUserId = null;
  }

  private handleLogout(): void {
    authService.logout();
    this.onLogout();
  }

  public onLogout: () => void = () => {};

  public getElement(): HTMLElement {
    return this.container;
  }
}
