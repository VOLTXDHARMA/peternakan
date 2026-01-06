import { createElement, showMessage } from '../utils/dom.js';
import { styles } from '../styles/theme.js';
import authService from '../services/authService.js';

export class RegisterComponent {
  private container: HTMLElement;

  constructor() {
    this.container = this.render();
  }

  private render(): HTMLElement {
    const container = createElement('div', {
      className: 'register-container',
      style: `
        width: 100%;
        max-width: 450px;
        animation: fadeIn 0.6s ease-out;
      `
    });

    const card = createElement('div', {
      className: 'register-card',
      style: `
        background: ${styles.colors.white};
        border-radius: 20px;
        padding: 40px;
        box-shadow: ${styles.shadows.lg};
      `
    });

    const header = this.createHeader();
    card.appendChild(header);

    const form = this.createRegisterForm();
    card.appendChild(form);

    const footer = this.createFooter();
    card.appendChild(footer);

    container.appendChild(card);
    return container;
  }

  private createHeader(): HTMLElement {
    const header = createElement('div', {
      style: 'text-align: center; margin-bottom: 30px;'
    });

    const logo = createElement('div', {
      innerHTML: '<i class="fas fa-user-plus"></i>',
      style: `
        width: 80px;
        height: 80px;
        background: linear-gradient(135deg, ${styles.colors.primary}, ${styles.colors.secondary});
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto 20px;
        font-size: 40px;
        color: white;
      `
    });

    const title = createElement('h1', {
      textContent: 'Daftar Akun Baru',
      style: `color: ${styles.colors.dark}; font-size: 28px; margin-bottom: 8px;`
    });

    const subtitle = createElement('p', {
      textContent: 'Bergabung dengan Peternakan UMKM',
      style: `color: ${styles.colors.gray}; font-size: 14px;`
    });

    header.appendChild(logo);
    header.appendChild(title);
    header.appendChild(subtitle);

    return header;
  }

  private createRegisterForm(): HTMLElement {
    const form = createElement('form', {
      style: 'display: flex; flex-direction: column; gap: 20px;',
      onsubmit: (e) => this.handleSubmit(e)
    });

    const fields = [
      { id: 'username', placeholder: 'Username', icon: 'user', type: 'text' },
      { id: 'email', placeholder: 'Email', icon: 'envelope', type: 'email' },
      { id: 'phone', placeholder: 'Nomor HP', icon: 'phone', type: 'tel' },
      { id: 'password', placeholder: 'Password', icon: 'lock', type: 'password' }
    ];

    fields.forEach(field => {
      const group = this.createInputGroup(field.id, field.placeholder, field.icon, field.type);
      form.appendChild(group);
    });

    // Role select
    const roleGroup = this.createRoleSelect();
    form.appendChild(roleGroup);

    const button = createElement('button', {
      type: 'submit',
      innerHTML: '<span>Daftar</span><i class="fas fa-arrow-right"></i>',
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
        transition: all ${styles.animation.duration};
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

    group.appendChild(iconEl);
    group.appendChild(input);

    return group;
  }

  private createRoleSelect(): HTMLElement {
    const group = createElement('div', {
      style: 'position: relative;'
    });

    const icon = createElement('i', {
      className: 'fas fa-user-tag',
      style: `
        position: absolute;
        left: 15px;
        top: 50%;
        transform: translateY(-50%);
        color: #9ca3af;
        font-size: 16px;
        z-index: 1;
      `
    });

    const select = createElement('select', {
      id: 'role',
      required: true,
      style: `
        width: 100%;
        padding: 15px 15px 15px 45px;
        border: 2px solid #e5e7eb;
        border-radius: 10px;
        font-size: 14px;
        transition: all ${styles.animation.duration};
        outline: none;
        appearance: none;
        background: white url('data:image/svg+xml;utf8,<svg fill="gray" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M7 10l5 5 5-5z"/></svg>') no-repeat right 10px center;
        cursor: pointer;
      `
    });

    const options = [
      { value: '', text: 'Pilih Role' },
      { value: 'peternak', text: 'Peternak' },
      { value: 'investor', text: 'Investor' },
      { value: 'penyedia_kios', text: 'Penyedia Kios' }
    ];

    options.forEach(opt => {
      const option = createElement('option', {
        value: opt.value,
        textContent: opt.text
      });
      select.appendChild(option);
    });

    select.addEventListener('focus', () => {
      select.style.borderColor = styles.colors.primary;
      select.style.boxShadow = '0 0 0 3px rgba(37, 99, 235, 0.1)';
    });

    select.addEventListener('blur', () => {
      select.style.borderColor = '#e5e7eb';
      select.style.boxShadow = 'none';
    });

    group.appendChild(icon);
    group.appendChild(select);

    return group;
  }

  private createFooter(): HTMLElement {
    const footer = createElement('div', {
      style: `
        text-align: center;
        margin-top: 20px;
        color: ${styles.colors.gray};
        font-size: 14px;
      `
    });

    const text = document.createTextNode('Sudah punya akun? ');
    const link = createElement('a', {
      href: '#',
      textContent: 'Login',
      style: `
        color: ${styles.colors.primary};
        text-decoration: none;
        font-weight: 600;
      `,
      onclick: (e) => {
        e.preventDefault();
        this.onLoginClick();
      }
    });

    link.addEventListener('mouseenter', () => link.style.textDecoration = 'underline');
    link.addEventListener('mouseleave', () => link.style.textDecoration = 'none');

    footer.appendChild(text);
    footer.appendChild(link);

    return footer;
  }

  private async handleSubmit(e: Event): Promise<void> {
    e.preventDefault();
    
    const username = (document.getElementById('username') as HTMLInputElement).value;
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const nomor_hp = (document.getElementById('phone') as HTMLInputElement).value;
    const role = (document.getElementById('role') as HTMLSelectElement).value;
    const password = (document.getElementById('password') as HTMLInputElement).value;

    try {
      await authService.register({ username, email, nomor_hp, role, password });
      showMessage('Registrasi berhasil! Silakan login.', 'success');
      setTimeout(() => {
        this.onLoginClick();
      }, 1500);
    } catch (error) {
      showMessage((error as Error).message, 'error');
    }
  }

  public onLoginClick: () => void = () => {};

  public getElement(): HTMLElement {
    return this.container;
  }
}
