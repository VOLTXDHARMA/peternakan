// ===== UTILITY FUNCTIONS UNTUK MANIPULASI DOM =====
// File ini berisi fungsi-fungsi helper untuk membuat dan memanipulasi elemen HTML

// Fungsi untuk membuat elemen HTML dengan mudah
// Generic type K untuk memastikan tag yang dibuat sesuai dengan HTMLElement yang valid
// Parameter:
//   - tag: nama tag HTML (div, button, input, dll)
//   - props: properties/attributes untuk elemen (className, id, style, event handlers, dll)
//   - children: elemen atau teks yang akan menjadi child
// Return: HTMLElement yang sudah dibuat dan dikonfigurasi
export function createElement<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  props?: {
    className?: string;           // Class CSS untuk elemen
    id?: string;                  // ID elemen
    type?: string;                // Type untuk input element
    placeholder?: string;         // Placeholder untuk input
    required?: boolean;           // Apakah field required
    value?: string;               // Value untuk input
    textContent?: string;         // Text content elemen
    innerHTML?: string;           // HTML content elemen
    onclick?: (e: Event) => void; // Event handler untuk click
    onsubmit?: (e: Event) => void;// Event handler untuk submit
    oninput?: (e: Event) => void; // Event handler untuk input
    [key: string]: any;           // Properties lainnya
  },
  ...children: (HTMLElement | string)[]  // Children bisa elemen atau string
): HTMLElementTagNameMap[K] {
  // Buat elemen HTML sesuai tag
  const element = document.createElement(tag);
  
  // Jika ada props, set semua properties ke elemen
  if (props) {
    Object.keys(props).forEach(key => {
      if (key === 'className') {
        // Set class name
        element.className = props[key] as string;
      } else if (key === 'textContent') {
        // Set text content
        element.textContent = props[key] as string;
      } else if (key === 'innerHTML') {
        // Set inner HTML
        element.innerHTML = props[key] as string;
      } else if (key.startsWith('on')) {
        // Jika key dimulai dengan 'on', ini adalah event handler
        // Contoh: onclick -> click, onsubmit -> submit
        const eventName = key.substring(2).toLowerCase();
        element.addEventListener(eventName, props[key] as EventListener);
      } else {
        // Set attribute lainnya (id, type, placeholder, dll)
        element.setAttribute(key, props[key]);
      }
    });
  }
  
  // Tambahkan semua children ke elemen
  children.forEach(child => {
    if (typeof child === 'string') {
      // Jika child adalah string, buat text node
      element.appendChild(document.createTextNode(child));
    } else {
      // Jika child adalah HTMLElement, append langsung
      element.appendChild(child);
    }
  });
  
  return element;
}

// Fungsi untuk menampilkan toast message/notifikasi ke user
// Parameter:
//   - message: teks pesan yang akan ditampilkan
//   - type: tipe pesan ('success' untuk sukses, 'error' untuk error)
//   - duration: berapa lama pesan ditampilkan dalam milidetik (default 3000ms = 3 detik)
export function showMessage(message: string, type: 'success' | 'error', duration = 3000): void {
  // Buat elemen div untuk menampilkan pesan
  const messageEl = createElement('div', {
    className: `message message-${type}`,
    textContent: message,
    style: `
      position: fixed;           /* Posisi fixed agar tetap di tempat saat scroll */
      top: 20px;                 /* Jarak dari atas layar */
      right: 20px;               /* Jarak dari kanan layar */
      padding: 16px 24px;        /* Padding dalam */
      border-radius: 8px;        /* Sudut melengkung */
      font-weight: 500;          /* Font semi-bold */
      z-index: 10000;            /* Z-index tinggi agar di atas semua elemen */
      animation: slideIn 0.3s ease-out;  /* Animasi masuk */
      ${type === 'success' 
        ? 'background: #d1fae5; color: #065f46; border: 1px solid #10b981;'  /* Style untuk success (hijau) */
        : 'background: #fee2e2; color: #991b1b; border: 1px solid #ef4444;'  /* Style untuk error (merah) */
      }
    `
  });

  // Tambahkan pesan ke body
  document.body.appendChild(messageEl);

  // Set timeout untuk menghilangkan pesan setelah duration
  setTimeout(() => {
    // Animasi keluar (reverse dari animasi masuk)
    messageEl.style.animation = 'fadeIn 0.3s ease-out reverse';
    // Hapus elemen dari DOM setelah animasi selesai
    setTimeout(() => messageEl.remove(), 300);
  }, duration);
}

// Fungsi untuk menghapus semua child elements dari sebuah container
// Berguna untuk "membersihkan" container sebelum menambahkan konten baru
// Parameter: container - HTMLElement yang akan dibersihkan
export function clearContainer(container: HTMLElement): void {
  // Loop selama masih ada child, hapus satu per satu
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
}
