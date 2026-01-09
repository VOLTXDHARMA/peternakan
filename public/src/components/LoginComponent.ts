/**
 * Komponen halaman login aplikasi.
 * Mengelola input email dan password, serta proses autentikasi ke backend.
 * Jika login berhasil, user diarahkan ke dashboard sesuai peran.
 * Setiap bagian dan fungsi dijelaskan untuk memudahkan pemahaman.
 */
// Import fungsi helper untuk manipulasi DOM
import { createElement, showMessage } from '../utils/dom.js';
// Import theme/style untuk konsistensi desain
import { styles } from '../styles/theme.js';
// Import authService untuk proses autentikasi
import authService from '../services/authService.js';

// Class LoginComponent - Komponen untuk halaman login
// Menampilkan form login dan menangani proses autentikasi
export class LoginComponent {
  // Container utama untuk menyimpan semua elemen komponen
  private container: HTMLElement;

  // Constructor - dipanggil saat membuat instance baru
  constructor() {
    console.log('Creating LoginComponent...');
    // Render komponen dan simpan ke container
    this.container = this.render();
    console.log('LoginComponent created');
  }

  // Method untuk me-render seluruh komponen login
  // Return: HTMLElement yang berisi seluruh UI login
  private render(): HTMLElement {
    console.log('Rendering LoginComponent...');
    // Buat container utama dengan animasi fadeIn
    const container = createElement('div', {
      className: 'login-container',
      style: `
        width: 100%;
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px;
      `
    });

    // Buat wrapper untuk card dengan max-width
    const cardWrapper = createElement('div', {
      style: `
        width: 100%;
        max-width: 450px;
        animation: fadeIn 0.6s ease-out;
      `
    });

    // Buat card/kotak untuk form login dengan shadow
    const card = createElement('div', {
      className: 'login-card',
      style: `
        background: ${styles.colors.white};  /* Background putih */
        border-radius: 20px;                  /* Sudut melengkung */
        padding: 40px;                        /* Padding dalam */
        box-shadow: ${styles.shadows.lg};     /* Shadow besar untuk depth */
      `
    });

    // Header dengan logo
    const header = this.createHeader();
    card.appendChild(header);

    // Login form
    const form = this.createLoginForm();
    card.appendChild(form);

    // Footer
    const footer = this.createFooter();
    card.appendChild(footer);

    cardWrapper.appendChild(card);
    container.appendChild(cardWrapper);
    return container;
  }

  // Method untuk membuat header (logo, title, subtitle)
  // Return: HTMLElement berisi logo dan judul aplikasi
  private createHeader(): HTMLElement {
    const header = createElement('div', {
      className: 'login-header',
      style: 'text-align: center; margin-bottom: 30px;'  /* Center align dengan margin bawah */
    });

    // Logo berbentuk lingkaran dengan icon sapi
    const logo = createElement('div', {
      className: 'logo',
      innerHTML: '<i class="fas fa-cow"></i>',  /* Icon sapi dari Font Awesome */
      style: `
        width: 80px;                /* Lebar logo */
        height: 80px;               /* Tinggi logo */
        background: linear-gradient(135deg, ${styles.colors.primary}, ${styles.colors.secondary});  /* Gradient background */
        border-radius: 50%;         /* Bentuk lingkaran */
        display: flex;              /* Flexbox untuk centering */
        align-items: center;        /* Center vertical */
        justify-content: center;    /* Center horizontal */
        margin: 0 auto 20px;        /* Center dengan margin bawah */
        font-size: 40px;            /* Ukuran icon */
        color: white;               /* Warna icon putih */
      `
    });

    // Judul aplikasi
    const title = createElement('h1', {
      textContent: 'Peternakan UMKM',
      style: `color: ${styles.colors.dark}; font-size: 28px; margin-bottom: 8px;`
    });

    // Subtitle
    const subtitle = createElement('p', {
      textContent: 'Sistem Manajemen Peternakan',
      style: `color: ${styles.colors.gray}; font-size: 14px;`
    });

    // Susun header: logo, title, subtitle
    header.appendChild(logo);
    header.appendChild(title);
    header.appendChild(subtitle);

    return header;
  }

