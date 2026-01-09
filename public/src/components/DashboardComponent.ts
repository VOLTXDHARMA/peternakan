/**
 * Komponen utama dashboard aplikasi Peternakan UMKM.
 */
import { createElement, showMessage, clearContainer } from '../utils/dom.js';
import { styles } from '../styles/theme.js';
import { User } from '../types.js';
import userService from '../services/userService.js';
import umkmService, { UMKM } from '../services/umkmService.js';
import ternakService, { Ternak } from '../services/ternakService.js';
import pelatihanService, { Pelatihan } from '../services/pelatihanService.js';
import pembiayaanService, { Pembiayaan } from '../services/pembiayaanService.js';
import { materiPelatihanService, MateriPelatihan } from '../services/materiPelatihanService.js';
import { dokumenPembiayaanService, DokumenPembiayaan } from '../services/dokumenPembiayaanService.js';
import authService from '../services/authService.js';

export class DashboardComponent {
  private container: HTMLElement;
  private userTableBody: HTMLElement | null = null;
  private umkmTableBody: HTMLElement | null = null;
  private ternakTableBody: HTMLElement | null = null;

  // ========== PRODUK KIOS METHODS ========== 
  private createProdukPage(): HTMLElement {
    const page = createElement('div', {
      style: 'height: 100%; display: flex; flex-direction: column;'
    });
    const header = createElement('div', {
      style: 'display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;'
    });
    const title = createElement('h2', {
      innerHTML: '<i class="fas fa-box"></i> Manajemen Produk Kios',
      style: `color: ${styles.colors.dark}; font-size: 28px; margin: 0;`
    });
    const addButton = createElement('button', {
      innerHTML: '<i class="fas fa-plus"></i> Tambah Produk',
      style: `background: linear-gradient(135deg, #8B4513 0%, #654321 100%); color: white; border: none; padding: 12px 24px; border-radius: 8px; cursor: pointer; font-weight: 600; transition: transform 0.2s, box-shadow 0.2s;`
    });
    addButton.onclick = () => this.openProdukModal();
    header.appendChild(title);
    header.appendChild(addButton);
    page.appendChild(header);
    // Table produk (dummy)
    const table = createElement('div', { innerHTML: '<p>Daftar produk kios akan tampil di sini.</p>' });
    page.appendChild(table);
    return page;
  }

  private openProdukModal(): void {
    const modal = createElement('div', {
      style: `position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 1000;`
    });
    const modalContent = createElement('div', {
      style: `background: white; border-radius: 16px; width: 90%; max-width: 400px; padding: 32px;`
    });
    modalContent.innerHTML = `<h3 style='margin-bottom:16px;'>Tambah Produk Kios</h3>
      <form id='form-produk'>
        <div style='margin-bottom:12px;'><label>Nama Produk</label><input type='text' id='nama_produk' required style='width:100%;padding:8px;'></div>
        <div style='margin-bottom:12px;'><label>Harga</label><input type='number' id='harga_produk' required style='width:100%;padding:8px;'></div>
        <div style='margin-bottom:12px;'><label>Stok</label><input type='number' id='stok_produk' required style='width:100%;padding:8px;'></div>
        <div style='text-align:right;'><button type='submit' style='padding:8px 18px;background:#8B4513;color:white;border:none;border-radius:8px;'>Simpan</button></div>
      </form>`;
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
    const form = modalContent.querySelector('#form-produk') as HTMLFormElement;
    form.onsubmit = (e) => {
      e.preventDefault();
      // Simpan produk ke backend di sini
      document.body.removeChild(modal);
      alert('Produk berhasil ditambahkan!');
    };
    modal.onclick = (e) => { if (e.target === modal) document.body.removeChild(modal); };
  }

  // ========== TRANSAKSI KIOS METHODS ========== 
  private createTransaksiPage(): HTMLElement {
    const page = createElement('div', {
      style: 'height: 100%; display: flex; flex-direction: column;'
    });
    const header = createElement('div', {
      style: 'display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;'
    });
    const title = createElement('h2', {
      innerHTML: '<i class="fas fa-exchange-alt"></i> Manajemen Transaksi',
      style: `color: ${styles.colors.dark}; font-size: 28px; margin: 0;`
    });
    const addButton = createElement('button', {
      innerHTML: '<i class="fas fa-plus"></i> Tambah Transaksi',
      style: `background: linear-gradient(135deg, #8B4513 0%, #654321 100%); color: white; border: none; padding: 12px 24px; border-radius: 8px; cursor: pointer; font-weight: 600; transition: transform 0.2s, box-shadow 0.2s;`
    });
    addButton.onclick = () => this.openTransaksiModal();
    header.appendChild(title);
    header.appendChild(addButton);
    page.appendChild(header);
    // Table transaksi (dummy)
    const table = createElement('div', { innerHTML: '<p>Daftar transaksi kios akan tampil di sini.</p>' });
    page.appendChild(table);
    return page;
  }

  private openTransaksiModal(): void {
    const modal = createElement('div', {
      style: `position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 1000;`
    });
    const modalContent = createElement('div', {
      style: `background: white; border-radius: 16px; width: 90%; max-width: 400px; padding: 32px;`
    });
    modalContent.innerHTML = `<h3 style='margin-bottom:16px;'>Tambah Transaksi Kios</h3>
      <form id='form-transaksi'>
        <div style='margin-bottom:12px;'><label>Produk</label><input type='text' id='produk_transaksi' required style='width:100%;padding:8px;'></div>
        <div style='margin-bottom:12px;'><label>Jumlah</label><input type='number' id='jumlah_transaksi' required style='width:100%;padding:8px;'></div>
        <div style='margin-bottom:12px;'><label>Total</label><input type='number' id='total_transaksi' required style='width:100%;padding:8px;'></div>
        <div style='text-align:right;'><button type='submit' style='padding:8px 18px;background:#8B4513;color:white;border:none;border-radius:8px;'>Simpan</button></div>
      </form>`;
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
    const form = modalContent.querySelector('#form-transaksi') as HTMLFormElement;
    form.onsubmit = (e) => {
      e.preventDefault();
      // Simpan transaksi ke backend di sini
      document.body.removeChild(modal);
      alert('Transaksi berhasil ditambahkan!');
    };
    modal.onclick = (e) => { if (e.target === modal) document.body.removeChild(modal); };
  }
  private pelatihanTableBody: HTMLElement | null = null;
  private pembiayaanTableBody: HTMLElement | null = null;
  private materiPelatihanTableBody: HTMLElement | null = null;
  private dokumenPembiayaanTableBody: HTMLElement | null = null;
  private modal: HTMLElement | null = null;
  private umkmModal: HTMLElement | null = null;
  private ternakModal: HTMLElement | null = null;
  private pelatihanModal: HTMLElement | null = null;
  private pembiayaanModal: HTMLElement | null = null;
  private materiPelatihanModal: HTMLElement | null = null;
  private dokumenPembiayaanModal: HTMLElement | null = null;
  private editingUserId: number | null = null;
  private editingUmkmId: number | null = null;
  private editingTernakId: number | null = null;
  private editingPelatihanId: number | null = null;
  private editingPembiayaanId: string | null = null;
  private editingMateriPelatihanId: number | null = null;
  private editingDokumenPembiayaanId: number | null = null;
  private currentPage: string = 'dashboard';
  private contentArea: HTMLElement | null = null;
  private stats: any = { users: 0, umkm: 0, ternak: 0, pembiayaan: 0 };
  private role: string;

  constructor(role: string = 'admin') {
    this.role = role;
    this.container = this.render();
    this.loadStats();
    this.showPage('dashboard');
  }