  // Method untuk membuat form login (email & password inputs)
  // Return: HTMLElement berisi form dengan input fields dan submit button
  private createLoginForm(): HTMLElement {
    // Buat form element dengan event handler untuk submit
    const form = createElement('form', {
      className: 'login-form',
      style: 'display: flex; flex-direction: column; gap: 20px;',  /* Layout vertical dengan gap */
      onsubmit: (e: Event) => this.handleSubmit(e)  /* Handler untuk submit form */
    });

    // Email input group (label + input field)
    const emailGroup = this.createInputGroup('email', 'Email', 'envelope', 'email');
    form.appendChild(emailGroup);

    // Password input
    const passwordGroup = this.createInputGroup('password', 'Password', 'lock', 'password');
    form.appendChild(passwordGroup);

    // Submit button
    const button = createElement('button', {
      type: 'submit',
      className: 'btn-login',
      innerHTML: '<span>Masuk</span><i class="fas fa-arrow-right"></i>',
      style: `
        background: linear-gradient(135deg, ${styles.colors.primary}, ${styles.colors.primaryDark});
        color: white;
        border: none;
        padding: 15px;
        border-radius: 10px;
        font-size: 16px;
        font-weight: 600;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        transition: all ${styles.animation.duration} ${styles.animation.easing};
        margin-top: 10px;
      `
    });

    button.addEventListener('mouseenter', () => {
      button.style.transform = 'translateY(-2px)';
      button.style.boxShadow = '0 10px 20px rgba(37, 99, 235, 0.3)';
    });

    button.addEventListener('mouseleave', () => {
      button.style.transform = 'translateY(0)';
      button.style.boxShadow = 'none';
    });

    form.appendChild(button);

    return form;
  }

  private createInputGroup(id: string, placeholder: string, icon: string, type: string): HTMLElement {
    const group = createElement('div', {
      className: 'input-group',
      style: 'position: relative;'
    });

    const iconEl = createElement('i', {
      className: `fas fa-${icon}`,
      style: `
        position: absolute;
        left: 15px;
        top: 50%;
        transform: translateY(-50%);
        color: #9ca3af;
        font-size: 16px;
      `
    });

    const input = createElement('input', {
      type: type,
      id: id,
      placeholder: placeholder,
      required: true,
      style: `
        width: 100%;
        padding: 15px 15px 15px 45px;
        border: 2px solid #e5e7eb;
        border-radius: 10px;
        font-size: 14px;
        transition: all ${styles.animation.duration} ${styles.animation.easing};
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

    group.appendChild(iconEl);
    group.appendChild(input);

    return group;
  }

  private createFooter(): HTMLElement {
    const footer = createElement('div', {
      className: 'login-footer',
      style: `
        text-align: center;
        margin-top: 20px;
        color: ${styles.colors.gray};
        font-size: 14px;
      `
    });

    const text = document.createTextNode('Belum punya akun? ');
    const link = createElement('a', {
      href: '#',
      textContent: 'Daftar',
      style: `
        color: ${styles.colors.primary};
        text-decoration: none;
        font-weight: 600;
      `,
      onclick: (e: Event) => {
        e.preventDefault();
        this.onRegisterClick();
      }
    });

    link.addEventListener('mouseenter', () => {
      link.style.textDecoration = 'underline';
    });

    link.addEventListener('mouseleave', () => {
      link.style.textDecoration = 'none';
    });

    footer.appendChild(text);
    footer.appendChild(link);

    return footer;
  }

  private async handleSubmit(e: Event): Promise<void> {
    e.preventDefault();
    
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const password = (document.getElementById('password') as HTMLInputElement).value;

    try {
      await authService.login(email, password);
      showMessage('Login berhasil!', 'success');
      setTimeout(() => {
        this.onLoginSuccess();
      }, 1000);
    } catch (error) {
      showMessage((error as Error).message, 'error');
    }
  }

  public onRegisterClick: () => void = () => {};
  public onLoginSuccess: () => void = () => {};

  public getElement(): HTMLElement {
    return this.container;
  }
}