  private render(): HTMLElement {
    const container = createElement('div', {
      className: 'dashboard-container',
      style: `
        width: 100vw;
  this.role = role; 
  this.container = this.render();
  this.loadStats();
  this.showPage('dashboard');
  }
        overflow: hidden;
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
        padding: 40px;
        overflow-y: auto;
        background: transparent;
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
        min-height: 100vh;
        background: linear-gradient(to bottom, #fff 80%, #faebd7 100%);
        border-right: 1px solid #e5e7eb;
        padding: 26px 0;
        display: flex;
        flex-direction: column;
        gap: 8px;
      `
    });

    // Menu berdasarkan role
    let menuItems: any[] = [
      { id: 'dashboard', icon: 'fas fa-chart-line', label: 'Dashboard', gradient: styles.colors.gradients.primary }
    ];
    if (this.role === 'admin') {
      menuItems = menuItems.concat([
        { id: 'users', icon: 'fas fa-users', label: 'Manajemen User', gradient: styles.colors.gradients.purple },
        { id: 'umkm', icon: 'fas fa-store', label: 'UMKM', gradient: styles.colors.gradients.success },
        { id: 'ternak', icon: 'fas fa-cow', label: 'Ternak', gradient: styles.colors.gradients.warning },
        { id: 'pelatihan', icon: 'fas fa-graduation-cap', label: 'Pelatihan', gradient: styles.colors.gradients.pink },
        { id: 'materi-pelatihan', icon: 'fas fa-book', label: 'Materi Pelatihan', gradient: styles.colors.gradients.purple },
        { id: 'pembiayaan', icon: 'fas fa-money-bill-wave', label: 'Pembiayaan', gradient: styles.colors.gradients.cyan },
        { id: 'dokumen-pembiayaan', icon: 'fas fa-file-invoice', label: 'Dokumen Pembiayaan', gradient: styles.colors.gradients.orange }
      ]);
    } else if (this.role === 'peternak') {
      menuItems = menuItems.concat([
        { id: 'umkm', icon: 'fas fa-store', label: 'UMKM Saya', gradient: styles.colors.gradients.success },
        { id: 'ternak', icon: 'fas fa-cow', label: 'Ternak Saya', gradient: styles.colors.gradients.warning },
        { id: 'pelatihan', icon: 'fas fa-graduation-cap', label: 'Pelatihan', gradient: styles.colors.gradients.pink },
        { id: 'pembiayaan', icon: 'fas fa-money-bill-wave', label: 'Pengajuan Pembiayaan', gradient: styles.colors.gradients.cyan },
        { id: 'dokumen-pembiayaan', icon: 'fas fa-file-invoice', label: 'Dokumen Pembiayaan', gradient: styles.colors.gradients.orange }
      ]);
    } else if (this.role === 'investor') {
      menuItems = menuItems.concat([
        { id: 'pembiayaan', icon: 'fas fa-money-bill-wave', label: 'Peluang Investasi', gradient: styles.colors.gradients.cyan },
        { id: 'umkm', icon: 'fas fa-store', label: 'UMKM', gradient: styles.colors.gradients.success }
      ]);
    } else if (this.role === 'penyedia_kios') {
      menuItems = menuItems.concat([
        { id: 'produk', icon: 'fas fa-box', label: 'Produk Kios', gradient: styles.colors.gradients.orange },
        { id: 'transaksi', icon: 'fas fa-exchange-alt', label: 'Transaksi', gradient: styles.colors.gradients.cyan }
      ]);
    }

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
    // ...existing code for menu highlight...
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
        case 'materi-pelatihan':
          this.contentArea.appendChild(this.createMateriPelatihanPage());
          break;
        case 'pembiayaan':
          this.contentArea.appendChild(this.createPembiayaanPage());
          break;
        case 'dokumen-pembiayaan':
          this.contentArea.appendChild(this.createDokumenPembiayaanPage());
          break;
        case 'produk':
          this.contentArea.appendChild(this.createProdukPage());
          break;
        case 'transaksi':
          this.contentArea.appendChild(this.createTransaksiPage());
          break;
      }
    }
  }

  private async loadStats(): Promise<void> {
    try {
      const users = await userService.getAllUsers();
      this.stats.users = users.length;
      
      const umkmList = await umkmService.getAllUmkm();
      this.stats.umkm = umkmList.length;
      
      const ternakList = await ternakService.getAllTernak();
      this.stats.ternak = ternakList.length;
      
      const pembiayaanList = await pembiayaanService.getAllPembiayaan();
      this.stats.pembiayaan = pembiayaanList.length;
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

    // Stats cards by role
    let statsCards: any[] = [];
    if (this.role === 'admin') {
      statsCards = [
        { icon: 'fa-users', label: 'Total Users', value: this.stats.users, gradient: styles.colors.gradients.purple, iconBg: 'rgba(139, 92, 246, 0.1)', trend: '+12%' },
        { icon: 'fa-store', label: 'Total UMKM', value: this.stats.umkm, gradient: styles.colors.gradients.success, iconBg: 'rgba(16, 185, 129, 0.1)', trend: '+8%' },
        { icon: 'fa-cow', label: 'Total Ternak', value: this.stats.ternak, gradient: styles.colors.gradients.warning, iconBg: 'rgba(245, 158, 11, 0.1)', trend: '+15%' },
        { icon: 'fa-money-bill-wave', label: 'Pembiayaan Aktif', value: this.stats.pembiayaan, gradient: styles.colors.gradients.cyan, iconBg: 'rgba(6, 182, 212, 0.1)', trend: '+5%' }
      ];
    } else if (this.role === 'peternak') {
      statsCards = [
        { icon: 'fa-store', label: 'UMKM Saya', value: this.stats.umkm, gradient: styles.colors.gradients.success, iconBg: 'rgba(16, 185, 129, 0.1)', trend: '+8%' },
        { icon: 'fa-cow', label: 'Ternak Saya', value: this.stats.ternak, gradient: styles.colors.gradients.warning, iconBg: 'rgba(245, 158, 11, 0.1)', trend: '+15%' },
        { icon: 'fa-money-bill-wave', label: 'Pembiayaan Aktif', value: this.stats.pembiayaan, gradient: styles.colors.gradients.cyan, iconBg: 'rgba(6, 182, 212, 0.1)', trend: '+5%' }
      ];
    } else if (this.role === 'investor') {
      statsCards = [
        { icon: 'fa-money-bill-wave', label: 'Peluang Investasi', value: this.stats.pembiayaan, gradient: styles.colors.gradients.cyan, iconBg: 'rgba(6, 182, 212, 0.1)', trend: '+5%' },
        { icon: 'fa-store', label: 'Total UMKM', value: this.stats.umkm, gradient: styles.colors.gradients.success, iconBg: 'rgba(16, 185, 129, 0.1)', trend: '+8%' }
      ];
    } else if (this.role === 'penyedia_kios') {
      statsCards = [
        { icon: 'fa-box', label: 'Produk Kios', value: 0, gradient: styles.colors.gradients.orange, iconBg: 'rgba(251, 191, 36, 0.1)', trend: '+0%' },
        { icon: 'fa-exchange-alt', label: 'Transaksi', value: 0, gradient: styles.colors.gradients.cyan, iconBg: 'rgba(6, 182, 212, 0.1)', trend: '+0%' }
      ];
    }

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

    // Quick actions by role
    let actions: any[] = [];
    if (this.role === 'admin') {
      actions = [
        { icon: 'fa-user-plus', label: 'Tambah User', gradient: styles.colors.gradients.purple, onClick: () => this.showPage('users') },
        { icon: 'fa-store', label: 'Daftar UMKM', gradient: styles.colors.gradients.success, onClick: () => this.showPage('umkm') },
        { icon: 'fa-plus-circle', label: 'Tambah Ternak', gradient: styles.colors.gradients.warning, onClick: () => this.showPage('ternak') },
        { icon: 'fa-file-invoice-dollar', label: 'Ajukan Pembiayaan', gradient: styles.colors.gradients.cyan, onClick: () => this.showPage('pembiayaan') }
      ];
    } else if (this.role === 'peternak') {
      actions = [
        { icon: 'fa-store', label: 'Daftar UMKM', gradient: styles.colors.gradients.success, onClick: () => this.showPage('umkm') },
        { icon: 'fa-plus-circle', label: 'Tambah Ternak', gradient: styles.colors.gradients.warning, onClick: () => this.showPage('ternak') },
        { icon: 'fa-file-invoice-dollar', label: 'Ajukan Pembiayaan', gradient: styles.colors.gradients.cyan, onClick: () => this.showPage('pembiayaan') }
      ];
    } else if (this.role === 'investor') {
      actions = [
        { icon: 'fa-money-bill-wave', label: 'Lihat Investasi', gradient: styles.colors.gradients.cyan, onClick: () => this.showPage('pembiayaan') },
        { icon: 'fa-store', label: 'Lihat UMKM', gradient: styles.colors.gradients.success, onClick: () => this.showPage('umkm') }
      ];
    } else if (this.role === 'penyedia_kios') {
      actions = [
        { icon: 'fa-box', label: 'Kelola Produk', gradient: styles.colors.gradients.orange, onClick: () => this.showPage('produk') },
        { icon: 'fa-exchange-alt', label: 'Lihat Transaksi', gradient: styles.colors.gradients.cyan, onClick: () => this.showPage('transaksi') }
      ];
    }

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
    const page = createElement('div', {
      style: 'height: 100%; display: flex; flex-direction: column;'
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
        background: linear-gradient(135deg, #8B4513 0%, #654321 100%);
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
      addBtn.style.boxShadow = '0 5px 15px rgba(139, 69, 19, 0.3)';
    });

    addBtn.addEventListener('mouseleave', () => {
      addBtn.style.transform = 'translateY(0)';
      addBtn.style.boxShadow = 'none';
    });

    header.appendChild(title);
    header.appendChild(addBtn);

    const table = this.createTable();
    
    page.appendChild(header);
    page.appendChild(table);
    
    this.loadUsers();
    return page;
  }

  private createUMKMPage(): HTMLElement {
    const page = createElement('div', {
      style: 'height: 100%; display: flex; flex-direction: column;'
    });
    
    const header = createElement('div', {
      style: 'display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; flex-wrap: wrap; gap: 15px;'
    });

    const title = createElement('h2', {
      textContent: 'Manajemen UMKM',
      style: `color: ${styles.colors.dark}; font-size: 28px;`
    });

    const addBtn = createElement('button', {
      innerHTML: '<i class="fas fa-plus"></i> Tambah UMKM',
      style: `
        background: linear-gradient(135deg, #8B4513 0%, #654321 100%);
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
      onclick: () => this.openUmkmModal()
    });

    addBtn.addEventListener('mouseenter', () => {
      addBtn.style.transform = 'translateY(-2px)';
      addBtn.style.boxShadow = '0 5px 15px rgba(139, 69, 19, 0.3)';
    });

    addBtn.addEventListener('mouseleave', () => {
      addBtn.style.transform = 'translateY(0)';
      addBtn.style.boxShadow = 'none';
    });

    header.appendChild(title);
    header.appendChild(addBtn);

    const table = this.createUmkmTable();
    
    page.appendChild(header);
    page.appendChild(table);
    
    this.loadUmkm();
    return page;
  }

  private createTernakPage(): HTMLElement {
    const page = createElement('div', {
      style: 'height: 100%; display: flex; flex-direction: column;'
    });
    
    const header = createElement('div', {
      style: 'display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;'
    });

    const title = createElement('h2', {
      innerHTML: '<i class="fas fa-cow"></i> Manajemen Ternak',
      style: `color: ${styles.colors.dark}; font-size: 28px; margin: 0;`
    });

    const addButton = createElement('button', {
      innerHTML: '<i class="fas fa-plus"></i> Tambah Ternak',
      style: `
        background: linear-gradient(135deg, #8B4513 0%, #654321 100%);
        color: white;
        border: none;
        padding: 12px 24px;
        border-radius: 8px;
        cursor: pointer;
        font-weight: 600;
        transition: transform 0.2s, box-shadow 0.2s;
      `
    });
    
    addButton.onmouseover = () => {
      addButton.style.transform = 'translateY(-2px)';
      addButton.style.boxShadow = '0 8px 16px rgba(139, 69, 19, 0.3)';
    };
    addButton.onmouseout = () => {
      addButton.style.transform = 'translateY(0)';
      addButton.style.boxShadow = 'none';
    };
    addButton.onclick = () => this.openTernakModal();

    header.appendChild(title);
    header.appendChild(addButton);
    page.appendChild(header);

    const table = this.createTernakTable();
    page.appendChild(table);

    this.loadTernak();

    return page;
  }

  private createTernakTable(): HTMLElement {
    const tableContainer = createElement('div', {
      style: `
        background: white;
        border-radius: 12px;
        box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        overflow: hidden;
        flex: 1;
        display: flex;
        flex-direction: column;
      `
    });

    const table = createElement('table', {
      style: `
        width: 100%;
        border-collapse: collapse;
        font-size: 14px;
      `
    });

    const thead = createElement('thead');
    thead.innerHTML = `
      <tr style="background: linear-gradient(135deg, #8B4513 0%, #654321 100%); color: white;">
        <th style="padding: 16px; text-align: left; font-weight: 600;">KODE TERNAK</th>
        <th style="padding: 16px; text-align: left; font-weight: 600;">UMKM</th>
        <th style="padding: 16px; text-align: left; font-weight: 600;">JENIS</th>
        <th style="padding: 16px; text-align: left; font-weight: 600;">RAS</th>
        <th style="padding: 16px; text-align: left; font-weight: 600;">KELAMIN</th>
        <th style="padding: 16px; text-align: left; font-weight: 600;">UMUR (BULAN)</th>
        <th style="padding: 16px; text-align: left; font-weight: 600;">BERAT (KG)</th>
        <th style="padding: 16px; text-align: left; font-weight: 600;">KONDISI</th>
        <th style="padding: 16px; text-align: left; font-weight: 600;">STATUS</th>
        <th style="padding: 16px; text-align: center; font-weight: 600;">ACTIONS</th>
      </tr>
    `;

    const tbody = createElement('tbody');
    this.ternakTableBody = tbody;

    table.appendChild(thead);
    table.appendChild(tbody);
    tableContainer.appendChild(table);

    return tableContainer;
  }

  private async loadTernak(): Promise<void> {
    try {
      const ternakList = await ternakService.getAllTernak();
      this.displayTernak(ternakList);
    } catch (error) {
      showMessage('Gagal memuat data ternak: Invalid token', 'error');
    }
  }

  private async displayTernak(ternakList: Ternak[]): Promise<void> {
    if (!this.ternakTableBody) return;

    clearContainer(this.ternakTableBody);

    if (ternakList.length === 0) {
      const emptyRow = createElement('tr');
      emptyRow.innerHTML = `
        <td colspan="10" style="padding: 40px; text-align: center; color: #9ca3af;">
          <i class="fas fa-inbox" style="font-size: 48px; margin-bottom: 16px; display: block;"></i>
          Belum ada data ternak
        </td>
      `;
      this.ternakTableBody.appendChild(emptyRow);
      return;
    }

    // Load UMKM data to get names
    let umkmMap = new Map<number, string>();
    try {
      const umkmList = await umkmService.getAllUmkm();
      umkmList.forEach(umkm => {
        umkmMap.set(umkm.id, umkm.nama_lengkap);
      });
    } catch (error) {
      console.error('Failed to load UMKM data:', error);
    }

    ternakList.forEach((ternak, index) => {
      const row = createElement('tr', {
        style: `
          border-bottom: 1px solid #f3f4f6;
          transition: background-color 0.2s;
          background: ${index % 2 === 0 ? 'white' : '#fafafa'};
        `
      });

      row.onmouseover = () => row.style.background = '#fef3c7';
      row.onmouseout = () => row.style.background = index % 2 === 0 ? 'white' : '#fafafa';

      const kondisiBadge = this.createTernakKondisiBadge(ternak.kondisi);
      const statusBadge = this.createTernakStatusBadge(ternak.status);
      const umkmName = ternak.umkm_id ? umkmMap.get(ternak.umkm_id) || '-' : '-';

      row.innerHTML = `
        <td style="padding: 16px; font-weight: 600; color: #374151;">${ternak.kode_ternak}</td>
        <td style="padding: 16px; color: #6b7280;">
          ${umkmName !== '-' 
            ? `<span style="background: #fef3c7; color: #92400e; padding: 4px 8px; border-radius: 4px; font-size: 12px; font-weight: 600;">
                <i class="fas fa-store"></i> ${umkmName}
              </span>` 
            : '-'}
        </td>
        <td style="padding: 16px; color: #6b7280;">${ternak.jenis_ternak}</td>
        <td style="padding: 16px; color: #6b7280;">${ternak.ras || '-'}</td>
        <td style="padding: 16px; color: #6b7280;">
          <i class="fas fa-${ternak.jenis_kelamin === 'jantan' ? 'mars' : 'venus'}" style="color: ${ternak.jenis_kelamin === 'jantan' ? '#3b82f6' : '#ec4899'};"></i>
          ${ternak.jenis_kelamin}
        </td>
        <td style="padding: 16px; color: #6b7280;">${ternak.umur_bulan || '-'}</td>
        <td style="padding: 16px; color: #6b7280;">${ternak.berat_sekarang || ternak.berat_awal || '-'}</td>
        <td style="padding: 16px;">${kondisiBadge}</td>
        <td style="padding: 16px;">${statusBadge}</td>
      `;

      const actionsCell = createElement('td', {
        style: 'padding: 16px; text-align: center;'
      });

      const actionsContainer = this.createTernakActionButtons(ternak);
      actionsCell.appendChild(actionsContainer);
      row.appendChild(actionsCell);

      this.ternakTableBody!.appendChild(row);
    });
  }

  private createTernakKondisiBadge(kondisi: string): string {
    const badges: { [key: string]: { color: string; bg: string; icon: string } } = {
      'sehat': { color: '#10b981', bg: '#d1fae5', icon: 'check-circle' },
      'sakit': { color: '#ef4444', bg: '#fee2e2', icon: 'exclamation-circle' },
      'karantina': { color: '#f59e0b', bg: '#fef3c7', icon: 'shield-alt' },
      'mati': { color: '#6b7280', bg: '#f3f4f6', icon: 'times-circle' }
    };

    const badge = badges[kondisi] || badges['sehat'];
    return `<span style="
      background: ${badge.bg};
      color: ${badge.color};
      padding: 6px 12px;
      border-radius: 6px;
      font-size: 12px;
      font-weight: 600;
      display: inline-block;
    ">
      <i class="fas fa-${badge.icon}"></i> ${kondisi}
    </span>`;
  }

  private createTernakStatusBadge(status: string): string {
    const badges: { [key: string]: { color: string; bg: string; icon: string } } = {
      'aktif': { color: '#10b981', bg: '#d1fae5', icon: 'check-circle' },
      'dijual': { color: '#3b82f6', bg: '#dbeafe', icon: 'money-bill-wave' },
      'mati': { color: '#6b7280', bg: '#f3f4f6', icon: 'times-circle' }
    };

    const badge = badges[status] || badges['aktif'];
    return `<span style="
      background: ${badge.bg};
      color: ${badge.color};
      padding: 6px 12px;
      border-radius: 6px;
      font-size: 12px;
      font-weight: 600;
      display: inline-block;
    ">
      <i class="fas fa-${badge.icon}"></i> ${status}
    </span>`;
  }

  private createTernakActionButtons(ternak: Ternak): HTMLElement {
    const container = createElement('div', {
      style: 'display: flex; gap: 8px; justify-content: center;'
    });

    const editBtn = createElement('button', {
      innerHTML: '<i class="fas fa-edit"></i>',
      style: `
        background: #3b82f6;
        color: white;
        border: none;
        padding: 8px 12px;
        border-radius: 6px;
        cursor: pointer;
        transition: all 0.2s;
      `
    });
    editBtn.onmouseover = () => {
      editBtn.style.background = '#2563eb';
      editBtn.style.transform = 'translateY(-2px)';
    };
    editBtn.onmouseout = () => {
      editBtn.style.background = '#3b82f6';
      editBtn.style.transform = 'translateY(0)';
    };
    editBtn.onclick = () => this.editTernak(ternak);

    const deleteBtn = createElement('button', {
      innerHTML: '<i class="fas fa-trash"></i>',
      style: `
        background: #ef4444;
        color: white;
        border: none;
        padding: 8px 12px;
        border-radius: 6px;
        cursor: pointer;
        transition: all 0.2s;
      `
    });
    deleteBtn.onmouseover = () => {
      deleteBtn.style.background = '#dc2626';
      deleteBtn.style.transform = 'translateY(-2px)';
    };
    deleteBtn.onmouseout = () => {
      deleteBtn.style.background = '#ef4444';
      deleteBtn.style.transform = 'translateY(0)';
    };
    deleteBtn.onclick = () => this.deleteTernak(ternak.id);

    container.appendChild(editBtn);
    container.appendChild(deleteBtn);

    return container;
  }

  private async openTernakModal(ternak?: Ternak): Promise<void> {
    // Load UMKM list first
    let umkmList: UMKM[] = [];
    try {
      umkmList = await umkmService.getAllUmkm();
    } catch (error) {
      showMessage('Gagal memuat data UMKM', 'error');
    }

    const modal = createElement('div', {
      style: `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        animation: fadeIn 0.3s;
      `
    });

    const modalContent = createElement('div', {
      style: `
        background: white;
        padding: 32px;
        border-radius: 16px;
        width: 90%;
        max-width: 600px;
        max-height: 90vh;
        overflow-y: auto;
        box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04);
      `
    });

    const title = createElement('h3', {
      innerHTML: `<i class="fas fa-cow"></i> ${ternak ? 'Edit' : 'Tambah'} Ternak`,
      style: `color: ${styles.colors.dark}; margin-bottom: 24px; font-size: 24px;`
    });

    // Generate UMKM options
    const umkmOptions = umkmList.map(umkm => 
      `<option value="${umkm.id}" ${ternak?.umkm_id === umkm.id ? 'selected' : ''}>
        ${umkm.nama_lengkap} - ${umkm.jenis_peternakan_utama || 'Umum'}
      </option>`
    ).join('');

    const form = createElement('form');
    form.innerHTML = `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
        <div style="grid-column: 1 / -1;">
          <label style="display: block; margin-bottom: 8px; color: #374151; font-weight: 600;">UMKM *</label>
          <select name="umkm_id" id="umkm-select" required
            style="width: 100%; padding: 12px; border: 2px solid #e5e7eb; border-radius: 8px; font-size: 14px;">
            <option value="">Pilih UMKM</option>
            ${umkmOptions}
          </select>
          <p style="font-size: 12px; color: #6b7280; margin-top: 4px;">
            <i class="fas fa-info-circle"></i> Pilih UMKM pemilik ternak
          </p>
        </div>

        <div style="grid-column: 1 / -1;">
          <label style="display: block; margin-bottom: 8px; color: #374151; font-weight: 600;">Kode Ternak *</label>
          <input type="text" name="kode_ternak" value="${ternak?.kode_ternak || ''}" required
            style="width: 100%; padding: 12px; border: 2px solid #e5e7eb; border-radius: 8px; font-size: 14px;"
            placeholder="Contoh: TRK001">
        </div>

        <div>
          <label style="display: block; margin-bottom: 8px; color: #374151; font-weight: 600;">Jenis Ternak *</label>
          <select name="jenis_ternak" id="jenis-ternak-select" required
            style="width: 100%; padding: 12px; border: 2px solid #e5e7eb; border-radius: 8px; font-size: 14px;">
            <option value="">Pilih Jenis</option>
            <option value="sapi" ${ternak?.jenis_ternak === 'sapi' ? 'selected' : ''}>Sapi</option>
            <option value="kambing" ${ternak?.jenis_ternak === 'kambing' ? 'selected' : ''}>Kambing</option>
            <option value="ayam" ${ternak?.jenis_ternak === 'ayam' ? 'selected' : ''}>Ayam</option>
            <option value="bebek" ${ternak?.jenis_ternak === 'bebek' ? 'selected' : ''}>Bebek</option>
            <option value="domba" ${ternak?.jenis_ternak === 'domba' ? 'selected' : ''}>Domba</option>
          </select>
        </div>

        <div>
          <label style="display: block; margin-bottom: 8px; color: #374151; font-weight: 600;">Ras</label>
          <input type="text" name="ras" value="${ternak?.ras || ''}"
            style="width: 100%; padding: 12px; border: 2px solid #e5e7eb; border-radius: 8px; font-size: 14px;"
            placeholder="Contoh: Limosin">
        </div>

        <div>
          <label style="display: block; margin-bottom: 8px; color: #374151; font-weight: 600;">Jenis Kelamin *</label>
          <select name="jenis_kelamin" required
            style="width: 100%; padding: 12px; border: 2px solid #e5e7eb; border-radius: 8px; font-size: 14px;">
            <option value="">Pilih Kelamin</option>
            <option value="jantan" ${ternak?.jenis_kelamin === 'jantan' ? 'selected' : ''}>Jantan</option>
            <option value="betina" ${ternak?.jenis_kelamin === 'betina' ? 'selected' : ''}>Betina</option>
          </select>
        </div>

        <div>
          <label style="display: block; margin-bottom: 8px; color: #374151; font-weight: 600;">Tanggal Lahir</label>
          <input type="date" name="tanggal_lahir" value="${ternak?.tanggal_lahir ? ternak.tanggal_lahir.split('T')[0] : ''}"
            style="width: 100%; padding: 12px; border: 2px solid #e5e7eb; border-radius: 8px; font-size: 14px;">
        </div>

        <div>
          <label style="display: block; margin-bottom: 8px; color: #374151; font-weight: 600;">Umur (bulan)</label>
          <input type="number" name="umur_bulan" value="${ternak?.umur_bulan || ''}"
            style="width: 100%; padding: 12px; border: 2px solid #e5e7eb; border-radius: 8px; font-size: 14px;"
            placeholder="0">
        </div>

        <div>
          <label style="display: block; margin-bottom: 8px; color: #374151; font-weight: 600;">Berat Awal (kg)</label>
          <input type="number" step="0.01" name="berat_awal" value="${ternak?.berat_awal || ''}"
            style="width: 100%; padding: 12px; border: 2px solid #e5e7eb; border-radius: 8px; font-size: 14px;"
            placeholder="0.00">
        </div>

        <div>
          <label style="display: block; margin-bottom: 8px; color: #374151; font-weight: 600;">Berat Sekarang (kg)</label>
          <input type="number" step="0.01" name="berat_sekarang" value="${ternak?.berat_sekarang || ''}"
            style="width: 100%; padding: 12px; border: 2px solid #e5e7eb; border-radius: 8px; font-size: 14px;"
            placeholder="0.00">
        </div>

        <div>
          <label style="display: block; margin-bottom: 8px; color: #374151; font-weight: 600;">Kondisi *</label>
          <select name="kondisi" required
            style="width: 100%; padding: 12px; border: 2px solid #e5e7eb; border-radius: 8px; font-size: 14px;">
            <option value="">Pilih Kondisi</option>
            <option value="sehat" ${ternak?.kondisi === 'sehat' ? 'selected' : ''}>Sehat</option>
            <option value="sakit" ${ternak?.kondisi === 'sakit' ? 'selected' : ''}>Sakit</option>
            <option value="karantina" ${ternak?.kondisi === 'karantina' ? 'selected' : ''}>Karantina</option>
            <option value="mati" ${ternak?.kondisi === 'mati' ? 'selected' : ''}>Mati</option>
          </select>
        </div>

        <div>
          <label style="display: block; margin-bottom: 8px; color: #374151; font-weight: 600;">Status *</label>
          <select name="status" required
            style="width: 100%; padding: 12px; border: 2px solid #e5e7eb; border-radius: 8px; font-size: 14px;">
            <option value="">Pilih Status</option>
            <option value="aktif" ${ternak?.status === 'aktif' ? 'selected' : ''}>Aktif</option>
            <option value="dijual" ${ternak?.status === 'dijual' ? 'selected' : ''}>Dijual</option>
            <option value="mati" ${ternak?.status === 'mati' ? 'selected' : ''}>Mati</option>
          </select>
        </div>

        <div>
          <label style="display: block; margin-bottom: 8px; color: #374151; font-weight: 600;">Harga Beli</label>
          <input type="number" step="0.01" name="harga_beli" value="${ternak?.harga_beli || ''}"
            style="width: 100%; padding: 12px; border: 2px solid #e5e7eb; border-radius: 8px; font-size: 14px;"
            placeholder="0">
        </div>

        <div style="grid-column: 1 / -1;">
          <label style="display: block; margin-bottom: 8px; color: #374151; font-weight: 600;">URL Foto</label>
          <input type="text" name="foto_ternak" value="${ternak?.foto_ternak || ''}"
            style="width: 100%; padding: 12px; border: 2px solid #e5e7eb; border-radius: 8px; font-size: 14px;"
            placeholder="https://example.com/foto.jpg">
        </div>
      </div>

      <div style="display: flex; gap: 12px; margin-top: 24px;">
        <button type="submit" style="
          flex: 1;
          background: linear-gradient(135deg, #8B4513 0%, #654321 100%);
          color: white;
          border: none;
          padding: 14px;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 600;
          font-size: 16px;
        ">
          <i class="fas fa-save"></i> ${ternak ? 'Update' : 'Simpan'}
        </button>
        <button type="button" id="cancel-ternak-btn" style="
          flex: 1;
          background: #e5e7eb;
          color: #374151;
          border: none;
          padding: 14px;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 600;
          font-size: 16px;
        ">
          <i class="fas fa-times"></i> Batal
        </button>
      </div>
    `;

    form.onsubmit = (e) => {
      e.preventDefault();
      this.handleTernakSubmit(form, ternak);
    };

    const cancelBtn = form.querySelector('#cancel-ternak-btn') as HTMLButtonElement;
    if (cancelBtn) {
      cancelBtn.onclick = () => this.closeTernakModal();
    }

    modalContent.appendChild(title);
    modalContent.appendChild(form);
    modal.appendChild(modalContent);

    document.body.appendChild(modal);
    this.ternakModal = modal;

    if (ternak) {
      this.editingTernakId = ternak.id;
    }
  }

  private async handleTernakSubmit(form: HTMLFormElement, existingTernak?: Ternak): Promise<void> {
    const formData = new FormData(form);
    const data: any = {
      umkm_id: formData.get('umkm_id') ? parseInt(formData.get('umkm_id') as string) : undefined,
      kode_ternak: formData.get('kode_ternak'),
      jenis_ternak: formData.get('jenis_ternak'),
      ras: formData.get('ras') || undefined,
      jenis_kelamin: formData.get('jenis_kelamin'),
      tanggal_lahir: formData.get('tanggal_lahir') || undefined,
      umur_bulan: formData.get('umur_bulan') ? parseInt(formData.get('umur_bulan') as string) : undefined,
      berat_awal: formData.get('berat_awal') ? parseFloat(formData.get('berat_awal') as string) : undefined,
      berat_sekarang: formData.get('berat_sekarang') ? parseFloat(formData.get('berat_sekarang') as string) : undefined,
      kondisi: formData.get('kondisi'),
      harga_beli: formData.get('harga_beli') ? parseFloat(formData.get('harga_beli') as string) : undefined,
      foto_ternak: formData.get('foto_ternak') || undefined,
      status: formData.get('status')
    };

    try {
      if (existingTernak) {
        await ternakService.updateTernak(existingTernak.id, data);
        showMessage('Ternak berhasil diupdate!', 'success');
      } else {
        await ternakService.createTernak(data);
        showMessage('Ternak berhasil ditambahkan!', 'success');
      }
      this.closeTernakModal();
      await this.loadTernak();
      await this.loadStats();
    } catch (error) {
      showMessage(existingTernak ? 'Gagal update ternak' : 'Gagal menambahkan ternak', 'error');
    }
  }

  private editTernak(ternak: Ternak): void {
    this.openTernakModal(ternak);
  }

  private async deleteTernak(ternakId: number): Promise<void> {
    if (!confirm('Apakah Anda yakin ingin menghapus ternak ini?')) return;

    try {
      await ternakService.deleteTernak(ternakId);
      showMessage('Ternak berhasil dihapus!', 'success');
      await this.loadTernak();
      await this.loadStats();
    } catch (error) {
      showMessage('Gagal menghapus ternak', 'error');
    }
  }

  private closeTernakModal(): void {
    if (this.ternakModal) {
      this.ternakModal.remove();
      this.ternakModal = null;
    }
    this.editingTernakId = null;
  }

  // ========== END TERNAK METHODS ==========

  private createPelatihanPage(): HTMLElement {
    const page = createElement('div', {
      style: 'height: 100%; display: flex; flex-direction: column;'
    });
    
    const header = createElement('div', {
      style: 'display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;'
    });

    const title = createElement('h2', {
      innerHTML: '<i class="fas fa-graduation-cap"></i> Manajemen Pelatihan',
      style: `color: ${styles.colors.dark}; font-size: 28px; margin: 0;`
    });

    const addButton = createElement('button', {
      innerHTML: '<i class="fas fa-plus"></i> Tambah Pelatihan',
      style: `
        background: linear-gradient(135deg, #8B4513 0%, #654321 100%);
        color: white;
        border: none;
        padding: 12px 24px;
        border-radius: 8px;
        cursor: pointer;
        font-weight: 600;
        transition: transform 0.2s, box-shadow 0.2s;
      `
    });
    
    addButton.onmouseover = () => {
      addButton.style.transform = 'translateY(-2px)';
      addButton.style.boxShadow = '0 8px 16px rgba(139, 69, 19, 0.3)';
    };
    addButton.onmouseout = () => {
      addButton.style.transform = 'translateY(0)';
      addButton.style.boxShadow = 'none';
    };
    addButton.onclick = () => this.openPelatihanModal();

    header.appendChild(title);
    header.appendChild(addButton);
    page.appendChild(header);

    const table = this.createPelatihanTable();
    page.appendChild(table);

    this.loadPelatihan();

    return page;
  }

  private createPembiayaanPage(): HTMLElement {
    const page = createElement('div', {
      style: 'height: 100%; display: flex; flex-direction: column;'
    });
    
    const header = createElement('div', {
      style: 'display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;'
    });

    const title = createElement('h2', {
      innerHTML: '<i class="fas fa-money-bill-wave"></i> Manajemen Pembiayaan',
      style: `color: ${styles.colors.dark}; font-size: 28px; margin: 0;`
    });

    const addButton = createElement('button', {
      innerHTML: '<i class="fas fa-plus"></i> Ajukan Pembiayaan',
      style: `
        background: linear-gradient(135deg, #8B4513 0%, #654321 100%);
        color: white;
        border: none;
        padding: 12px 24px;
        border-radius: 8px;
        cursor: pointer;
        font-weight: 600;
        transition: transform 0.2s, box-shadow 0.2s;
      `
    });
    
    addButton.onmouseover = () => {
      addButton.style.transform = 'translateY(-2px)';
      addButton.style.boxShadow = '0 8px 16px rgba(139, 69, 19, 0.3)';
    };
    addButton.onmouseout = () => {
      addButton.style.transform = 'translateY(0)';
      addButton.style.boxShadow = 'none';
    };
    addButton.onclick = () => this.openPembiayaanModal();

    header.appendChild(title);
    header.appendChild(addButton);
    page.appendChild(header);

    const table = this.createPembiayaanTable();
    page.appendChild(table);

    this.loadPembiayaan();

    return page;
  }

  private createContent(): HTMLElement {
    const content = createElement('div', {
      style: 'padding: 30px; height: 100%;'
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
        background: linear-gradient(135deg, #8B4513 0%, #654321 100%);
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
      addBtn.style.boxShadow = '0 5px 15px rgba(139, 69, 19, 0.3)';
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
        background: transparent;
        border-radius: 12px;
        overflow: hidden;
        box-shadow: none;
        overflow-x: auto;
      `
    });

    const table = createElement('table', {
      style: `
        width: 100%;
        border-collapse: collapse;
        min-width: 800px;
        background: white;
        border-radius: 12px;
        overflow: hidden;
        box-shadow: ${styles.shadows.sm};
      `
    });

    const thead = createElement('thead', {
      style: `background: linear-gradient(135deg, #8B4513 0%, #654321 100%);`
    });

    const headerRow = createElement('tr');
    const headers = ['ID', 'Username', 'Email', 'Role', 'Verified', 'Created At', 'Actions'];
    
    headers.forEach(header => {
      const th = createElement('th', {
        textContent: header,
        style: `
          padding: 15px;
          text-align: left;
          color: white;
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
      peternak: { bg: '#fef3c7', color: '#92400e' },
      investor: { bg: '#fef3c7', color: '#92400e' },
      penyedia_kios: { bg: '#fef3c7', color: '#92400e' },
      admin: { bg: '#fef3c7', color: '#92400e' }
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
        background: linear-gradient(135deg, #8B4513 0%, #654321 100%);
        color: white;
      `
    });

    saveBtn.addEventListener('mouseenter', () => {
      saveBtn.style.opacity = '0.9';
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

  // ========== UMKM METHODS ==========
  
  private createUmkmTable(): HTMLElement {
    const tableContainer = createElement('div', {
      style: `
        background: transparent;
        border-radius: 12px;
        overflow: hidden;
        box-shadow: none;
        overflow-x: auto;
      `
    });

    const table = createElement('table', {
      style: `
        width: 100%;
        border-collapse: collapse;
        min-width: 800px;
        background: white;
        border-radius: 12px;
        overflow: hidden;
        box-shadow: ${styles.shadows.sm};
      `
    });

    const thead = createElement('thead', {
      style: `background: linear-gradient(135deg, #8B4513 0%, #654321 100%);`
    });

    const headerRow = createElement('tr');
    const headers = ['ID', 'Nama Lengkap', 'Jenis Usaha', 'Lokasi', 'Jenis Peternakan', 'Created At', 'Actions'];
    
    headers.forEach(header => {
      const th = createElement('th', {
        textContent: header,
        style: `
          padding: 15px;
          text-align: left;
          color: white;
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
      id: 'umkmTableBody'
    });

    this.umkmTableBody = tbody;

    table.appendChild(thead);
    table.appendChild(tbody);
    tableContainer.appendChild(table);

    return tableContainer;
  }

  private async loadUmkm(): Promise<void> {
    try {
      console.log('Loading UMKM from API...');
      const umkmList = await umkmService.getAllUmkm();
      console.log('UMKM loaded:', umkmList);
      this.displayUmkm(umkmList);
      this.stats.umkm = umkmList.length;
    } catch (error) {
      console.error('Error loading UMKM:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      
      if (errorMessage.includes('Failed to fetch') || errorMessage.includes('NetworkError')) {
        showMessage('Tidak dapat terhubung ke backend. Pastikan server backend berjalan di http://localhost:3000', 'error');
      } else if (errorMessage.includes('401') || errorMessage.includes('Unauthorized')) {
        showMessage('Session expired. Silakan login kembali', 'error');
        setTimeout(() => {
          window.location.href = '/';
        }, 2000);
      } else {
        showMessage(`Gagal memuat data UMKM: ${errorMessage}`, 'error');
      }
      
      if (this.umkmTableBody) {
        clearContainer(this.umkmTableBody);
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
        this.umkmTableBody.appendChild(emptyRow);
      }
    }
  }

  private displayUmkm(umkmList: UMKM[]): void {
    if (!this.umkmTableBody) return;
    
    clearContainer(this.umkmTableBody);

    if (umkmList.length === 0) {
      const emptyRow = createElement('tr');
      const emptyCell = createElement('td', {
        colSpan: 7,
        style: 'padding: 40px; text-align: center; color: #9ca3af;',
        innerHTML: `
          <i class="fas fa-store" style="font-size: 48px; margin-bottom: 16px; display: block;"></i>
          <div style="font-size: 16px; font-weight: 600; margin-bottom: 8px;">Belum ada data UMKM</div>
          <div style="font-size: 14px;">Klik tombol "Tambah UMKM" untuk menambah data baru</div>
        `
      });
      emptyRow.appendChild(emptyCell);
      this.umkmTableBody.appendChild(emptyRow);
      return;
    }

    umkmList.forEach(umkm => {
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
        umkm.id.toString(),
        umkm.nama_lengkap,
        this.createUmkmBadge(umkm.jenis_usaha),
        umkm.lokasi_peternakan || '-',
        umkm.jenis_peternakan_utama || '-',
        new Date(umkm.created_at).toLocaleDateString('id-ID'),
        this.createUmkmActionButtons(umkm.id)
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

      this.umkmTableBody!.appendChild(tr);
    });
  }

  private createUmkmBadge(jenisUsaha: string): string {
    const colors: Record<string, string> = {
      peternak: '#fef3c7',
      investor: '#fef3c7',
      penyedia_kios: '#fef3c7'
    };
    
    const textColors: Record<string, string> = {
      peternak: '#92400e',
      investor: '#92400e',
      penyedia_kios: '#92400e'
    };
    
    return `<span style="
      background: ${colors[jenisUsaha] || '#f3f4f6'};
      color: ${textColors[jenisUsaha] || '#4b5563'};
      padding: 4px 12px;
      border-radius: 12px;
      font-size: 12px;
      font-weight: 600;
      text-transform: capitalize;
    ">${jenisUsaha.replace('_', ' ')}</span>`;
  }

  private createUmkmActionButtons(umkmId: number): HTMLElement {
    const container = createElement('div', {
      style: 'display: flex; gap: 8px;'
    });

    const editBtn = createElement('button', {
      innerHTML: '<i class="fas fa-edit"></i>',
      style: `
        background: #dbeafe;
        color: #1e40af;
        border: none;
        padding: 8px 12px;
        border-radius: 6px;
        cursor: pointer;
        transition: all 0.2s;
      `,
      onclick: () => this.editUmkm(umkmId)
    });

    const deleteBtn = createElement('button', {
      innerHTML: '<i class="fas fa-trash"></i>',
      style: `
        background: #fee2e2;
        color: #dc2626;
        border: none;
        padding: 8px 12px;
        border-radius: 6px;
        cursor: pointer;
        transition: all 0.2s;
      `,
      onclick: () => this.deleteUmkm(umkmId)
    });

    container.appendChild(editBtn);
    container.appendChild(deleteBtn);

    return container;
  }

  private openUmkmModal(umkm?: UMKM): void {
    this.editingUmkmId = umkm?.id || null;
    
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
        animation: fadeIn 0.3s;
      `
    });

    const modalContent = createElement('div', {
      style: `
        background: white;
        padding: 30px;
        border-radius: 12px;
        width: 90%;
        max-width: 600px;
        max-height: 90vh;
        overflow-y: auto;
        animation: slideIn 0.3s;
      `
    });

    const title = createElement('h3', {
      textContent: umkm ? 'Edit UMKM' : 'Tambah UMKM',
      style: `color: ${styles.colors.dark}; margin-bottom: 20px; font-size: 24px;`
    });

    const form = createElement('form', {
      style: 'display: flex; flex-direction: column; gap: 15px;'
    });

    // Nama Lengkap
    const namaInput = createElement('input', {
      type: 'text',
      id: 'umkm-nama',
      placeholder: 'Nama Lengkap',
      value: umkm?.nama_lengkap || '',
      style: `
        padding: 12px;
        border: 1px solid #e5e7eb;
        border-radius: 8px;
        font-size: 14px;
      `
    }) as HTMLInputElement;

    // Jenis Usaha
    const jenisUsahaSelect = createElement('select', {
      id: 'umkm-jenis-usaha',
      style: `
        padding: 12px;
        border: 1px solid #e5e7eb;
        border-radius: 8px;
        font-size: 14px;
      `
    }) as HTMLSelectElement;

    jenisUsahaSelect.innerHTML = `
      <option value="">Pilih Jenis Usaha</option>
      <option value="peternak" ${umkm?.jenis_usaha === 'peternak' ? 'selected' : ''}>Peternak</option>
      <option value="investor" ${umkm?.jenis_usaha === 'investor' ? 'selected' : ''}>Investor</option>
      <option value="penyedia_kios" ${umkm?.jenis_usaha === 'penyedia_kios' ? 'selected' : ''}>Penyedia Kios</option>
    `;

    // Lokasi Peternakan
    const lokasiInput = createElement('textarea', {
      id: 'umkm-lokasi',
      placeholder: 'Lokasi Peternakan',
      value: umkm?.lokasi_peternakan || '',
      style: `
        padding: 12px;
        border: 1px solid #e5e7eb;
        border-radius: 8px;
        font-size: 14px;
        min-height: 80px;
        resize: vertical;
      `
    }) as HTMLTextAreaElement;

    // Jenis Peternakan Utama
    const jenisPeternakanInput = createElement('input', {
      type: 'text',
      id: 'umkm-jenis-peternakan',
      placeholder: 'Jenis Peternakan Utama (contoh: Sapi, Kambing, Ayam)',
      value: umkm?.jenis_peternakan_utama || '',
      style: `
        padding: 12px;
        border: 1px solid #e5e7eb;
        border-radius: 8px;
        font-size: 14px;
      `
    }) as HTMLInputElement;

    const buttonContainer = createElement('div', {
      style: 'display: flex; gap: 10px; margin-top: 10px;'
    });

    const saveBtn = createElement('button', {
      type: 'submit',
      textContent: umkm ? 'Update' : 'Simpan',
      style: `
        flex: 1;
        padding: 12px;
        background: linear-gradient(135deg, #8B4513 0%, #654321 100%);
        color: white;
        border: none;
        border-radius: 8px;
        font-weight: 600;
        cursor: pointer;
      `
    });

    const cancelBtn = createElement('button', {
      type: 'button',
      textContent: 'Batal',
      style: `
        flex: 1;
        padding: 12px;
        background: #e5e7eb;
        color: #4b5563;
        border: none;
        border-radius: 8px;
        font-weight: 600;
        cursor: pointer;
      `,
      onclick: () => this.closeUmkmModal()
    });

    buttonContainer.appendChild(saveBtn);
    buttonContainer.appendChild(cancelBtn);

    form.appendChild(namaInput);
    form.appendChild(jenisUsahaSelect);
    form.appendChild(lokasiInput);
    form.appendChild(jenisPeternakanInput);
    form.appendChild(buttonContainer);

    form.onsubmit = (e) => {
      e.preventDefault();
      this.handleUmkmSubmit();
    };

    modalContent.appendChild(title);
    modalContent.appendChild(form);
    modal.appendChild(modalContent);

    modal.onclick = (e) => {
      if (e.target === modal) this.closeUmkmModal();
    };

    document.body.appendChild(modal);
    this.umkmModal = modal;
  }

  private async handleUmkmSubmit(): Promise<void> {
    const nama = (document.getElementById('umkm-nama') as HTMLInputElement).value.trim();
    const jenisUsaha = (document.getElementById('umkm-jenis-usaha') as HTMLSelectElement).value;
    const lokasi = (document.getElementById('umkm-lokasi') as HTMLTextAreaElement).value.trim();
    const jenisPeternakan = (document.getElementById('umkm-jenis-peternakan') as HTMLInputElement).value.trim();

    if (!nama || !jenisUsaha) {
      showMessage('Nama dan Jenis Usaha wajib diisi!', 'error');
      return;
    }

    try {
      if (this.editingUmkmId) {
        await umkmService.updateUmkm(this.editingUmkmId, {
          nama_lengkap: nama,
          jenis_usaha: jenisUsaha as any,
          lokasi_peternakan: lokasi,
          jenis_peternakan_utama: jenisPeternakan
        });
        showMessage('UMKM berhasil diupdate!', 'success');
      } else {
        await umkmService.createUmkm({
          nama_lengkap: nama,
          jenis_usaha: jenisUsaha as any,
          lokasi_peternakan: lokasi,
          jenis_peternakan_utama: jenisPeternakan
        });
        showMessage('UMKM berhasil ditambahkan!', 'success');
      }
      
      this.closeUmkmModal();
      await this.loadUmkm();
    } catch (error) {
      showMessage((error as Error).message, 'error');
    }
  }

  private async editUmkm(umkmId: number): Promise<void> {
    try {
      const umkm = await umkmService.getUmkmById(umkmId);
      this.openUmkmModal(umkm);
    } catch (error) {
      showMessage('Gagal memuat data UMKM', 'error');
    }
  }

  private async deleteUmkm(umkmId: number): Promise<void> {
    if (!confirm('Yakin ingin menghapus UMKM ini?')) return;

    try {
      await umkmService.deleteUmkm(umkmId);
      showMessage('UMKM berhasil dihapus!', 'success');
      await this.loadUmkm();
    } catch (error) {
      showMessage('Gagal menghapus UMKM', 'error');
    }
  }

  private closeUmkmModal(): void {
    if (this.umkmModal) {
      this.umkmModal.remove();
      this.umkmModal = null;
    }
    this.editingUmkmId = null;
  }

  // ========== END UMKM METHODS ==========

  // ========== PELATIHAN METHODS ==========
  
  private createPelatihanTable(): HTMLElement {
    const tableContainer = createElement('div', {
      style: `
        background: white;
        border-radius: 12px;
        box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        overflow: hidden;
        flex: 1;
        display: flex;
        flex-direction: column;
      `
    });

    const table = createElement('table', {
      style: `
        width: 100%;
        border-collapse: collapse;
        font-size: 14px;
      `
    });

    const thead = createElement('thead');
    thead.innerHTML = `
      <tr style="background: linear-gradient(135deg, #8B4513 0%, #654321 100%); color: white;">
        <th style="padding: 16px; text-align: left; font-weight: 600;">JUDUL</th>
        <th style="padding: 16px; text-align: left; font-weight: 600;">KATEGORI</th>
        <th style="padding: 16px; text-align: left; font-weight: 600;">TINGKAT</th>
        <th style="padding: 16px; text-align: left; font-weight: 600;">DURASI</th>
        <th style="padding: 16px; text-align: left; font-weight: 600;">STATUS</th>
        <th style="padding: 16px; text-align: center; font-weight: 600;">ACTIONS</th>
      </tr>
    `;

    const tbody = createElement('tbody');
    this.pelatihanTableBody = tbody;

    table.appendChild(thead);
    table.appendChild(tbody);
    tableContainer.appendChild(table);

    return tableContainer;
  }

  private async loadPelatihan(): Promise<void> {
    try {
      const pelatihanList = await pelatihanService.getAllPelatihan();
      this.displayPelatihan(pelatihanList);
    } catch (error) {
      showMessage('Gagal memuat data pelatihan', 'error');
    }
  }

  private displayPelatihan(pelatihanList: Pelatihan[]): void {
    if (!this.pelatihanTableBody) return;

    clearContainer(this.pelatihanTableBody);

    if (pelatihanList.length === 0) {
      const emptyRow = createElement('tr');
      emptyRow.innerHTML = `
        <td colspan="6" style="padding: 40px; text-align: center; color: #9ca3af;">
          <i class="fas fa-inbox" style="font-size: 48px; margin-bottom: 16px; display: block;"></i>
          Belum ada data pelatihan
        </td>
      `;
      this.pelatihanTableBody.appendChild(emptyRow);
      return;
    }

    pelatihanList.forEach((pelatihan, index) => {
      const row = createElement('tr', {
        style: `
          border-bottom: 1px solid #f3f4f6;
          transition: background-color 0.2s;
          background: ${index % 2 === 0 ? 'white' : '#fafafa'};
        `
      });

      row.onmouseover = () => row.style.background = '#fef3c7';
      row.onmouseout = () => row.style.background = index % 2 === 0 ? 'white' : '#fafafa';

      row.innerHTML = `
        <td style="padding: 16px; font-weight: 600; color: #374151;">${pelatihan.judul_pelatihan}</td>
        <td style="padding: 16px; color: #6b7280;">${pelatihan.kategori}</td>
        <td style="padding: 16px; color: #6b7280;">${pelatihan.tingkat_kesulitan}</td>
        <td style="padding: 16px; color: #6b7280;">${pelatihan.durasi_menit} menit</td>
        <td style="padding: 16px;">
          <span style="background: #fef3c7; color: #92400e; padding: 6px 12px; border-radius: 6px; font-size: 12px; font-weight: 600;">
            ${pelatihan.is_published ? 'Published' : 'Draft'}
          </span>
        </td>
      `;

      const actionsCell = createElement('td', {
        style: 'padding: 16px; text-align: center;'
      });

      const actionsContainer = createElement('div', {
        style: 'display: flex; gap: 8px; justify-content: center;'
      });

      const editBtn = createElement('button', {
        innerHTML: '<i class="fas fa-edit"></i>',
        style: `
          background: #3b82f6;
          color: white;
          border: none;
          padding: 8px 12px;
          border-radius: 6px;
          cursor: pointer;
        `
      });
      editBtn.onclick = () => this.editPelatihan(pelatihan.id);

      const deleteBtn = createElement('button', {
        innerHTML: '<i class="fas fa-trash"></i>',
        style: `
          background: #ef4444;
          color: white;
          border: none;
          padding: 8px 12px;
          border-radius: 6px;
          cursor: pointer;
        `
      });
      deleteBtn.onclick = () => this.deletePelatihan(pelatihan.id);

      actionsContainer.appendChild(editBtn);
      actionsContainer.appendChild(deleteBtn);
      actionsCell.appendChild(actionsContainer);
      row.appendChild(actionsCell);

      this.pelatihanTableBody!.appendChild(row);
    });
  }

  private async openPelatihanModal(pelatihan?: Pelatihan): Promise<void> {
    const modal = createElement('div', {
      style: `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
      `
    });

    const modalContent = createElement('div', {
      style: `
        background: white;
        padding: 32px;
        border-radius: 16px;
        width: 90%;
        max-width: 600px;
        max-height: 90vh;
        overflow-y: auto;
      `
    });

    const title = createElement('h3', {
      innerHTML: `<i class="fas fa-graduation-cap"></i> ${pelatihan ? 'Edit' : 'Tambah'} Pelatihan`,
      style: `color: ${styles.colors.dark}; margin-bottom: 24px; font-size: 24px;`
    });

    const form = createElement('form');
    form.innerHTML = `
      <div style="display: grid; gap: 16px;">
        <div>
          <label style="display: block; margin-bottom: 8px; font-weight: 600;">Judul Pelatihan *</label>
          <input type="text" name="judul_pelatihan" value="${pelatihan?.judul_pelatihan || ''}" required
            style="width: 100%; padding: 12px; border: 2px solid #e5e7eb; border-radius: 8px;">
        </div>
        <div>
          <label style="display: block; margin-bottom: 8px; font-weight: 600;">Deskripsi *</label>
          <textarea name="deskripsi" required rows="3"
            style="width: 100%; padding: 12px; border: 2px solid #e5e7eb; border-radius: 8px;">${pelatihan?.deskripsi || ''}</textarea>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
          <div>
            <label style="display: block; margin-bottom: 8px; font-weight: 600;">Kategori *</label>
            <select name="kategori" required style="width: 100%; padding: 12px; border: 2px solid #e5e7eb; border-radius: 8px;">
              <option value="">Pilih Kategori</option>
              <option value="manajemen_kandang" ${pelatihan?.kategori === 'manajemen_kandang' ? 'selected' : ''}>Manajemen Kandang</option>
              <option value="kesehatan" ${pelatihan?.kategori === 'kesehatan' ? 'selected' : ''}>Kesehatan</option>
              <option value="kewirausahaan" ${pelatihan?.kategori === 'kewirausahaan' ? 'selected' : ''}>Kewirausahaan</option>
              <option value="biosecurity" ${pelatihan?.kategori === 'biosecurity' ? 'selected' : ''}>Biosecurity</option>
            </select>
          </div>
          <div>
            <label style="display: block; margin-bottom: 8px; font-weight: 600;">Tingkat *</label>
            <select name="tingkat_kesulitan" required style="width: 100%; padding: 12px; border: 2px solid #e5e7eb; border-radius: 8px;">
              <option value="">Pilih Tingkat</option>
              <option value="pemula" ${pelatihan?.tingkat_kesulitan === 'pemula' ? 'selected' : ''}>Pemula</option>
              <option value="menengah" ${pelatihan?.tingkat_kesulitan === 'menengah' ? 'selected' : ''}>Menengah</option>
              <option value="lanjutan" ${pelatihan?.tingkat_kesulitan === 'lanjutan' ? 'selected' : ''}>Lanjutan</option>
            </select>
          </div>
        </div>
        <div>
          <label style="display: block; margin-bottom: 8px; font-weight: 600;">Durasi (menit) *</label>
          <input type="number" name="durasi_menit" value="${pelatihan?.durasi_menit || ''}" required
            style="width: 100%; padding: 12px; border: 2px solid #e5e7eb; border-radius: 8px;">
        </div>
        <div>
          <label style="display: block; margin-bottom: 8px; font-weight: 600;">
            <input type="checkbox" name="is_published" ${pelatihan?.is_published ? 'checked' : ''}>
            Publikasikan
          </label>
        </div>
      </div>

      <div style="display: flex; gap: 12px; margin-top: 24px;">
        <button type="submit" style="
          flex: 1;
          background: linear-gradient(135deg, #8B4513 0%, #654321 100%);
          color: white;
          border: none;
          padding: 14px;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 600;
        ">
          <i class="fas fa-save"></i> ${pelatihan ? 'Update' : 'Simpan'}
        </button>
        <button type="button" id="cancel-btn" style="
          flex: 1;
          background: #e5e7eb;
          color: #374151;
          border: none;
          padding: 14px;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 600;
        ">
          <i class="fas fa-times"></i> Batal
        </button>
      </div>
    `;

    form.onsubmit = (e) => {
      e.preventDefault();
      this.handlePelatihanSubmit(form, pelatihan);
    };

    const cancelBtn = form.querySelector('#cancel-btn') as HTMLButtonElement;
    if (cancelBtn) {
      cancelBtn.onclick = () => this.closePelatihanModal();
    }

    modalContent.appendChild(title);
    modalContent.appendChild(form);
    modal.appendChild(modalContent);

    document.body.appendChild(modal);
    this.pelatihanModal = modal;

    if (pelatihan) {
      this.editingPelatihanId = pelatihan.id;
    }
  }

  private async handlePelatihanSubmit(form: HTMLFormElement, existingPelatihan?: Pelatihan): Promise<void> {
    const formData = new FormData(form);
    const data: any = {
      judul_pelatihan: formData.get('judul_pelatihan'),
      deskripsi: formData.get('deskripsi'),
      kategori: formData.get('kategori'),
      tingkat_kesulitan: formData.get('tingkat_kesulitan'),
      durasi_menit: parseInt(formData.get('durasi_menit') as string),
      is_published: formData.get('is_published') === 'on'
    };

    try {
      if (existingPelatihan) {
        await pelatihanService.updatePelatihan(existingPelatihan.id, data);
        showMessage('Pelatihan berhasil diupdate!', 'success');
      } else {
        await pelatihanService.createPelatihan(data);
        showMessage('Pelatihan berhasil ditambahkan!', 'success');
      }
      this.closePelatihanModal();
      await this.loadPelatihan();
    } catch (error) {
      showMessage('Gagal menyimpan pelatihan', 'error');
    }
  }

  private async editPelatihan(id: number): Promise<void> {
    try {
      const pelatihan = await pelatihanService.getPelatihanById(id);
      this.openPelatihanModal(pelatihan);
    } catch (error) {
      showMessage('Gagal memuat data pelatihan', 'error');
    }
  }

  private async deletePelatihan(id: number): Promise<void> {
    if (!confirm('Yakin ingin menghapus pelatihan ini?')) return;

    try {
      await pelatihanService.deletePelatihan(id);
      showMessage('Pelatihan berhasil dihapus!', 'success');
      await this.loadPelatihan();
    } catch (error) {
      showMessage('Gagal menghapus pelatihan', 'error');
    }
  }

  private closePelatihanModal(): void {
    if (this.pelatihanModal) {
      this.pelatihanModal.remove();
      this.pelatihanModal = null;
    }
    this.editingPelatihanId = null;
  }

  // ========== END PELATIHAN METHODS ==========

  // ========== PEMBIAYAAN METHODS ==========

  private createPembiayaanTable(): HTMLElement {
    const tableContainer = createElement('div', {
      style: `
        background: white;
        border-radius: 12px;
        box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        overflow: hidden;
        flex: 1;
        display: flex;
        flex-direction: column;
      `
    });

    const table = createElement('table', {
      style: `
        width: 100%;
        border-collapse: collapse;
        font-size: 14px;
      `
    });

    const thead = createElement('thead');
    thead.innerHTML = `
      <tr style="background: linear-gradient(135deg, #8B4513 0%, #654321 100%); color: white;">
        <th style="padding: 16px; text-align: left; font-weight: 600;">NO. PEMBIAYAAN</th>
        <th style="padding: 16px; text-align: left; font-weight: 600;">TUJUAN</th>
        <th style="padding: 16px; text-align: left; font-weight: 600;">NOMINAL</th>
        <th style="padding: 16px; text-align: left; font-weight: 600;">JANGKA WAKTU</th>
        <th style="padding: 16px; text-align: left; font-weight: 600;">STATUS</th>
        <th style="padding: 16px; text-align: center; font-weight: 600;">ACTIONS</th>
      </tr>
    `;

    const tbody = createElement('tbody');
    this.pembiayaanTableBody = tbody;

    table.appendChild(thead);
    table.appendChild(tbody);
    tableContainer.appendChild(table);

    return tableContainer;
  }

  private async loadPembiayaan(): Promise<void> {
    try {
      const pembiayaanList = await pembiayaanService.getAllPembiayaan();
      this.displayPembiayaan(pembiayaanList);
    } catch (error) {
      showMessage('Gagal memuat data pembiayaan', 'error');
    }
  }

  private displayPembiayaan(pembiayaanList: Pembiayaan[]): void {
    if (!this.pembiayaanTableBody) return;

    clearContainer(this.pembiayaanTableBody);

    if (pembiayaanList.length === 0) {
      const emptyRow = createElement('tr');
      emptyRow.innerHTML = `
        <td colspan="6" style="padding: 40px; text-align: center; color: #9ca3af;">
          <i class="fas fa-inbox" style="font-size: 48px; margin-bottom: 16px; display: block;"></i>
          Belum ada data pembiayaan
        </td>
      `;
      this.pembiayaanTableBody.appendChild(emptyRow);
      return;
    }

    pembiayaanList.forEach((pembiayaan, index) => {
      const row = createElement('tr', {
        style: `
          border-bottom: 1px solid #f3f4f6;
          transition: background-color 0.2s;
          background: ${index % 2 === 0 ? 'white' : '#fafafa'};
        `
      });

      row.onmouseover = () => row.style.background = '#fef3c7';
      row.onmouseout = () => row.style.background = index % 2 === 0 ? 'white' : '#fafafa';

      const statusColors: any = {
        draf: { bg: '#fef3c7', color: '#92400e' },
        kk: { bg: '#fef3c7', color: '#92400e' },
        surat_usaha: { bg: '#fef3c7', color: '#92400e' },
        npwp: { bg: '#fef3c7', color: '#92400e' },
        rekening_koran: { bg: '#fef3c7', color: '#92400e' }
      };
      const statusStyle = statusColors[pembiayaan.status_pengajuan] || statusColors.draf;

      row.innerHTML = `
        <td style="padding: 16px; font-weight: 600; color: #374151;">${pembiayaan.nomor_pembiayaan}</td>
        <td style="padding: 16px; color: #6b7280;">${pembiayaan.tujuan_pembiayaan.replace('_', ' ')}</td>
        <td style="padding: 16px; color: #6b7280;">Rp ${(pembiayaan.nominal_pengajuan || 0).toLocaleString('id-ID')}</td>
        <td style="padding: 16px; color: #6b7280;">${pembiayaan.jangka_waktu_bulan} bulan</td>
        <td style="padding: 16px;">
          <span style="background: ${statusStyle.bg}; color: ${statusStyle.color}; padding: 6px 12px; border-radius: 6px; font-size: 12px; font-weight: 600;">
            ${pembiayaan.status_pengajuan}
          </span>
        </td>
      `;

      const actionsCell = createElement('td', {
        style: 'padding: 16px; text-align: center;'
      });

      const actionsContainer = createElement('div', {
        style: 'display: flex; gap: 8px; justify-content: center;'
      });

      const editBtn = createElement('button', {
        innerHTML: '<i class="fas fa-edit"></i>',
        style: `
          background: #3b82f6;
          color: white;
          border: none;
          padding: 8px 12px;
          border-radius: 6px;
          cursor: pointer;
        `
      });
      editBtn.onclick = () => this.editPembiayaan(pembiayaan.id);

      const deleteBtn = createElement('button', {
        innerHTML: '<i class="fas fa-trash"></i>',
        style: `
          background: #ef4444;
          color: white;
          border: none;
          padding: 8px 12px;
          border-radius: 6px;
          cursor: pointer;
        `
      });
      deleteBtn.onclick = () => this.deletePembiayaan(pembiayaan.id);

      actionsContainer.appendChild(editBtn);
      actionsContainer.appendChild(deleteBtn);
      actionsCell.appendChild(actionsContainer);
      row.appendChild(actionsCell);

      this.pembiayaanTableBody!.appendChild(row);
    });
  }

  private async openPembiayaanModal(pembiayaan?: Pembiayaan): Promise<void> {
    const modal = createElement('div', {
      style: `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
      `
    });

    const modalContent = createElement('div', {
      style: `
        background: white;
        padding: 32px;
        border-radius: 16px;
        width: 90%;
        max-width: 600px;
        max-height: 90vh;
        overflow-y: auto;
      `
    });

    const title = createElement('h3', {
      innerHTML: `<i class="fas fa-money-bill-wave"></i> ${pembiayaan ? 'Edit' : 'Ajukan'} Pembiayaan`,
      style: `color: ${styles.colors.dark}; margin-bottom: 24px; font-size: 24px;`
    });

    const form = createElement('form');
    form.innerHTML = `
      <div style="display: grid; gap: 16px;">
        <div>
          <label style="display: block; margin-bottom: 8px; font-weight: 600;">Nomor Pembiayaan *</label>
          <input type="text" name="nomor_pembiayaan" value="${pembiayaan?.nomor_pembiayaan || 'PBY-' + Date.now()}" required
            style="width: 100%; padding: 12px; border: 2px solid #e5e7eb; border-radius: 8px;">
        </div>
        <div>
          <label style="display: block; margin-bottom: 8px; font-weight: 600;">Tujuan Pembiayaan *</label>
          <select name="tujuan_pembiayaan" required style="width: 100%; padding: 12px; border: 2px solid #e5e7eb; border-radius: 8px;">
            <option value="">Pilih Tujuan</option>
            <option value="beli_pakan" ${pembiayaan?.tujuan_pembiayaan === 'beli_pakan' ? 'selected' : ''}>Beli Pakan</option>
            <option value="beli_alat" ${pembiayaan?.tujuan_pembiayaan === 'beli_alat' ? 'selected' : ''}>Beli Alat</option>
            <option value="pengembangan_usaha" ${pembiayaan?.tujuan_pembiayaan === 'pengembangan_usaha' ? 'selected' : ''}>Pengembangan Usaha</option>
            <option value="modal_kerja" ${pembiayaan?.tujuan_pembiayaan === 'modal_kerja' ? 'selected' : ''}>Modal Kerja</option>
          </select>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
          <div>
            <label style="display: block; margin-bottom: 8px; font-weight: 600;">Nominal Pengajuan (Rp) *</label>
            <input type="number" name="nominal_pengajuan" value="${pembiayaan?.nominal_pengajuan || ''}" required
              style="width: 100%; padding: 12px; border: 2px solid #e5e7eb; border-radius: 8px;">
          </div>
          <div>
            <label style="display: block; margin-bottom: 8px; font-weight: 600;">Jangka Waktu (bulan) *</label>
            <input type="number" name="jangka_waktu_bulan" value="${pembiayaan?.jangka_waktu_bulan || ''}" required
              style="width: 100%; padding: 12px; border: 2px solid #e5e7eb; border-radius: 8px;">
          </div>
        </div>
        <div>
          <label style="display: block; margin-bottom: 8px; font-weight: 600;">Status Pengajuan *</label>
          <select name="status_pengajuan" required style="width: 100%; padding: 12px; border: 2px solid #e5e7eb; border-radius: 8px;">
            <option value="draf" ${pembiayaan?.status_pengajuan === 'draf' ? 'selected' : ''}>Draf</option>
            <option value="kk" ${pembiayaan?.status_pengajuan === 'kk' ? 'selected' : ''}>KK</option>
            <option value="surat_usaha" ${pembiayaan?.status_pengajuan === 'surat_usaha' ? 'selected' : ''}>Surat Usaha</option>
            <option value="npwp" ${pembiayaan?.status_pengajuan === 'npwp' ? 'selected' : ''}>NPWP</option>
            <option value="rekening_koran" ${pembiayaan?.status_pengajuan === 'rekening_koran' ? 'selected' : ''}>Rekening Koran</option>
          </select>
        </div>
        <div>
          <label style="display: block; margin-bottom: 8px; font-weight: 600;">Tanggal Pengajuan *</label>
          <input type="date" name="tanggal_pengajuan" value="${pembiayaan?.tanggal_pengajuan ? pembiayaan.tanggal_pengajuan.split('T')[0] : new Date().toISOString().split('T')[0]}" required
            style="width: 100%; padding: 12px; border: 2px solid #e5e7eb; border-radius: 8px;">
        </div>
        <div>
          <label style="display: block; margin-bottom: 8px; font-weight: 600;">Nama Mitra (Optional)</label>
          <input type="text" name="mitra_nama" value="${pembiayaan?.mitra_nama || ''}"
            style="width: 100%; padding: 12px; border: 2px solid #e5e7eb; border-radius: 8px;">
        </div>
      </div>

      <div style="display: flex; gap: 12px; margin-top: 24px;">
        <button type="submit" style="
          flex: 1;
          background: linear-gradient(135deg, #8B4513 0%, #654321 100%);
          color: white;
          border: none;
          padding: 14px;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 600;
        ">
          <i class="fas fa-save"></i> ${pembiayaan ? 'Update' : 'Simpan'}
        </button>
        <button type="button" id="cancel-btn" style="
          flex: 1;
          background: #e5e7eb;
          color: #374151;
          border: none;
          padding: 14px;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 600;
        ">
          <i class="fas fa-times"></i> Batal
        </button>
      </div>
    `;

    form.onsubmit = (e) => {
      e.preventDefault();
      this.handlePembiayaanSubmit(form, pembiayaan);
    };

    const cancelBtn = form.querySelector('#cancel-btn') as HTMLButtonElement;
    if (cancelBtn) {
      cancelBtn.onclick = () => this.closePembiayaanModal();
    }

    modalContent.appendChild(title);
    modalContent.appendChild(form);
    modal.appendChild(modalContent);

    document.body.appendChild(modal);
    this.pembiayaanModal = modal;

    if (pembiayaan) {
      this.editingPembiayaanId = pembiayaan.id;
    }
  }

  private async handlePembiayaanSubmit(form: HTMLFormElement, existingPembiayaan?: Pembiayaan): Promise<void> {
    const formData = new FormData(form);
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{"id":1}');
    
    const data: any = {
      nomor_pembiayaan: formData.get('nomor_pembiayaan'),
      user_id: currentUser.id || 1,
      tujuan_pembiayaan: formData.get('tujuan_pembiayaan'),
      nominal_pengajuan: parseFloat(formData.get('nominal_pengajuan') as string),
      jangka_waktu_bulan: parseInt(formData.get('jangka_waktu_bulan') as string),
      status_pengajuan: formData.get('status_pengajuan'),
      tanggal_pengajuan: formData.get('tanggal_pengajuan'),
      mitra_nama: formData.get('mitra_nama') || null
    };

    try {
      if (existingPembiayaan) {
        await pembiayaanService.updatePembiayaan(existingPembiayaan.id, data);
        showMessage('Pembiayaan berhasil diupdate!', 'success');
      } else {
        await pembiayaanService.createPembiayaan(data);
        showMessage('Pembiayaan berhasil diajukan!', 'success');
      }
      this.closePembiayaanModal();
      await this.loadPembiayaan();
      await this.loadStats();
    } catch (error) {
      showMessage('Gagal menyimpan pembiayaan', 'error');
    }
  }

  private async editPembiayaan(id: string): Promise<void> {
    try {
      const pembiayaan = await pembiayaanService.getPembiayaanById(id);
      this.openPembiayaanModal(pembiayaan);
    } catch (error) {
      showMessage('Gagal memuat data pembiayaan', 'error');
    }
  }

  private async deletePembiayaan(id: string): Promise<void> {
    if (!confirm('Yakin ingin menghapus pembiayaan ini?')) return;

    try {
      await pembiayaanService.deletePembiayaan(id);
      showMessage('Pembiayaan berhasil dihapus!', 'success');
      await this.loadPembiayaan();
      await this.loadStats();
    } catch (error) {
      showMessage('Gagal menghapus pembiayaan', 'error');
    }
  }

  private closePembiayaanModal(): void {
    if (this.pembiayaanModal) {
      this.pembiayaanModal.remove();
      this.pembiayaanModal = null;
    }
    this.editingPembiayaanId = null;
  }

  // ========== END PEMBIAYAAN METHODS ==========

  // ========== MATERI PELATIHAN METHODS ==========

  private createMateriPelatihanPage(): HTMLElement {
    const page = createElement('div');

    const header = createElement('div', {
      innerHTML: `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
          <div>
            <h2 style="color: ${styles.colors.dark}; font-size: 20px; font-weight: 800; margin: 0;">
              <i class="fas fa-book"></i> Materi Pelatihan
            </h2>
            <p style="color: ${styles.colors.gray}; font-size: 13px; margin-top: 4px;">Kelola konten materi per pelatihan</p>
          </div>
        </div>
      `
    });

    const addButton = createElement('button', {
      innerHTML: '<i class="fas fa-plus"></i> Tambah Materi',
      style: `
        padding: 10px 20px;
        background: linear-gradient(135deg, #8B4513 0%, #654321 100%);
        color: white;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        font-weight: 600;
        transition: all ${styles.animation.duration};
        box-shadow: ${styles.shadows.md};
      `,
      onclick: () => this.openMateriPelatihanModal()
    });

    addButton.addEventListener('mouseenter', () => {
      addButton.style.transform = 'translateY(-2px)';
      addButton.style.boxShadow = styles.shadows.lg;
    });

    addButton.addEventListener('mouseleave', () => {
      addButton.style.transform = 'translateY(0)';
      addButton.style.boxShadow = styles.shadows.md;
    });

    header.querySelector('div')?.appendChild(addButton);

    const tableContainer = createElement('div', {
      style: `
        background: white;
        border-radius: 12px;
        box-shadow: ${styles.shadows.md};
        overflow: hidden;
      `
    });

    const table = createElement('table', {
      style: `
        width: 100%;
        border-collapse: collapse;
      `
    });

    table.innerHTML = `
      <thead>
        <tr style="background: linear-gradient(135deg, #8B4513 0%, #654321 100%); color: white;">
          <th style="padding: 14px; text-align: left; font-weight: 600;">ID</th>
          <th style="padding: 14px; text-align: left; font-weight: 600;">Pelatihan ID</th>
          <th style="padding: 14px; text-align: left; font-weight: 600;">Urutan</th>
          <th style="padding: 14px; text-align: left; font-weight: 600;">Judul Materi</th>
          <th style="padding: 14px; text-align: left; font-weight: 600;">Tipe Konten</th>
          <th style="padding: 14px; text-align: left; font-weight: 600;">Durasi (menit)</th>
          <th style="padding: 14px; text-align: center; font-weight: 600;">Aksi</th>
        </tr>
      </thead>
      <tbody></tbody>
    `;

    this.materiPelatihanTableBody = table.querySelector('tbody');
    tableContainer.appendChild(table);

    page.appendChild(header);
    page.appendChild(tableContainer);

    this.loadMateriPelatihan();

    return page;
  }

  private async loadMateriPelatihan(): Promise<void> {
    try {
      const materiList = await materiPelatihanService.getAllMateri();

      if (!this.materiPelatihanTableBody) return;

      this.materiPelatihanTableBody.innerHTML = '';

      if (materiList.length === 0) {
        const emptyRow = createElement('tr', {
          innerHTML: `
            <td colspan="7" style="padding: 40px; text-align: center; color: ${styles.colors.gray};">
              <i class="fas fa-book" style="font-size: 48px; opacity: 0.3; margin-bottom: 12px; display: block;"></i>
              <p style="margin: 0; font-size: 14px;">Belum ada data materi pelatihan</p>
            </td>
          `
        });
        this.materiPelatihanTableBody.appendChild(emptyRow);
        return;
      }

      materiList.forEach((materi, index) => {
        const row = createElement('tr', {
          style: `
            border-bottom: 1px solid #f3f4f6;
            transition: background ${styles.animation.duration};
          `
        });

        row.innerHTML = `
          <td style="padding: 14px;">${materi.id}</td>
          <td style="padding: 14px;">${materi.pelatihan_id}</td>
          <td style="padding: 14px;"><span style="padding: 4px 12px; background: #fef3c7; color: #92400e; border-radius: 6px; font-weight: 600; font-size: 12px;">#${materi.urutan}</span></td>
          <td style="padding: 14px; font-weight: 600;">${materi.judul_materi}</td>
          <td style="padding: 14px;"><span style="padding: 4px 12px; background: #fef3c7; color: #92400e; border-radius: 6px; font-size: 12px;">${materi.tipe_konten}</span></td>
          <td style="padding: 14px;">${materi.durasi_menit || '-'}</td>
          <td style="padding: 14px; text-align: center;">
            <button class="edit-btn" data-id="${materi.id}" style="
              padding: 6px 12px;
              background: #3b82f6;
              color: white;
              border: none;
              border-radius: 6px;
              cursor: pointer;
              margin-right: 6px;
              transition: all ${styles.animation.duration};
            ">
              <i class="fas fa-edit"></i>
            </button>
            <button class="delete-btn" data-id="${materi.id}" style="
              padding: 6px 12px;
              background: #ef4444;
              color: white;
              border: none;
              border-radius: 6px;
              cursor: pointer;
              transition: all ${styles.animation.duration};
            ">
              <i class="fas fa-trash"></i>
            </button>
          </td>
        `;

        row.addEventListener('mouseenter', () => {
          row.style.background = '#f9fafb';
        });

        row.addEventListener('mouseleave', () => {
          row.style.background = 'white';
        });

        row.querySelector('.edit-btn')?.addEventListener('click', () => {
          this.openMateriPelatihanModal(materi);
        });

        row.querySelector('.delete-btn')?.addEventListener('click', () => {
          this.deleteMateriPelatihan(materi.id);
        });

        this.materiPelatihanTableBody?.appendChild(row);
      });
    } catch (error) {
      showMessage('Gagal memuat materi pelatihan', 'error');
    }
  }

  private async openMateriPelatihanModal(materi?: MateriPelatihan): Promise<void> {
    this.editingMateriPelatihanId = materi?.id || null;

    // Load list pelatihan untuk dropdown
    let pelatihanList: Pelatihan[] = [];
    try {
      pelatihanList = await pelatihanService.getAllPelatihan();
    } catch (error) {
      showMessage('Gagal memuat data pelatihan', 'error');
      return;
    }

    this.materiPelatihanModal = createElement('div', {
      style: `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
      `,
      onclick: (e) => {
        if (e.target === this.materiPelatihanModal) this.closeMateriPelatihanModal();
      }
    });

    const modalContent = createElement('div', {
      style: `
        background: white;
        padding: 28px;
        border-radius: 12px;
        width: 500px;
        max-height: 90vh;
        overflow-y: auto;
        box-shadow: ${styles.shadows.xl};
      `
    });

    // Generate pelatihan dropdown options
    const pelatihanOptions = pelatihanList.map(p => 
      `<option value="${p.id}" ${materi?.pelatihan_id === p.id ? 'selected' : ''}>${p.id} - ${p.judul_pelatihan}</option>`
    ).join('');

    modalContent.innerHTML = `
      <h3 style="margin-top: 0; color: ${styles.colors.dark}; font-weight: 700;">
        <i class="fas fa-book"></i> ${materi ? 'Edit' : 'Tambah'} Materi Pelatihan
      </h3>
      <form id="materiPelatihanForm">
        <div style="margin-bottom: 16px;">
          <label style="display: block; margin-bottom: 6px; color: ${styles.colors.dark}; font-weight: 600;">Pilih Pelatihan</label>
          <select name="pelatihan_id" required style="
            width: 100%;
            padding: 10px;
            border: 1px solid #d1d5db;
            border-radius: 8px;
            font-size: 14px;
          ">
            <option value="">-- Pilih Pelatihan --</option>
            ${pelatihanOptions}
          </select>
          <small style="color: ${styles.colors.gray}; font-size: 12px;">Pilih pelatihan untuk menambahkan materi</small>
        </div>

        <div style="margin-bottom: 16px;">
          <label style="display: block; margin-bottom: 6px; color: ${styles.colors.dark}; font-weight: 600;">Judul Materi</label>
          <input type="text" name="judul_materi" value="${materi?.judul_materi || ''}" required style="
            width: 100%;
            padding: 10px;
            border: 1px solid #d1d5db;
            border-radius: 8px;
            font-size: 14px;
          ">
        </div>

        <div style="margin-bottom: 16px;">
          <label style="display: block; margin-bottom: 6px; color: ${styles.colors.dark}; font-weight: 600;">Tipe Konten</label>
          <select name="tipe_konten" required style="
            width: 100%;
            padding: 10px;
            border: 1px solid #d1d5db;
            border-radius: 8px;
            font-size: 14px;
          ">
            <option value="">Pilih Tipe</option>
            <option value="video" ${materi?.tipe_konten === 'video' ? 'selected' : ''}>Video</option>
            <option value="dokumen" ${materi?.tipe_konten === 'dokumen' ? 'selected' : ''}>Dokumen</option>
            <option value="kuis" ${materi?.tipe_konten === 'kuis' ? 'selected' : ''}>Kuis</option>
            <option value="webinar" ${materi?.tipe_konten === 'webinar' ? 'selected' : ''}>Webinar</option>
          </select>
        </div>

        <div style="margin-bottom: 16px;">
          <label style="display: block; margin-bottom: 6px; color: ${styles.colors.dark}; font-weight: 600;">URL Konten</label>
          <input type="url" name="konten_url" value="${materi?.konten_url || ''}" style="
            width: 100%;
            padding: 10px;
            border: 1px solid #d1d5db;
            border-radius: 8px;
            font-size: 14px;
          ">
        </div>

        <div style="margin-bottom: 16px;">
          <label style="display: block; margin-bottom: 6px; color: ${styles.colors.dark}; font-weight: 600;">Durasi (menit)</label>
          <input type="number" name="durasi_menit" value="${materi?.durasi_menit || ''}" min="1" style="
            width: 100%;
            padding: 10px;
            border: 1px solid #d1d5db;
            border-radius: 8px;
            font-size: 14px;
          ">
        </div>

        <div style="margin-bottom: 16px;">
          <label style="display: block; margin-bottom: 6px; color: ${styles.colors.dark}; font-weight: 600;">Deskripsi</label>
          <textarea name="deskripsi" rows="3" style="
            width: 100%;
            padding: 10px;
            border: 1px solid #d1d5db;
            border-radius: 8px;
            font-size: 14px;
            resize: vertical;
          ">${materi?.deskripsi || ''}</textarea>
        </div>

        <div style="display: flex; gap: 12px; margin-top: 24px;">
          <button type="submit" style="
            flex: 1;
            background: linear-gradient(135deg, #8B4513 0%, #654321 100%);
            color: white;
            border: none;
            padding: 12px;
            border-radius: 8px;
            cursor: pointer;
            font-weight: 600;
          ">
            <i class="fas fa-save"></i> ${materi ? 'Update' : 'Simpan'}
          </button>
          <button type="button" id="cancelBtn" style="
            flex: 1;
            background: #6b7280;
            color: white;
            border: none;
            padding: 12px;
            border-radius: 8px;
            cursor: pointer;
            font-weight: 600;
          ">
            <i class="fas fa-times"></i> Batal
          </button>
        </div>
      </form>
    `;

    const form = modalContent.querySelector('#materiPelatihanForm') as HTMLFormElement;
    form.addEventListener('submit', (e) => this.handleMateriPelatihanSubmit(e));

    modalContent.querySelector('#cancelBtn')?.addEventListener('click', () => {
      this.closeMateriPelatihanModal();
    });

    this.materiPelatihanModal.appendChild(modalContent);
    document.body.appendChild(this.materiPelatihanModal);
  }

  private async handleMateriPelatihanSubmit(e: Event): Promise<void> {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const pelatihanId = parseInt(formData.get('pelatihan_id') as string);

    try {
      let urutan: number;

      // Jika edit, pakai urutan yang sudah ada
      if (this.editingMateriPelatihanId) {
        // Get current materi data
        const currentMateri = await materiPelatihanService.getMateriById(this.editingMateriPelatihanId);
        urutan = currentMateri.urutan;
      } else {
        // Jika tambah baru, hitung urutan otomatis
        const existingMateri = await materiPelatihanService.getMateriByPelatihan(pelatihanId);
        urutan = existingMateri.length > 0 ? Math.max(...existingMateri.map(m => m.urutan)) + 1 : 1;
      }

      const data: any = {
        pelatihan_id: pelatihanId,
        urutan: urutan,
        judul_materi: formData.get('judul_materi') as string,
        tipe_konten: formData.get('tipe_konten') as string,
        konten_url: formData.get('konten_url') as string || undefined,
        durasi_menit: formData.get('durasi_menit') ? parseInt(formData.get('durasi_menit') as string) : undefined,
        deskripsi: formData.get('deskripsi') as string || undefined
      };

      if (this.editingMateriPelatihanId) {
        await materiPelatihanService.updateMateri(this.editingMateriPelatihanId, data);
        showMessage('Materi berhasil diupdate', 'success');
      } else {
        await materiPelatihanService.createMateri(data);
        showMessage('Materi berhasil ditambahkan', 'success');
      }

      this.closeMateriPelatihanModal();
      this.loadMateriPelatihan();
    } catch (error) {
      console.error('Error saving materi:', error);
      showMessage('Gagal menyimpan materi', 'error');
    }
  }

  private async deleteMateriPelatihan(id: number): Promise<void> {
    if (!confirm('Yakin ingin menghapus materi ini?')) return;

    try {
      await materiPelatihanService.deleteMateri(id);
      showMessage('Materi berhasil dihapus', 'success');
      this.loadMateriPelatihan();
    } catch (error) {
      showMessage('Gagal menghapus materi', 'error');
    }
  }

  private closeMateriPelatihanModal(): void {
    if (this.materiPelatihanModal) {
      this.materiPelatihanModal.remove();
      this.materiPelatihanModal = null;
    }
    this.editingMateriPelatihanId = null;
  }

  // ========== END MATERI PELATIHAN METHODS ==========

  // ========== DOKUMEN PEMBIAYAAN METHODS ==========

  private createDokumenPembiayaanPage(): HTMLElement {
    const page = createElement('div');

    const header = createElement('div', {
      innerHTML: `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
          <div>
            <h2 style="color: ${styles.colors.dark}; font-size: 20px; font-weight: 800; margin: 0;">
              <i class="fas fa-file-invoice"></i> Dokumen Pembiayaan
            </h2>
            <p style="color: ${styles.colors.gray}; font-size: 13px; margin-top: 4px;">Kelola dokumen verifikasi pembiayaan</p>
          </div>
        </div>
      `
    });

    const addButton = createElement('button', {
      innerHTML: '<i class="fas fa-plus"></i> Tambah Dokumen',
      style: `
        padding: 10px 20px;
        background: linear-gradient(135deg, #8B4513 0%, #654321 100%);
        color: white;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        font-weight: 600;
        transition: all ${styles.animation.duration};
        box-shadow: ${styles.shadows.md};
      `,
      onclick: () => this.openDokumenPembiayaanModal()
    });

    addButton.addEventListener('mouseenter', () => {
      addButton.style.transform = 'translateY(-2px)';
      addButton.style.boxShadow = styles.shadows.lg;
    });

    addButton.addEventListener('mouseleave', () => {
      addButton.style.transform = 'translateY(0)';
      addButton.style.boxShadow = styles.shadows.md;
    });

    header.querySelector('div')?.appendChild(addButton);

    const tableContainer = createElement('div', {
      style: `
        background: white;
        border-radius: 12px;
        box-shadow: ${styles.shadows.md};
        overflow: hidden;
      `
    });

    const table = createElement('table', {
      style: `
        width: 100%;
        border-collapse: collapse;
      `
    });

    table.innerHTML = `
      <thead>
        <tr style="background: linear-gradient(135deg, #8B4513 0%, #654321 100%); color: white;">
          <th style="padding: 14px; text-align: left; font-weight: 600;">ID</th>
          <th style="padding: 14px; text-align: left; font-weight: 600;">Pembiayaan ID</th>
          <th style="padding: 14px; text-align: left; font-weight: 600;">Jenis Dokumen</th>
          <th style="padding: 14px; text-align: left; font-weight: 600;">Status Verifikasi</th>
          <th style="padding: 14px; text-align: left; font-weight: 600;">URL File</th>
          <th style="padding: 14px; text-align: center; font-weight: 600;">Aksi</th>
        </tr>
      </thead>
      <tbody></tbody>
    `;

    this.dokumenPembiayaanTableBody = table.querySelector('tbody');
    tableContainer.appendChild(table);

    page.appendChild(header);
    page.appendChild(tableContainer);

    this.loadDokumenPembiayaan();

    return page;
  }

  private async loadDokumenPembiayaan(): Promise<void> {
    try {
      const dokumenList = await dokumenPembiayaanService.getAllDokumen();

      if (!this.dokumenPembiayaanTableBody) return;

      this.dokumenPembiayaanTableBody.innerHTML = '';

      if (dokumenList.length === 0) {
        const emptyRow = createElement('tr', {
          innerHTML: `
            <td colspan="6" style="padding: 40px; text-align: center; color: ${styles.colors.gray};">
              <i class="fas fa-file-invoice" style="font-size: 48px; opacity: 0.3; margin-bottom: 12px; display: block;"></i>
              <p style="margin: 0; font-size: 14px;">Belum ada dokumen pembiayaan</p>
            </td>
          `
        });
        this.dokumenPembiayaanTableBody.appendChild(emptyRow);
        return;
      }

      dokumenList.forEach((dokumen) => {
        const row = createElement('tr', {
          style: `
            border-bottom: 1px solid #f3f4f6;
            transition: background ${styles.animation.duration};
          `
        });

        row.innerHTML = `
          <td style="padding: 14px;">${dokumen.id}</td>
          <td style="padding: 14px; font-family: monospace;">${dokumen.pembiayaan_id}</td>
          <td style="padding: 14px;"><span style="padding: 4px 12px; background: #fef3c7; color: #92400e; border-radius: 6px; font-size: 12px; text-transform: uppercase;">${dokumen.jenis_dokumentasi}</span></td>
          <td style="padding: 14px;"><span style="padding: 4px 12px; background: #fef3c7; color: #92400e; border-radius: 6px; font-size: 12px;">${dokumen.status_verifikasi}</span></td>
          <td style="padding: 14px;"><a href="${dokumen.url_file}" target="_blank" style="color: #3b82f6; text-decoration: none;"><i class="fas fa-external-link-alt"></i> Lihat File</a></td>
          <td style="padding: 14px; text-align: center;">
            <button class="edit-btn" data-id="${dokumen.id}" style="
              padding: 6px 12px;
              background: #3b82f6;
              color: white;
              border: none;
              border-radius: 6px;
              cursor: pointer;
              margin-right: 6px;
              transition: all ${styles.animation.duration};
            ">
              <i class="fas fa-edit"></i>
            </button>
            <button class="delete-btn" data-id="${dokumen.id}" style="
              padding: 6px 12px;
              background: #ef4444;
              color: white;
              border: none;
              border-radius: 6px;
              cursor: pointer;
              transition: all ${styles.animation.duration};
            ">
              <i class="fas fa-trash"></i>
            </button>
          </td>
        `;

        row.addEventListener('mouseenter', () => {
          row.style.background = '#f9fafb';
        });

        row.addEventListener('mouseleave', () => {
          row.style.background = 'white';
        });

        row.querySelector('.edit-btn')?.addEventListener('click', () => {
          this.openDokumenPembiayaanModal(dokumen);
        });

        row.querySelector('.delete-btn')?.addEventListener('click', () => {
          this.deleteDokumenPembiayaan(dokumen.id);
        });

        this.dokumenPembiayaanTableBody?.appendChild(row);
      });
    } catch (error) {
      showMessage('Gagal memuat dokumen pembiayaan', 'error');
    }
  }

  private async openDokumenPembiayaanModal(dokumen?: DokumenPembiayaan): Promise<void> {
    this.editingDokumenPembiayaanId = dokumen?.id || null;

    // Load list pembiayaan untuk dropdown
    let pembiayaanList: Pembiayaan[] = [];
    try {
      pembiayaanList = await pembiayaanService.getAllPembiayaan();
    } catch (error) {
      showMessage('Gagal memuat data pembiayaan', 'error');
      return;
    }

    this.dokumenPembiayaanModal = createElement('div', {
      style: `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
      `,
      onclick: (e) => {
        if (e.target === this.dokumenPembiayaanModal) this.closeDokumenPembiayaanModal();
      }
    });

    const modalContent = createElement('div', {
      style: `
        background: white;
        padding: 28px;
        border-radius: 12px;
        width: 500px;
        max-height: 90vh;
        overflow-y: auto;
        box-shadow: ${styles.shadows.xl};
      `
    });

    // Generate pembiayaan dropdown options
    const pembiayaanOptions = pembiayaanList.map(p => 
      `<option value="${p.id}" ${dokumen?.pembiayaan_id === p.id ? 'selected' : ''}>${p.nomor_pembiayaan} - Rp ${p.nominal_pengajuan?.toLocaleString('id-ID') || 0}</option>`
    ).join('');

    modalContent.innerHTML = `
      <h3 style="margin-top: 0; color: ${styles.colors.dark}; font-weight: 700;">
        <i class="fas fa-file-invoice"></i> ${dokumen ? 'Edit' : 'Tambah'} Dokumen Pembiayaan
      </h3>
      <form id="dokumenPembiayaanForm">
        <div style="margin-bottom: 16px;">
          <label style="display: block; margin-bottom: 6px; color: ${styles.colors.dark}; font-weight: 600;">Pilih Pembiayaan</label>
          <select name="pembiayaan_id" required style="
            width: 100%;
            padding: 10px;
            border: 1px solid #d1d5db;
            border-radius: 8px;
            font-size: 14px;
          ">
            <option value="">-- Pilih Pembiayaan --</option>
            ${pembiayaanOptions}
          </select>
          <small style="color: ${styles.colors.gray}; font-size: 12px;">Pilih pembiayaan untuk menambahkan dokumen</small>
        </div>

        <div style="margin-bottom: 16px;">
          <label style="display: block; margin-bottom: 6px; color: ${styles.colors.dark}; font-weight: 600;">Jenis Dokumentasi</label>
          <select name="jenis_dokumentasi" required style="
            width: 100%;
            padding: 10px;
            border: 1px solid #d1d5db;
            border-radius: 8px;
            font-size: 14px;
          ">
            <option value="">Pilih Jenis</option>
            <option value="ktp" ${dokumen?.jenis_dokumentasi === 'ktp' ? 'selected' : ''}>KTP</option>
            <option value="kk" ${dokumen?.jenis_dokumentasi === 'kk' ? 'selected' : ''}>Kartu Keluarga</option>
            <option value="surat_usaha" ${dokumen?.jenis_dokumentasi === 'surat_usaha' ? 'selected' : ''}>Surat Usaha</option>
            <option value="npwp" ${dokumen?.jenis_dokumentasi === 'npwp' ? 'selected' : ''}>NPWP</option>
            <option value="rekening_koran" ${dokumen?.jenis_dokumentasi === 'rekening_koran' ? 'selected' : ''}>Rekening Koran</option>
          </select>
        </div>

        <div style="margin-bottom: 16px;">
          <label style="display: block; margin-bottom: 6px; color: ${styles.colors.dark}; font-weight: 600;">URL File</label>
          <input type="url" name="url_file" value="${dokumen?.url_file || ''}" required style="
            width: 100%;
            padding: 10px;
            border: 1px solid #d1d5db;
            border-radius: 8px;
            font-size: 14px;
          ">
        </div>

        <div style="margin-bottom: 16px;">
          <label style="display: block; margin-bottom: 6px; color: ${styles.colors.dark}; font-weight: 600;">Status Verifikasi</label>
          <select name="status_verifikasi" required style="
            width: 100%;
            padding: 10px;
            border: 1px solid #d1d5db;
            border-radius: 8px;
            font-size: 14px;
          ">
            <option value="pending" ${!dokumen || dokumen.status_verifikasi === 'pending' ? 'selected' : ''}>Pending</option>
            <option value="diterima" ${dokumen?.status_verifikasi === 'diterima' ? 'selected' : ''}>Diterima</option>
            <option value="ditolak" ${dokumen?.status_verifikasi === 'ditolak' ? 'selected' : ''}>Ditolak</option>
          </select>
        </div>

        <div style="margin-bottom: 16px;">
          <label style="display: block; margin-bottom: 6px; color: ${styles.colors.dark}; font-weight: 600;">Catatan Verifikasi</label>
          <textarea name="catatan_verifikasi" rows="3" style="
            width: 100%;
            padding: 10px;
            border: 1px solid #d1d5db;
            border-radius: 8px;
            font-size: 14px;
            resize: vertical;
          ">${dokumen?.catatan_verifikasi || ''}</textarea>
        </div>

        <div style="display: flex; gap: 12px; margin-top: 24px;">
          <button type="submit" style="
            flex: 1;
            background: linear-gradient(135deg, #8B4513 0%, #654321 100%);
            color: white;
            border: none;
            padding: 12px;
            border-radius: 8px;
            cursor: pointer;
            font-weight: 600;
          ">
            <i class="fas fa-save"></i> ${dokumen ? 'Update' : 'Simpan'}
          </button>
          <button type="button" id="cancelBtn" style="
            flex: 1;
            background: #6b7280;
            color: white;
            border: none;
            padding: 12px;
            border-radius: 8px;
            cursor: pointer;
            font-weight: 600;
          ">
            <i class="fas fa-times"></i> Batal
          </button>
        </div>
      </form>
    `;

    const form = modalContent.querySelector('#dokumenPembiayaanForm') as HTMLFormElement;
    form.addEventListener('submit', (e) => this.handleDokumenPembiayaanSubmit(e));

    modalContent.querySelector('#cancelBtn')?.addEventListener('click', () => {
      this.closeDokumenPembiayaanModal();
    });

    this.dokumenPembiayaanModal.appendChild(modalContent);
    document.body.appendChild(this.dokumenPembiayaanModal);
  }

  private async handleDokumenPembiayaanSubmit(e: Event): Promise<void> {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const data: any = {
      pembiayaan_id: formData.get('pembiayaan_id') as string,
      jenis_dokumentasi: formData.get('jenis_dokumentasi') as string,
      url_file: formData.get('url_file') as string,
      status_verifikasi: formData.get('status_verifikasi') as string,
      catatan_verifikasi: formData.get('catatan_verifikasi') as string || undefined
    };

    try {
      if (this.editingDokumenPembiayaanId) {
        await dokumenPembiayaanService.updateDokumen(this.editingDokumenPembiayaanId, data);
        showMessage('Dokumen berhasil diupdate', 'success');
      } else {
        await dokumenPembiayaanService.createDokumen(data);
        showMessage('Dokumen berhasil ditambahkan', 'success');
      }

      this.closeDokumenPembiayaanModal();
      this.loadDokumenPembiayaan();
    } catch (error) {
      showMessage('Gagal menyimpan dokumen', 'error');
    }
  }

  private async deleteDokumenPembiayaan(id: number): Promise<void> {
    if (!confirm('Yakin ingin menghapus dokumen ini?')) return;

    try {
      await dokumenPembiayaanService.deleteDokumen(id);
      showMessage('Dokumen berhasil dihapus', 'success');
      this.loadDokumenPembiayaan();
    } catch (error) {
      showMessage('Gagal menghapus dokumen', 'error');
    }
  }

  private closeDokumenPembiayaanModal(): void {
    if (this.dokumenPembiayaanModal) {
      this.dokumenPembiayaanModal.remove();
      this.dokumenPembiayaanModal = null;
    }
    this.editingDokumenPembiayaanId = null;
  }

  // ========== END DOKUMEN PEMBIAYAAN METHODS ==========

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
