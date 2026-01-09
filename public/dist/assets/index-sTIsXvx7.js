(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))a(n);new MutationObserver(n=>{for(const i of n)if(i.type==="childList")for(const s of i.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&a(s)}).observe(document,{childList:!0,subtree:!0});function t(n){const i={};return n.integrity&&(i.integrity=n.integrity),n.referrerPolicy&&(i.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?i.credentials="include":n.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function a(n){if(n.ep)return;n.ep=!0;const i=t(n);fetch(n.href,i)}})();const r={colors:{primary:"#8B4513",primaryDark:"#654321",secondary:"#D2691E",danger:"#A52A2A",dark:"#3E2723",light:"#FFF8DC",white:"#FFFFFF",gray:"#8D6E63",gradients:{primary:"linear-gradient(135deg, #8B4513 0%, #654321 100%)",success:"linear-gradient(135deg, #A0522D 0%, #8B4513 100%)",warning:"linear-gradient(135deg, #D2691E 0%, #CD853F 100%)",purple:"linear-gradient(135deg, #DEB887 0%, #D2B48C 100%)",pink:"linear-gradient(135deg, #F5DEB3 0%, #DEB887 100%)",cyan:"linear-gradient(135deg, #D2B48C 0%, #BC8F8F 100%)",orange:"linear-gradient(135deg, #CD853F 0%, #D2691E 100%)"}},shadows:{sm:"0 2px 8px rgba(0, 0, 0, 0.08)",md:"0 4px 16px rgba(0, 0, 0, 0.12)",lg:"0 8px 32px rgba(0, 0, 0, 0.16)"},animation:{duration:"0.3s",easing:"cubic-bezier(0.4, 0, 0.2, 1)",spring:"cubic-bezier(0.68, -0.55, 0.265, 1.55)"}},D=()=>{const u=document.createElement("style");u.textContent=`
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
      align-items: stretch;
      justify-content: stretch;
      padding: 0;
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
  `,document.head.appendChild(u),console.log("Global styles applied")};function o(u,e,...t){const a=document.createElement(u);return e&&Object.keys(e).forEach(n=>{if(n==="className")a.className=e[n];else if(n==="textContent")a.textContent=e[n];else if(n==="innerHTML")a.innerHTML=e[n];else if(n.startsWith("on")){const i=n.substring(2).toLowerCase();a.addEventListener(i,e[n])}else a.setAttribute(n,e[n])}),t.forEach(n=>{typeof n=="string"?a.appendChild(document.createTextNode(n)):a.appendChild(n)}),a}function d(u,e,t=3e3){const a=o("div",{className:`message message-${e}`,textContent:u,style:`
      position: fixed;           /* Posisi fixed agar tetap di tempat saat scroll */
      top: 20px;                 /* Jarak dari atas layar */
      right: 20px;               /* Jarak dari kanan layar */
      padding: 16px 24px;        /* Padding dalam */
      border-radius: 8px;        /* Sudut melengkung */
      font-weight: 500;          /* Font semi-bold */
      z-index: 10000;            /* Z-index tinggi agar di atas semua elemen */
      animation: slideIn 0.3s ease-out;  /* Animasi masuk */
      ${e==="success"?"background: #d1fae5; color: #065f46; border: 1px solid #10b981;":"background: #fee2e2; color: #991b1b; border: 1px solid #ef4444;"}
    `});document.body.appendChild(a),setTimeout(()=>{a.style.animation="fadeIn 0.3s ease-out reverse",setTimeout(()=>a.remove(),300)},t)}function b(u){for(;u.firstChild;)u.removeChild(u.firstChild)}const I="/api";class ${constructor(){this.token=null,this.token=localStorage.getItem("authToken")}static getInstance(){return $.instance||($.instance=new $),$.instance}async login(e,t){const a=await fetch(`${I}/auth/login`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:e,password:t})});if(!a.ok){const i=await a.json();throw new Error(i.message||"Login failed")}const n=await a.json();return this.token=n.data.accessToken,localStorage.setItem("authToken",this.token),n}async register(e){const t=await fetch(`${I}/auth/register`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)});if(!t.ok){const a=await t.json();throw new Error(a.message||"Registration failed")}return t.json()}logout(){this.token=null,localStorage.removeItem("authToken"),localStorage.removeItem("currentUser")}getToken(){return this.token}isAuthenticated(){return!!this.token}}const f=$.getInstance();class F{constructor(){this.onRegisterClick=()=>{},this.onLoginSuccess=()=>{},console.log("Creating LoginComponent..."),this.container=this.render(),console.log("LoginComponent created")}render(){console.log("Rendering LoginComponent...");const e=o("div",{className:"login-container",style:`
        width: 100%;
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px;
      `}),t=o("div",{style:`
        width: 100%;
        max-width: 450px;
        animation: fadeIn 0.6s ease-out;
      `}),a=o("div",{className:"login-card",style:`
        background: ${r.colors.white};  /* Background putih */
        border-radius: 20px;                  /* Sudut melengkung */
        padding: 40px;                        /* Padding dalam */
        box-shadow: ${r.shadows.lg};     /* Shadow besar untuk depth */
      `}),n=this.createHeader();a.appendChild(n);const i=this.createLoginForm();a.appendChild(i);const s=this.createFooter();return a.appendChild(s),t.appendChild(a),e.appendChild(t),e}createHeader(){const e=o("div",{className:"login-header",style:"text-align: center; margin-bottom: 30px;"}),t=o("div",{className:"logo",innerHTML:'<i class="fas fa-cow"></i>',style:`
        width: 80px;                /* Lebar logo */
        height: 80px;               /* Tinggi logo */
        background: linear-gradient(135deg, ${r.colors.primary}, ${r.colors.secondary});  /* Gradient background */
        border-radius: 50%;         /* Bentuk lingkaran */
        display: flex;              /* Flexbox untuk centering */
        align-items: center;        /* Center vertical */
        justify-content: center;    /* Center horizontal */
        margin: 0 auto 20px;        /* Center dengan margin bawah */
        font-size: 40px;            /* Ukuran icon */
        color: white;               /* Warna icon putih */
      `}),a=o("h1",{textContent:"Peternakan UMKM",style:`color: ${r.colors.dark}; font-size: 28px; margin-bottom: 8px;`}),n=o("p",{textContent:"Sistem Manajemen Peternakan",style:`color: ${r.colors.gray}; font-size: 14px;`});return e.appendChild(t),e.appendChild(a),e.appendChild(n),e}createLoginForm(){const e=o("form",{className:"login-form",style:"display: flex; flex-direction: column; gap: 20px;",onsubmit:i=>this.handleSubmit(i)}),t=this.createInputGroup("email","Email","envelope","email");e.appendChild(t);const a=this.createInputGroup("password","Password","lock","password");e.appendChild(a);const n=o("button",{type:"submit",className:"btn-login",innerHTML:'<span>Masuk</span><i class="fas fa-arrow-right"></i>',style:`
        background: linear-gradient(135deg, ${r.colors.primary}, ${r.colors.primaryDark});
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
        transition: all ${r.animation.duration} ${r.animation.easing};
        margin-top: 10px;
      `});return n.addEventListener("mouseenter",()=>{n.style.transform="translateY(-2px)",n.style.boxShadow="0 10px 20px rgba(37, 99, 235, 0.3)"}),n.addEventListener("mouseleave",()=>{n.style.transform="translateY(0)",n.style.boxShadow="none"}),e.appendChild(n),e}createInputGroup(e,t,a,n){const i=o("div",{className:"input-group",style:"position: relative;"}),s=o("i",{className:`fas fa-${a}`,style:`
        position: absolute;
        left: 15px;
        top: 50%;
        transform: translateY(-50%);
        color: #9ca3af;
        font-size: 16px;
      `}),l=o("input",{type:n,id:e,placeholder:t,required:!0,style:`
        width: 100%;
        padding: 15px 15px 15px 45px;
        border: 2px solid #e5e7eb;
        border-radius: 10px;
        font-size: 14px;
        transition: all ${r.animation.duration} ${r.animation.easing};
        outline: none;
      `});return l.addEventListener("focus",()=>{l.style.borderColor=r.colors.primary,l.style.boxShadow="0 0 0 3px rgba(37, 99, 235, 0.1)"}),l.addEventListener("blur",()=>{l.style.borderColor="#e5e7eb",l.style.boxShadow="none"}),i.appendChild(s),i.appendChild(l),i}createFooter(){const e=o("div",{className:"login-footer",style:`
        text-align: center;
        margin-top: 20px;
        color: ${r.colors.gray};
        font-size: 14px;
      `}),t=document.createTextNode("Belum punya akun? "),a=o("a",{href:"#",textContent:"Daftar",style:`
        color: ${r.colors.primary};
        text-decoration: none;
        font-weight: 600;
      `,onclick:n=>{n.preventDefault(),this.onRegisterClick()}});return a.addEventListener("mouseenter",()=>{a.style.textDecoration="underline"}),a.addEventListener("mouseleave",()=>{a.style.textDecoration="none"}),e.appendChild(t),e.appendChild(a),e}async handleSubmit(e){e.preventDefault();const t=document.getElementById("email").value,a=document.getElementById("password").value;try{await f.login(t,a),d("Login berhasil!","success"),setTimeout(()=>{this.onLoginSuccess()},1e3)}catch(n){d(n.message,"error")}}getElement(){return this.container}}class K{constructor(){this.onLoginClick=()=>{},this.container=this.render()}render(){const e=o("div",{className:"register-container",style:`
        width: 100%;
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px;
      `}),t=o("div",{style:`
        width: 100%;
        max-width: 450px;
        animation: fadeIn 0.6s ease-out;
      `}),a=o("div",{className:"register-card",style:`
        background: ${r.colors.white};
        border-radius: 20px;
        padding: 40px;
        box-shadow: ${r.shadows.lg};
      `}),n=this.createHeader();a.appendChild(n);const i=this.createRegisterForm();a.appendChild(i);const s=this.createFooter();return a.appendChild(s),t.appendChild(a),e.appendChild(t),e}createHeader(){const e=o("div",{style:"text-align: center; margin-bottom: 30px;"}),t=o("div",{innerHTML:'<i class="fas fa-user-plus"></i>',style:`
        width: 80px;
        height: 80px;
        background: linear-gradient(135deg, ${r.colors.primary}, ${r.colors.secondary});
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto 20px;
        font-size: 40px;
        color: white;
      `}),a=o("h1",{textContent:"Daftar Akun Baru",style:`color: ${r.colors.dark}; font-size: 28px; margin-bottom: 8px;`}),n=o("p",{textContent:"Bergabung dengan Peternakan UMKM",style:`color: ${r.colors.gray}; font-size: 14px;`});return e.appendChild(t),e.appendChild(a),e.appendChild(n),e}createRegisterForm(){const e=o("form",{style:"display: flex; flex-direction: column; gap: 20px;",onsubmit:i=>this.handleSubmit(i)});[{id:"username",placeholder:"Username",icon:"user",type:"text"},{id:"email",placeholder:"Email",icon:"envelope",type:"email"},{id:"phone",placeholder:"Nomor HP",icon:"phone",type:"tel"},{id:"password",placeholder:"Password",icon:"lock",type:"password"}].forEach(i=>{const s=this.createInputGroup(i.id,i.placeholder,i.icon,i.type);e.appendChild(s)});const a=this.createRoleSelect();e.appendChild(a);const n=o("button",{type:"submit",innerHTML:'<span>Daftar</span><i class="fas fa-arrow-right"></i>',style:`
        background: linear-gradient(135deg, ${r.colors.primary}, ${r.colors.primaryDark});
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
        transition: all ${r.animation.duration};
        margin-top: 10px;
      `});return n.addEventListener("mouseenter",()=>{n.style.transform="translateY(-2px)",n.style.boxShadow="0 10px 20px rgba(37, 99, 235, 0.3)"}),n.addEventListener("mouseleave",()=>{n.style.transform="translateY(0)",n.style.boxShadow="none"}),e.appendChild(n),e}createInputGroup(e,t,a,n){const i=o("div",{style:"position: relative;"}),s=o("i",{className:`fas fa-${a}`,style:`
        position: absolute;
        left: 15px;
        top: 50%;
        transform: translateY(-50%);
        color: #9ca3af;
        font-size: 16px;
      `}),l=o("input",{type:n,id:e,placeholder:t,required:!0,style:`
        width: 100%;
        padding: 15px 15px 15px 45px;
        border: 2px solid #e5e7eb;
        border-radius: 10px;
        font-size: 14px;
        transition: all ${r.animation.duration};
        outline: none;
      `});return l.addEventListener("focus",()=>{l.style.borderColor=r.colors.primary,l.style.boxShadow="0 0 0 3px rgba(37, 99, 235, 0.1)"}),l.addEventListener("blur",()=>{l.style.borderColor="#e5e7eb",l.style.boxShadow="none"}),i.appendChild(s),i.appendChild(l),i}createRoleSelect(){const e=o("div",{style:"position: relative;"}),t=o("i",{className:"fas fa-user-tag",style:`
        position: absolute;
        left: 15px;
        top: 50%;
        transform: translateY(-50%);
        color: #9ca3af;
        font-size: 16px;
        z-index: 1;
      `}),a=o("select",{id:"role",required:!0,style:`
        width: 100%;
        padding: 15px 15px 15px 45px;
        border: 2px solid #e5e7eb;
        border-radius: 10px;
        font-size: 14px;
        transition: all ${r.animation.duration};
        outline: none;
        appearance: none;
        background: white url('data:image/svg+xml;utf8,<svg fill="gray" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M7 10l5 5 5-5z"/></svg>') no-repeat right 10px center;
        cursor: pointer;
      `});return[{value:"",text:"Pilih Role"},{value:"peternak",text:"Peternak"},{value:"investor",text:"Investor"},{value:"penyedia_kios",text:"Penyedia Kios"}].forEach(i=>{const s=o("option",{value:i.value,textContent:i.text});a.appendChild(s)}),a.addEventListener("focus",()=>{a.style.borderColor=r.colors.primary,a.style.boxShadow="0 0 0 3px rgba(37, 99, 235, 0.1)"}),a.addEventListener("blur",()=>{a.style.borderColor="#e5e7eb",a.style.boxShadow="none"}),e.appendChild(t),e.appendChild(a),e}createFooter(){const e=o("div",{style:`
        text-align: center;
        margin-top: 20px;
        color: ${r.colors.gray};
        font-size: 14px;
      `}),t=document.createTextNode("Sudah punya akun? "),a=o("a",{href:"#",textContent:"Login",style:`
        color: ${r.colors.primary};
        text-decoration: none;
        font-weight: 600;
      `,onclick:n=>{n.preventDefault(),this.onLoginClick()}});return a.addEventListener("mouseenter",()=>a.style.textDecoration="underline"),a.addEventListener("mouseleave",()=>a.style.textDecoration="none"),e.appendChild(t),e.appendChild(a),e}async handleSubmit(e){e.preventDefault();const t=document.getElementById("username").value,a=document.getElementById("email").value,n=document.getElementById("phone").value,i=document.getElementById("role").value,s=document.getElementById("password").value;try{await f.register({username:t,email:a,nomor_hp:n,role:i,password:s}),d("Registrasi berhasil! Silakan login.","success"),setTimeout(()=>{this.onLoginClick()},1500)}catch(l){d(l.message,"error")}}getElement(){return this.container}}const w="/api";class T{constructor(){}static getInstance(){return T.instance||(T.instance=new T),T.instance}getHeaders(){return{"Content-Type":"application/json",Authorization:`Bearer ${f.getToken()}`}}async getAllUsers(){try{console.log("Fetching users from:",`${w}/users`);const e=await fetch(`${w}/users`,{headers:this.getHeaders()});if(console.log("Response status:",e.status),console.log("Response headers:",e.headers),!e.ok){const a=await e.text();throw console.error("Error response:",a),new Error(`Failed to fetch users: ${e.status} ${e.statusText}`)}const t=await e.json();return console.log("Received data:",t),t.data}catch(e){throw console.error("Fetch error:",e),e}}async getUserById(e){const t=await fetch(`${w}/users/${e}`,{headers:this.getHeaders()});if(!t.ok)throw new Error("Failed to fetch user");return(await t.json()).data}async createUser(e){const t=await fetch(`${w}/auth/register`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)});if(!t.ok){const n=await t.json();throw new Error(n.message||"Failed to create user")}return(await t.json()).data}async updateUser(e,t){const a=await fetch(`${w}/users/${e}`,{method:"PUT",headers:this.getHeaders(),body:JSON.stringify(t)});if(!a.ok){const i=await a.json();throw new Error(i.message||"Failed to update user")}return(await a.json()).data}async deleteUser(e){if(!(await fetch(`${w}/users/${e}`,{method:"DELETE",headers:this.getHeaders()})).ok)throw new Error("Failed to delete user")}}const v=T.getInstance(),L="/api";class M{constructor(){}static getInstance(){return M.instance||(M.instance=new M),M.instance}getHeaders(){return{"Content-Type":"application/json",Authorization:`Bearer ${f.getToken()}`}}async getAllUmkm(){const e=await fetch(`${L}/umkm`,{method:"GET",headers:this.getHeaders()});if(!e.ok){const a=await e.json();throw new Error(a.message||"Failed to fetch UMKM")}return(await e.json()).data}async getUmkmById(e){const t=await fetch(`${L}/umkm/${e}`,{method:"GET",headers:this.getHeaders()});if(!t.ok){const n=await t.json();throw new Error(n.message||"Failed to fetch UMKM detail")}return(await t.json()).data}async createUmkm(e){const t=await fetch(`${L}/umkm`,{method:"POST",headers:this.getHeaders(),body:JSON.stringify(e)});if(!t.ok){const n=await t.json();throw new Error(n.message||"Failed to create UMKM")}return(await t.json()).data}async updateUmkm(e,t){const a=await fetch(`${L}/umkm/${e}`,{method:"PUT",headers:this.getHeaders(),body:JSON.stringify(t)});if(!a.ok){const i=await a.json();throw new Error(i.message||"Failed to update UMKM")}return(await a.json()).data}async deleteUmkm(e){const t=await fetch(`${L}/umkm/${e}`,{method:"DELETE",headers:this.getHeaders()});if(!t.ok){const a=await t.json();throw new Error(a.message||"Failed to delete UMKM")}}}const y=M.getInstance(),U="/api";class j{constructor(){}static getInstance(){return j.instance||(j.instance=new j),j.instance}getHeaders(){return{"Content-Type":"application/json",Authorization:`Bearer ${f.getToken()}`}}async getAllTernak(){const e=await fetch(`${U}/ternak`,{method:"GET",headers:this.getHeaders()});if(!e.ok)throw new Error("Failed to fetch ternak");return(await e.json()).data}async getTernakById(e){const t=await fetch(`${U}/ternak/${e}`,{method:"GET",headers:this.getHeaders()});if(!t.ok)throw new Error("Failed to fetch ternak details");return(await t.json()).data}async createTernak(e){const t=await fetch(`${U}/ternak`,{method:"POST",headers:this.getHeaders(),body:JSON.stringify(e)});if(!t.ok)throw new Error("Failed to create ternak");return(await t.json()).data}async updateTernak(e,t){const a=await fetch(`${U}/ternak/${e}`,{method:"PUT",headers:this.getHeaders(),body:JSON.stringify(t)});if(!a.ok)throw new Error("Failed to update ternak");return(await a.json()).data}async deleteTernak(e){if(!(await fetch(`${U}/ternak/${e}`,{method:"DELETE",headers:this.getHeaders()})).ok)throw new Error("Failed to delete ternak")}}const _=j.getInstance(),B="/api";class E{constructor(){}static getInstance(){return E.instance||(E.instance=new E),E.instance}getHeaders(){return{"Content-Type":"application/json",Authorization:`Bearer ${f.getToken()}`}}async getAllPelatihan(){const e=await fetch(`${B}/pelatihan`,{method:"GET",headers:this.getHeaders()});if(!e.ok)throw new Error("Failed to fetch pelatihan");return(await e.json()).data}async getPelatihanById(e){const t=await fetch(`${B}/pelatihan/${e}`,{method:"GET",headers:this.getHeaders()});if(!t.ok)throw new Error("Failed to fetch pelatihan details");return(await t.json()).data}async createPelatihan(e){const t=await fetch(`${B}/pelatihan`,{method:"POST",headers:this.getHeaders(),body:JSON.stringify(e)});if(!t.ok)throw new Error("Failed to create pelatihan");return(await t.json()).data}async updatePelatihan(e,t){const a=await fetch(`${B}/pelatihan/${e}`,{method:"PUT",headers:this.getHeaders(),body:JSON.stringify(t)});if(!a.ok)throw new Error("Failed to update pelatihan");return(await a.json()).data}async deletePelatihan(e){if(!(await fetch(`${B}/pelatihan/${e}`,{method:"DELETE",headers:this.getHeaders()})).ok)throw new Error("Failed to delete pelatihan")}}const S=E.getInstance(),z="/api";class P{constructor(){}static getInstance(){return P.instance||(P.instance=new P),P.instance}getHeaders(){return{"Content-Type":"application/json",Authorization:`Bearer ${f.getToken()}`}}async getAllPembiayaan(){const e=await fetch(`${z}/pembiayaan`,{method:"GET",headers:this.getHeaders()});if(!e.ok)throw new Error("Failed to fetch pembiayaan");return(await e.json()).data}async getPembiayaanById(e){const t=await fetch(`${z}/pembiayaan/${e}`,{method:"GET",headers:this.getHeaders()});if(!t.ok)throw new Error("Failed to fetch pembiayaan details");return(await t.json()).data}async createPembiayaan(e){const t=await fetch(`${z}/pembiayaan`,{method:"POST",headers:this.getHeaders(),body:JSON.stringify(e)});if(!t.ok)throw new Error("Failed to create pembiayaan");return(await t.json()).data}async updatePembiayaan(e,t){const a=await fetch(`${z}/pembiayaan/${e}`,{method:"PUT",headers:this.getHeaders(),body:JSON.stringify(t)});if(!a.ok)throw new Error("Failed to update pembiayaan");return(await a.json()).data}async deletePembiayaan(e){if(!(await fetch(`${z}/pembiayaan/${e}`,{method:"DELETE",headers:this.getHeaders()})).ok)throw new Error("Failed to delete pembiayaan")}}const C=P.getInstance();class N{constructor(){this.userTableBody=null,this.umkmTableBody=null,this.ternakTableBody=null,this.pelatihanTableBody=null,this.pembiayaanTableBody=null,this.modal=null,this.umkmModal=null,this.ternakModal=null,this.pelatihanModal=null,this.pembiayaanModal=null,this.editingUserId=null,this.editingUmkmId=null,this.editingTernakId=null,this.editingPelatihanId=null,this.editingPembiayaanId=null,this.currentPage="dashboard",this.contentArea=null,this.stats={users:0,umkm:0,ternak:0,pembiayaan:0},this.onLogout=()=>{},this.container=this.render(),this.loadStats(),this.showPage("dashboard")}render(){const e=o("div",{className:"dashboard-container",style:`
        width: 100vw;
        height: 100vh;
        overflow: hidden;
        animation: fadeIn 0.6s ease-out;
        display: flex;
        flex-direction: column;
      `}),t=this.createNavbar(),a=o("div",{style:"display: flex; flex: 1; overflow: hidden;"}),n=this.createSidebar(),i=o("div",{id:"main-content",style:`
        flex: 1;
        padding: 40px;
        overflow-y: auto;
        background: transparent;
      `});return this.contentArea=i,a.appendChild(n),a.appendChild(i),e.appendChild(t),e.appendChild(a),e}createNavbar(){const e=o("nav",{style:`
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
      `}),t=o("div",{style:`
        position: absolute;
        top: -50%;
        left: -50%;
        width: 200%;
        height: 200%;
        background: radial-gradient(circle at 30% 50%, rgba(255,255,255,0.15) 0%, transparent 50%),
                    radial-gradient(circle at 70% 50%, rgba(240,147,251,0.2) 0%, transparent 50%);
        animation: pulse 12s ease-in-out infinite;
        pointer-events: none;
      `});e.appendChild(t);const a=o("div",{innerHTML:`
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
      `}),n=o("div",{style:"display: flex; align-items: center; gap: 15px; position: relative; z-index: 1;"}),i=o("div",{innerHTML:`
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
            color: ${r.colors.primary};
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
      `}),s=o("button",{innerHTML:'<i class="fas fa-sign-out-alt"></i> Logout',style:`
        background: linear-gradient(135deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.15) 100%);
        backdrop-filter: blur(20px);
        color: white;
        border: 2px solid rgba(255,255,255,0.4);
        padding: 12px 24px;
        border-radius: 50px;
        cursor: pointer;
        font-weight: 700;
        transition: all ${r.animation.duration};
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 14px;
        box-shadow: 0 4px 16px rgba(0,0,0,0.1), inset 0 1px 1px rgba(255,255,255,0.3);
        text-shadow: 0 1px 4px rgba(0,0,0,0.1);
      `,onclick:()=>this.handleLogout()});return s.addEventListener("mouseenter",()=>{s.style.background="linear-gradient(135deg, #ffffff 0%, #f5f5f5 100%)",s.style.color=r.colors.primary,s.style.transform="translateY(-3px) scale(1.05)",s.style.boxShadow="0 8px 24px rgba(255,255,255,0.4), 0 0 0 4px rgba(255,255,255,0.2)",s.style.textShadow="none"}),s.addEventListener("mouseleave",()=>{s.style.background="linear-gradient(135deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.15) 100%)",s.style.color="white",s.style.transform="translateY(0) scale(1)",s.style.boxShadow="0 4px 16px rgba(0,0,0,0.1), inset 0 1px 1px rgba(255,255,255,0.3)",s.style.textShadow="0 1px 4px rgba(0,0,0,0.1)"}),n.appendChild(i),n.appendChild(s),e.appendChild(a),e.appendChild(n),e}createSidebar(){const e=o("div",{style:`
        width: 280px;
        background: white;
        border-right: 1px solid #e5e7eb;
        padding: 24px 0;
        display: flex;
        flex-direction: column;
        gap: 8px;
      `});return[{id:"dashboard",icon:"fas fa-chart-line",label:"Dashboard",gradient:r.colors.gradients.primary},{id:"users",icon:"fas fa-users",label:"Manajemen User",gradient:r.colors.gradients.purple},{id:"umkm",icon:"fas fa-store",label:"UMKM",gradient:r.colors.gradients.success},{id:"ternak",icon:"fas fa-cow",label:"Ternak",gradient:r.colors.gradients.warning},{id:"pelatihan",icon:"fas fa-graduation-cap",label:"Pelatihan",gradient:r.colors.gradients.pink},{id:"pembiayaan",icon:"fas fa-money-bill-wave",label:"Pembiayaan",gradient:r.colors.gradients.cyan}].forEach(a=>{const n=o("div",{id:`menu-${a.id}`,style:`
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 14px 24px;
          margin: 0 12px;
          cursor: pointer;
          transition: all ${r.animation.duration} ${r.animation.spring};
          color: ${r.colors.gray};
          font-weight: 600;
          border-radius: 12px;
          position: relative;
          overflow: hidden;
        `,onclick:()=>this.showPage(a.id)});n.innerHTML=`
        <div style="
          width: 42px;
          height: 42px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          transition: all ${r.animation.duration};
          background: #f3f4f6;
          color: ${r.colors.gray};
        " class="menu-icon">
          <i class="${a.icon}"></i>
        </div>
        <span style="flex: 1; font-size: 15px;">${a.label}</span>
        <i class="fas fa-chevron-right" style="font-size: 12px; opacity: 0; transition: all ${r.animation.duration};"></i>
      `,n.addEventListener("mouseenter",()=>{if(this.currentPage!==a.id){n.style.background="#f9fafb",n.style.transform="translateX(4px)";const i=n.querySelector(".fa-chevron-right");i&&(i.style.opacity="0.5")}}),n.addEventListener("mouseleave",()=>{if(this.currentPage!==a.id){n.style.background="transparent",n.style.transform="translateX(0)";const i=n.querySelector(".fa-chevron-right");i&&(i.style.opacity="0")}}),e.appendChild(n)}),e}showPage(e){this.currentPage=e;const t=[{id:"dashboard",gradient:r.colors.gradients.primary},{id:"users",gradient:r.colors.gradients.purple},{id:"umkm",gradient:r.colors.gradients.success},{id:"ternak",gradient:r.colors.gradients.orange},{id:"pelatihan",gradient:r.colors.gradients.pink},{id:"pembiayaan",gradient:r.colors.gradients.cyan}];document.querySelectorAll('[id^="menu-"]').forEach(s=>{const l=s;l.style.background="transparent",l.style.color=r.colors.gray,l.style.transform="translateX(0)";const h=l.querySelector(".menu-icon");h&&(h.style.background="#f3f4f6",h.style.color=r.colors.gray);const p=l.querySelector(".fa-chevron-right");p&&(p.style.opacity="0")});const n=t.find(s=>s.id===e),i=document.getElementById(`menu-${e}`);if(i&&n){i.style.background="linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)",i.style.color=r.colors.primary,i.style.transform="translateX(4px)";const s=i.querySelector(".menu-icon");s&&(s.style.background=n.gradient,s.style.color="white",s.style.boxShadow=r.shadows.md);const l=i.querySelector(".fa-chevron-right");l&&(l.style.opacity="1")}if(this.contentArea)switch(b(this.contentArea),e){case"dashboard":this.contentArea.appendChild(this.createDashboardPage());break;case"users":this.contentArea.appendChild(this.createUsersPage());break;case"umkm":this.contentArea.appendChild(this.createUMKMPage());break;case"ternak":this.contentArea.appendChild(this.createTernakPage());break;case"pelatihan":this.contentArea.appendChild(this.createPelatihanPage());break;case"pembiayaan":this.contentArea.appendChild(this.createPembiayaanPage());break}}async loadStats(){try{const e=await v.getAllUsers();this.stats.users=e.length;const t=await y.getAllUmkm();this.stats.umkm=t.length;const a=await _.getAllTernak();this.stats.ternak=a.length;const n=await C.getAllPembiayaan();this.stats.pembiayaan=n.length}catch(e){console.error("Error loading stats:",e)}}createDashboardPage(){const e=o("div"),t=o("div",{innerHTML:`
        <h2 style="color: ${r.colors.dark}; font-size: 20px; font-weight: 800; margin-bottom: 3px;">
          Dashboard Overview 
        </h2>
        <p style="color: ${r.colors.gray}; font-size: 12px;">
          <i class="far fa-clock"></i> ${new Date().toLocaleDateString("id-ID",{weekday:"long",year:"numeric",month:"long",day:"numeric"})}
        </p>
      `,style:"margin-bottom: 12px;"}),a=o("div",{style:`
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 16px;
        margin-bottom: 24px;
      `});[{icon:"fa-users",label:"Total Users",value:this.stats.users,gradient:r.colors.gradients.purple,iconBg:"rgba(139, 92, 246, 0.1)",trend:"+12%"},{icon:"fa-store",label:"Total UMKM",value:this.stats.umkm,gradient:r.colors.gradients.success,iconBg:"rgba(16, 185, 129, 0.1)",trend:"+8%"},{icon:"fa-cow",label:"Total Ternak",value:this.stats.ternak,gradient:r.colors.gradients.warning,iconBg:"rgba(245, 158, 11, 0.1)",trend:"+15%"},{icon:"fa-money-bill-wave",label:"Pembiayaan Aktif",value:this.stats.pembiayaan,gradient:r.colors.gradients.cyan,iconBg:"rgba(6, 182, 212, 0.1)",trend:"+5%"}].forEach(p=>{const c=o("div",{style:`
          background: white;
          border-radius: 14px;
          padding: 16px;
          box-shadow: ${r.shadows.sm};
          transition: all ${r.animation.duration} ${r.animation.spring};
          cursor: pointer;
          border: 1px solid rgba(0,0,0,0.05);
          position: relative;
          overflow: hidden;
        `});c.innerHTML=`
        <div style="position: absolute; top: -12px; right: -12px; width: 70px; height: 70px; background: ${p.iconBg}; border-radius: 50%; opacity: 0.5;"></div>
        <div style="position: relative; z-index: 1;">
          <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 12px;">
            <div style="
              width: 42px;
              height: 42px;
              border-radius: 10px;
              background: ${p.gradient};
              display: flex;
              align-items: center;
              justify-content: center;
              color: white;
              font-size: 20px;
              box-shadow: ${r.shadows.md};
            ">
              <i class="fas ${p.icon}"></i>
            </div>
            <div style="
              background: rgba(16, 185, 129, 0.1);
              color: #059669;
              padding: 4px 8px;
              border-radius: 50px;
              font-size: 10px;
              font-weight: 700;
            ">
              <i class="fas fa-arrow-up" style="font-size: 9px;"></i> ${p.trend}
            </div>
          </div>
          <div>
            <div style="color: ${r.colors.gray}; font-size: 11px; font-weight: 600; margin-bottom: 5px; text-transform: uppercase; letter-spacing: 0.4px;">
              ${p.label}
            </div>
            <div style="color: ${r.colors.dark}; font-size: 24px; font-weight: 800; line-height: 1;">
              ${p.value}
            </div>
          </div>
        </div>
      `,c.addEventListener("mouseenter",()=>{c.style.transform="translateY(-6px) scale(1.02)",c.style.boxShadow=r.shadows.lg}),c.addEventListener("mouseleave",()=>{c.style.transform="translateY(0) scale(1)",c.style.boxShadow=r.shadows.sm}),a.appendChild(c)});const i=o("div",{style:"margin-top: 20px;"}),s=o("div",{innerHTML:`
        <h3 style="color: ${r.colors.dark}; font-size: 18px; font-weight: 700; margin-bottom: 4px;">Quick Actions</h3>
        <p style="color: ${r.colors.gray}; font-size: 13px; margin-bottom: 14px;">Akses cepat ke fitur-fitur utama</p>
      `}),l=o("div",{style:`
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 16px;
      `});return[{icon:"fa-user-plus",label:"Tambah User",gradient:r.colors.gradients.purple,onClick:()=>this.showPage("users")},{icon:"fa-store",label:"Daftar UMKM",gradient:r.colors.gradients.success,onClick:()=>this.showPage("umkm")},{icon:"fa-plus-circle",label:"Tambah Ternak",gradient:r.colors.gradients.warning,onClick:()=>this.showPage("ternak")},{icon:"fa-file-invoice-dollar",label:"Ajukan Pembiayaan",gradient:r.colors.gradients.cyan,onClick:()=>this.showPage("pembiayaan")}].forEach(p=>{const c=o("button",{style:`
          background: white;
          border: 2px solid #f3f4f6;
          padding: 16px;
          border-radius: 14px;
          cursor: pointer;
          transition: all ${r.animation.duration} ${r.animation.spring};
          text-align: left;
          position: relative;
          overflow: hidden;
        `,onclick:p.onClick});c.innerHTML=`
        <div style="position: relative; z-index: 1;">
          <div style="
            width: 42px;
            height: 42px;
            border-radius: 10px;
            background: ${p.gradient};
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 18px;
            margin-bottom: 12px;
            box-shadow: ${r.shadows.md};
          ">
            <i class="fas ${p.icon}"></i>
          </div>
          <div style="color: ${r.colors.dark}; font-weight: 700; font-size: 14px; margin-bottom: 4px;">
            ${p.label}
          </div>
          <div style="color: ${r.colors.gray}; font-size: 12px; display: flex; align-items: center; gap: 4px;">
            Klik untuk mulai <i class="fas fa-arrow-right" style="font-size: 9px;"></i>
          </div>
        </div>
      `,c.addEventListener("mouseenter",()=>{c.style.transform="translateY(-4px)",c.style.boxShadow=r.shadows.lg,c.style.borderColor="#e5e7eb"}),c.addEventListener("mouseleave",()=>{c.style.transform="translateY(0)",c.style.boxShadow="none",c.style.borderColor="#f3f4f6"}),l.appendChild(c)}),i.appendChild(s),i.appendChild(l),e.appendChild(t),e.appendChild(a),e.appendChild(i),e}createUsersPage(){const e=o("div",{style:"height: 100%; display: flex; flex-direction: column;"}),t=o("div",{style:"display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; flex-wrap: wrap; gap: 15px;"}),a=o("h2",{textContent:"Manajemen User",style:`color: ${r.colors.dark}; font-size: 28px;`}),n=o("button",{innerHTML:'<i class="fas fa-plus"></i> Tambah User',style:`
        background: ${r.colors.secondary};
        color: white;
        border: none;
        padding: 12px 24px;
        border-radius: 8px;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 8px;
        font-weight: 600;
        transition: all ${r.animation.duration};
      `,onclick:()=>this.openModal()});n.addEventListener("mouseenter",()=>{n.style.transform="translateY(-2px)",n.style.boxShadow="0 5px 15px rgba(16, 185, 129, 0.3)"}),n.addEventListener("mouseleave",()=>{n.style.transform="translateY(0)",n.style.boxShadow="none"}),t.appendChild(a),t.appendChild(n);const i=this.createTable();return e.appendChild(t),e.appendChild(i),this.loadUsers(),e}createUMKMPage(){const e=o("div",{style:"height: 100%; display: flex; flex-direction: column;"}),t=o("div",{style:"display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; flex-wrap: wrap; gap: 15px;"}),a=o("h2",{textContent:"Manajemen UMKM",style:`color: ${r.colors.dark}; font-size: 28px;`}),n=o("button",{innerHTML:'<i class="fas fa-plus"></i> Tambah UMKM',style:`
        background: ${r.colors.secondary};
        color: white;
        border: none;
        padding: 12px 24px;
        border-radius: 8px;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 8px;
        font-weight: 600;
        transition: all ${r.animation.duration};
      `,onclick:()=>this.openUmkmModal()});n.addEventListener("mouseenter",()=>{n.style.transform="translateY(-2px)",n.style.boxShadow="0 5px 15px rgba(210, 105, 30, 0.3)"}),n.addEventListener("mouseleave",()=>{n.style.transform="translateY(0)",n.style.boxShadow="none"}),t.appendChild(a),t.appendChild(n);const i=this.createUmkmTable();return e.appendChild(t),e.appendChild(i),this.loadUmkm(),e}createTernakPage(){const e=o("div",{style:"height: 100%; display: flex; flex-direction: column;"}),t=o("div",{style:"display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;"}),a=o("h2",{innerHTML:'<i class="fas fa-cow"></i> Manajemen Ternak',style:`color: ${r.colors.dark}; font-size: 28px; margin: 0;`}),n=o("button",{innerHTML:'<i class="fas fa-plus"></i> Tambah Ternak',style:`
        background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
        color: white;
        border: none;
        padding: 12px 24px;
        border-radius: 8px;
        cursor: pointer;
        font-weight: 600;
        transition: transform 0.2s, box-shadow 0.2s;
      `});n.onmouseover=()=>{n.style.transform="translateY(-2px)",n.style.boxShadow="0 8px 16px rgba(245, 158, 11, 0.3)"},n.onmouseout=()=>{n.style.transform="translateY(0)",n.style.boxShadow="none"},n.onclick=()=>this.openTernakModal(),t.appendChild(a),t.appendChild(n),e.appendChild(t);const i=this.createTernakTable();return e.appendChild(i),this.loadTernak(),e}createTernakTable(){const e=o("div",{style:`
        background: white;
        border-radius: 12px;
        box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        overflow: hidden;
        flex: 1;
        display: flex;
        flex-direction: column;
      `}),t=o("table",{style:`
        width: 100%;
        border-collapse: collapse;
        font-size: 14px;
      `}),a=o("thead");a.innerHTML=`
      <tr style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: white;">
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
    `;const n=o("tbody");return this.ternakTableBody=n,t.appendChild(a),t.appendChild(n),e.appendChild(t),e}async loadTernak(){try{const e=await _.getAllTernak();this.displayTernak(e)}catch{d("Gagal memuat data ternak: Invalid token","error")}}async displayTernak(e){if(!this.ternakTableBody)return;if(b(this.ternakTableBody),e.length===0){const a=o("tr");a.innerHTML=`
        <td colspan="10" style="padding: 40px; text-align: center; color: #9ca3af;">
          <i class="fas fa-inbox" style="font-size: 48px; margin-bottom: 16px; display: block;"></i>
          Belum ada data ternak
        </td>
      `,this.ternakTableBody.appendChild(a);return}let t=new Map;try{(await y.getAllUmkm()).forEach(n=>{t.set(n.id,n.nama_lengkap)})}catch(a){console.error("Failed to load UMKM data:",a)}e.forEach((a,n)=>{const i=o("tr",{style:`
          border-bottom: 1px solid #f3f4f6;
          transition: background-color 0.2s;
          background: ${n%2===0?"white":"#fafafa"};
        `});i.onmouseover=()=>i.style.background="#fef3c7",i.onmouseout=()=>i.style.background=n%2===0?"white":"#fafafa";const s=this.createTernakKondisiBadge(a.kondisi),l=this.createTernakStatusBadge(a.status),h=a.umkm_id&&t.get(a.umkm_id)||"-";i.innerHTML=`
        <td style="padding: 16px; font-weight: 600; color: #374151;">${a.kode_ternak}</td>
        <td style="padding: 16px; color: #6b7280;">
          ${h!=="-"?`<span style="background: #fef3c7; color: #92400e; padding: 4px 8px; border-radius: 4px; font-size: 12px; font-weight: 600;">
                <i class="fas fa-store"></i> ${h}
              </span>`:"-"}
        </td>
        <td style="padding: 16px; color: #6b7280;">${a.jenis_ternak}</td>
        <td style="padding: 16px; color: #6b7280;">${a.ras||"-"}</td>
        <td style="padding: 16px; color: #6b7280;">
          <i class="fas fa-${a.jenis_kelamin==="jantan"?"mars":"venus"}" style="color: ${a.jenis_kelamin==="jantan"?"#3b82f6":"#ec4899"};"></i>
          ${a.jenis_kelamin}
        </td>
        <td style="padding: 16px; color: #6b7280;">${a.umur_bulan||"-"}</td>
        <td style="padding: 16px; color: #6b7280;">${a.berat_sekarang||a.berat_awal||"-"}</td>
        <td style="padding: 16px;">${s}</td>
        <td style="padding: 16px;">${l}</td>
      `;const p=o("td",{style:"padding: 16px; text-align: center;"}),c=this.createTernakActionButtons(a);p.appendChild(c),i.appendChild(p),this.ternakTableBody.appendChild(i)})}createTernakKondisiBadge(e){const t={sehat:{color:"#10b981",bg:"#d1fae5",icon:"check-circle"},sakit:{color:"#ef4444",bg:"#fee2e2",icon:"exclamation-circle"},karantina:{color:"#f59e0b",bg:"#fef3c7",icon:"shield-alt"},mati:{color:"#6b7280",bg:"#f3f4f6",icon:"times-circle"}},a=t[e]||t.sehat;return`<span style="
      background: ${a.bg};
      color: ${a.color};
      padding: 6px 12px;
      border-radius: 6px;
      font-size: 12px;
      font-weight: 600;
      display: inline-block;
    ">
      <i class="fas fa-${a.icon}"></i> ${e}
    </span>`}createTernakStatusBadge(e){const t={aktif:{color:"#10b981",bg:"#d1fae5",icon:"check-circle"},dijual:{color:"#3b82f6",bg:"#dbeafe",icon:"money-bill-wave"},mati:{color:"#6b7280",bg:"#f3f4f6",icon:"times-circle"}},a=t[e]||t.aktif;return`<span style="
      background: ${a.bg};
      color: ${a.color};
      padding: 6px 12px;
      border-radius: 6px;
      font-size: 12px;
      font-weight: 600;
      display: inline-block;
    ">
      <i class="fas fa-${a.icon}"></i> ${e}
    </span>`}createTernakActionButtons(e){const t=o("div",{style:"display: flex; gap: 8px; justify-content: center;"}),a=o("button",{innerHTML:'<i class="fas fa-edit"></i>',style:`
        background: #3b82f6;
        color: white;
        border: none;
        padding: 8px 12px;
        border-radius: 6px;
        cursor: pointer;
        transition: all 0.2s;
      `});a.onmouseover=()=>{a.style.background="#2563eb",a.style.transform="translateY(-2px)"},a.onmouseout=()=>{a.style.background="#3b82f6",a.style.transform="translateY(0)"},a.onclick=()=>this.editTernak(e);const n=o("button",{innerHTML:'<i class="fas fa-trash"></i>',style:`
        background: #ef4444;
        color: white;
        border: none;
        padding: 8px 12px;
        border-radius: 6px;
        cursor: pointer;
        transition: all 0.2s;
      `});return n.onmouseover=()=>{n.style.background="#dc2626",n.style.transform="translateY(-2px)"},n.onmouseout=()=>{n.style.background="#ef4444",n.style.transform="translateY(0)"},n.onclick=()=>this.deleteTernak(e.id),t.appendChild(a),t.appendChild(n),t}async openTernakModal(e){let t=[];try{t=await y.getAllUmkm()}catch{d("Gagal memuat data UMKM","error")}const a=o("div",{style:`
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
      `}),n=o("div",{style:`
        background: white;
        padding: 32px;
        border-radius: 16px;
        width: 90%;
        max-width: 600px;
        max-height: 90vh;
        overflow-y: auto;
        box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04);
      `}),i=o("h3",{innerHTML:`<i class="fas fa-cow"></i> ${e?"Edit":"Tambah"} Ternak`,style:`color: ${r.colors.dark}; margin-bottom: 24px; font-size: 24px;`}),s=t.map(p=>`<option value="${p.id}" ${e?.umkm_id===p.id?"selected":""}>
        ${p.nama_lengkap} - ${p.jenis_peternakan_utama||"Umum"}
      </option>`).join(""),l=o("form");l.innerHTML=`
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
        <div style="grid-column: 1 / -1;">
          <label style="display: block; margin-bottom: 8px; color: #374151; font-weight: 600;">UMKM *</label>
          <select name="umkm_id" id="umkm-select" required
            style="width: 100%; padding: 12px; border: 2px solid #e5e7eb; border-radius: 8px; font-size: 14px;">
            <option value="">Pilih UMKM</option>
            ${s}
          </select>
          <p style="font-size: 12px; color: #6b7280; margin-top: 4px;">
            <i class="fas fa-info-circle"></i> Pilih UMKM pemilik ternak
          </p>
        </div>

        <div style="grid-column: 1 / -1;">
          <label style="display: block; margin-bottom: 8px; color: #374151; font-weight: 600;">Kode Ternak *</label>
          <input type="text" name="kode_ternak" value="${e?.kode_ternak||""}" required
            style="width: 100%; padding: 12px; border: 2px solid #e5e7eb; border-radius: 8px; font-size: 14px;"
            placeholder="Contoh: TRK001">
        </div>

        <div>
          <label style="display: block; margin-bottom: 8px; color: #374151; font-weight: 600;">Jenis Ternak *</label>
          <select name="jenis_ternak" id="jenis-ternak-select" required
            style="width: 100%; padding: 12px; border: 2px solid #e5e7eb; border-radius: 8px; font-size: 14px;">
            <option value="">Pilih Jenis</option>
            <option value="sapi" ${e?.jenis_ternak==="sapi"?"selected":""}>Sapi</option>
            <option value="kambing" ${e?.jenis_ternak==="kambing"?"selected":""}>Kambing</option>
            <option value="ayam" ${e?.jenis_ternak==="ayam"?"selected":""}>Ayam</option>
            <option value="bebek" ${e?.jenis_ternak==="bebek"?"selected":""}>Bebek</option>
            <option value="domba" ${e?.jenis_ternak==="domba"?"selected":""}>Domba</option>
          </select>
        </div>

        <div>
          <label style="display: block; margin-bottom: 8px; color: #374151; font-weight: 600;">Ras</label>
          <input type="text" name="ras" value="${e?.ras||""}"
            style="width: 100%; padding: 12px; border: 2px solid #e5e7eb; border-radius: 8px; font-size: 14px;"
            placeholder="Contoh: Limosin">
        </div>

        <div>
          <label style="display: block; margin-bottom: 8px; color: #374151; font-weight: 600;">Jenis Kelamin *</label>
          <select name="jenis_kelamin" required
            style="width: 100%; padding: 12px; border: 2px solid #e5e7eb; border-radius: 8px; font-size: 14px;">
            <option value="">Pilih Kelamin</option>
            <option value="jantan" ${e?.jenis_kelamin==="jantan"?"selected":""}>Jantan</option>
            <option value="betina" ${e?.jenis_kelamin==="betina"?"selected":""}>Betina</option>
          </select>
        </div>

        <div>
          <label style="display: block; margin-bottom: 8px; color: #374151; font-weight: 600;">Tanggal Lahir</label>
          <input type="date" name="tanggal_lahir" value="${e?.tanggal_lahir?e.tanggal_lahir.split("T")[0]:""}"
            style="width: 100%; padding: 12px; border: 2px solid #e5e7eb; border-radius: 8px; font-size: 14px;">
        </div>

        <div>
          <label style="display: block; margin-bottom: 8px; color: #374151; font-weight: 600;">Umur (bulan)</label>
          <input type="number" name="umur_bulan" value="${e?.umur_bulan||""}"
            style="width: 100%; padding: 12px; border: 2px solid #e5e7eb; border-radius: 8px; font-size: 14px;"
            placeholder="0">
        </div>

        <div>
          <label style="display: block; margin-bottom: 8px; color: #374151; font-weight: 600;">Berat Awal (kg)</label>
          <input type="number" step="0.01" name="berat_awal" value="${e?.berat_awal||""}"
            style="width: 100%; padding: 12px; border: 2px solid #e5e7eb; border-radius: 8px; font-size: 14px;"
            placeholder="0.00">
        </div>

        <div>
          <label style="display: block; margin-bottom: 8px; color: #374151; font-weight: 600;">Berat Sekarang (kg)</label>
          <input type="number" step="0.01" name="berat_sekarang" value="${e?.berat_sekarang||""}"
            style="width: 100%; padding: 12px; border: 2px solid #e5e7eb; border-radius: 8px; font-size: 14px;"
            placeholder="0.00">
        </div>

        <div>
          <label style="display: block; margin-bottom: 8px; color: #374151; font-weight: 600;">Kondisi *</label>
          <select name="kondisi" required
            style="width: 100%; padding: 12px; border: 2px solid #e5e7eb; border-radius: 8px; font-size: 14px;">
            <option value="">Pilih Kondisi</option>
            <option value="sehat" ${e?.kondisi==="sehat"?"selected":""}>Sehat</option>
            <option value="sakit" ${e?.kondisi==="sakit"?"selected":""}>Sakit</option>
            <option value="karantina" ${e?.kondisi==="karantina"?"selected":""}>Karantina</option>
            <option value="mati" ${e?.kondisi==="mati"?"selected":""}>Mati</option>
          </select>
        </div>

        <div>
          <label style="display: block; margin-bottom: 8px; color: #374151; font-weight: 600;">Status *</label>
          <select name="status" required
            style="width: 100%; padding: 12px; border: 2px solid #e5e7eb; border-radius: 8px; font-size: 14px;">
            <option value="">Pilih Status</option>
            <option value="aktif" ${e?.status==="aktif"?"selected":""}>Aktif</option>
            <option value="dijual" ${e?.status==="dijual"?"selected":""}>Dijual</option>
            <option value="mati" ${e?.status==="mati"?"selected":""}>Mati</option>
          </select>
        </div>

        <div>
          <label style="display: block; margin-bottom: 8px; color: #374151; font-weight: 600;">Harga Beli</label>
          <input type="number" step="0.01" name="harga_beli" value="${e?.harga_beli||""}"
            style="width: 100%; padding: 12px; border: 2px solid #e5e7eb; border-radius: 8px; font-size: 14px;"
            placeholder="0">
        </div>

        <div style="grid-column: 1 / -1;">
          <label style="display: block; margin-bottom: 8px; color: #374151; font-weight: 600;">URL Foto</label>
          <input type="text" name="foto_ternak" value="${e?.foto_ternak||""}"
            style="width: 100%; padding: 12px; border: 2px solid #e5e7eb; border-radius: 8px; font-size: 14px;"
            placeholder="https://example.com/foto.jpg">
        </div>
      </div>

      <div style="display: flex; gap: 12px; margin-top: 24px;">
        <button type="submit" style="
          flex: 1;
          background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
          color: white;
          border: none;
          padding: 14px;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 600;
          font-size: 16px;
        ">
          <i class="fas fa-save"></i> ${e?"Update":"Simpan"}
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
    `,l.onsubmit=p=>{p.preventDefault(),this.handleTernakSubmit(l,e)};const h=l.querySelector("#cancel-ternak-btn");h&&(h.onclick=()=>this.closeTernakModal()),n.appendChild(i),n.appendChild(l),a.appendChild(n),document.body.appendChild(a),this.ternakModal=a,e&&(this.editingTernakId=e.id)}async handleTernakSubmit(e,t){const a=new FormData(e),n={umkm_id:a.get("umkm_id")?parseInt(a.get("umkm_id")):void 0,kode_ternak:a.get("kode_ternak"),jenis_ternak:a.get("jenis_ternak"),ras:a.get("ras")||void 0,jenis_kelamin:a.get("jenis_kelamin"),tanggal_lahir:a.get("tanggal_lahir")||void 0,umur_bulan:a.get("umur_bulan")?parseInt(a.get("umur_bulan")):void 0,berat_awal:a.get("berat_awal")?parseFloat(a.get("berat_awal")):void 0,berat_sekarang:a.get("berat_sekarang")?parseFloat(a.get("berat_sekarang")):void 0,kondisi:a.get("kondisi"),harga_beli:a.get("harga_beli")?parseFloat(a.get("harga_beli")):void 0,foto_ternak:a.get("foto_ternak")||void 0,status:a.get("status")};try{t?(await _.updateTernak(t.id,n),d("Ternak berhasil diupdate!","success")):(await _.createTernak(n),d("Ternak berhasil ditambahkan!","success")),this.closeTernakModal(),await this.loadTernak(),await this.loadStats()}catch{d(t?"Gagal update ternak":"Gagal menambahkan ternak","error")}}editTernak(e){this.openTernakModal(e)}async deleteTernak(e){if(confirm("Apakah Anda yakin ingin menghapus ternak ini?"))try{await _.deleteTernak(e),d("Ternak berhasil dihapus!","success"),await this.loadTernak(),await this.loadStats()}catch{d("Gagal menghapus ternak","error")}}closeTernakModal(){this.ternakModal&&(this.ternakModal.remove(),this.ternakModal=null),this.editingTernakId=null}createPelatihanPage(){const e=o("div",{style:"height: 100%; display: flex; flex-direction: column;"}),t=o("div",{style:"display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;"}),a=o("h2",{innerHTML:'<i class="fas fa-graduation-cap"></i> Manajemen Pelatihan',style:`color: ${r.colors.dark}; font-size: 28px; margin: 0;`}),n=o("button",{innerHTML:'<i class="fas fa-plus"></i> Tambah Pelatihan',style:`
        background: linear-gradient(135deg, #8B4513 0%, #654321 100%);
        color: white;
        border: none;
        padding: 12px 24px;
        border-radius: 8px;
        cursor: pointer;
        font-weight: 600;
        transition: transform 0.2s, box-shadow 0.2s;
      `});n.onmouseover=()=>{n.style.transform="translateY(-2px)",n.style.boxShadow="0 8px 16px rgba(139, 69, 19, 0.3)"},n.onmouseout=()=>{n.style.transform="translateY(0)",n.style.boxShadow="none"},n.onclick=()=>this.openPelatihanModal(),t.appendChild(a),t.appendChild(n),e.appendChild(t);const i=this.createPelatihanTable();return e.appendChild(i),this.loadPelatihan(),e}createPembiayaanPage(){const e=o("div",{style:"height: 100%; display: flex; flex-direction: column;"}),t=o("div",{style:"display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;"}),a=o("h2",{innerHTML:'<i class="fas fa-money-bill-wave"></i> Manajemen Pembiayaan',style:`color: ${r.colors.dark}; font-size: 28px; margin: 0;`}),n=o("button",{innerHTML:'<i class="fas fa-plus"></i> Ajukan Pembiayaan',style:`
        background: linear-gradient(135deg, #D2691E 0%, #8B4513 100%);
        color: white;
        border: none;
        padding: 12px 24px;
        border-radius: 8px;
        cursor: pointer;
        font-weight: 600;
        transition: transform 0.2s, box-shadow 0.2s;
      `});n.onmouseover=()=>{n.style.transform="translateY(-2px)",n.style.boxShadow="0 8px 16px rgba(210, 105, 30, 0.3)"},n.onmouseout=()=>{n.style.transform="translateY(0)",n.style.boxShadow="none"},n.onclick=()=>this.openPembiayaanModal(),t.appendChild(a),t.appendChild(n),e.appendChild(t);const i=this.createPembiayaanTable();return e.appendChild(i),this.loadPembiayaan(),e}createContent(){const e=o("div",{style:"padding: 30px; height: 100%;"}),t=o("div",{style:"display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; flex-wrap: wrap; gap: 15px;"}),a=o("h2",{textContent:"Manajemen User",style:`color: ${r.colors.dark}; font-size: 28px;`}),n=o("button",{innerHTML:'<i class="fas fa-plus"></i> Tambah User',style:`
        background: ${r.colors.secondary};
        color: white;
        border: none;
        padding: 12px 24px;
        border-radius: 8px;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 8px;
        font-weight: 600;
        transition: all ${r.animation.duration};
      `,onclick:()=>this.openModal()});n.addEventListener("mouseenter",()=>{n.style.transform="translateY(-2px)",n.style.boxShadow="0 5px 15px rgba(16, 185, 129, 0.3)"}),n.addEventListener("mouseleave",()=>{n.style.transform="translateY(0)",n.style.boxShadow="none"}),t.appendChild(a),t.appendChild(n);const i=this.createTable();return e.appendChild(t),e.appendChild(i),e}createTable(){const e=o("div",{style:`
        background: transparent;
        border-radius: 12px;
        overflow: hidden;
        box-shadow: none;
        overflow-x: auto;
      `}),t=o("table",{style:`
        width: 100%;
        border-collapse: collapse;
        min-width: 800px;
        background: white;
        border-radius: 12px;
        overflow: hidden;
        box-shadow: ${r.shadows.sm};
      `}),a=o("thead",{style:`background: ${r.colors.light};`}),n=o("tr");["ID","Username","Email","Role","Verified","Created At","Actions"].forEach(l=>{const h=o("th",{textContent:l,style:`
          padding: 15px;
          text-align: left;
          color: ${r.colors.dark};
          font-weight: 600;
          font-size: 14px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        `});n.appendChild(h)}),a.appendChild(n);const s=o("tbody",{id:"userTableBody"});return this.userTableBody=s,t.appendChild(a),t.appendChild(s),e.appendChild(t),e}async loadUsers(){try{console.log("Loading users from API...");const e=await v.getAllUsers();console.log("Users loaded:",e),this.displayUsers(e)}catch(e){console.error("Error loading users:",e);const t=e instanceof Error?e.message:"Unknown error";if(t.includes("Failed to fetch")||t.includes("NetworkError")||t.toLowerCase().includes("network")?d("Tidak dapat terhubung ke backend. Pastikan server backend berjalan di http://localhost:3000","error"):t.includes("401")||t.includes("Unauthorized")?(d("Session expired. Silakan login kembali","error"),setTimeout(()=>{window.location.href="/"},2e3)):d(`Gagal memuat data user: ${t}`,"error"),this.userTableBody){b(this.userTableBody);const a=o("tr"),n=o("td",{colSpan:7,style:"padding: 40px; text-align: center; color: #9ca3af;",innerHTML:`
            <i class="fas fa-exclamation-circle" style="font-size: 48px; margin-bottom: 16px; display: block; color: #ef4444;"></i>
            <div style="font-size: 16px; font-weight: 600; margin-bottom: 8px;">Tidak dapat memuat data</div>
            <div style="font-size: 14px; margin-bottom: 12px;">Pastikan backend server sudah berjalan di port 3000</div>
            <div style="font-size: 12px; color: #6b7280;">${t}</div>
          `});a.appendChild(n),this.userTableBody.appendChild(a)}}}displayUsers(e){this.userTableBody&&(b(this.userTableBody),e.forEach(t=>{const a=o("tr",{style:"transition: background 0.2s; cursor: pointer;"});a.addEventListener("mouseenter",()=>{a.style.background="#f9fafb"}),a.addEventListener("mouseleave",()=>{a.style.background="transparent"}),[t.id.toString(),t.username,t.email,this.createBadge(t.role),t.is_verified?'<i class="fas fa-check-circle" style="color: #10b981;"></i>':'<i class="fas fa-times-circle" style="color: #ef4444;"></i>',new Date(t.created_at).toLocaleDateString("id-ID"),this.createActionButtons(t.id)].forEach((i,s)=>{const l=o("td",{style:"padding: 15px; border-top: 1px solid #e5e7eb; color: #4b5563;"});typeof i=="string"?l.innerHTML=i:l.appendChild(i),a.appendChild(l)}),this.userTableBody.appendChild(a)}))}createBadge(e){const t={peternak:{bg:"#dbeafe",color:"#1e40af"},investor:{bg:"#d1fae5",color:"#065f46"},penyedia_kios:{bg:"#fef3c7",color:"#92400e"},admin:{bg:"#fee2e2",color:"#991b1b"}},a=t[e]||t.peternak;return`<span style="padding: 4px 12px; border-radius: 12px; font-size: 12px; font-weight: 600; text-transform: capitalize; background: ${a.bg}; color: ${a.color};">${e}</span>`}createActionButtons(e){const t=o("div",{style:"display: flex; gap: 8px;"}),a=o("button",{innerHTML:'<i class="fas fa-edit"></i>',style:`
        width: 36px;
        height: 36px;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        background: #dbeafe;
        color: ${r.colors.primary};
        transition: all 0.2s;
      `,onclick:()=>this.editUser(e)});a.addEventListener("mouseenter",()=>{a.style.background=r.colors.primary,a.style.color="white"}),a.addEventListener("mouseleave",()=>{a.style.background="#dbeafe",a.style.color=r.colors.primary});const n=o("button",{innerHTML:'<i class="fas fa-trash"></i>',style:`
        width: 36px;
        height: 36px;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        background: #fee2e2;
        color: ${r.colors.danger};
        transition: all 0.2s;
      `,onclick:()=>this.deleteUser(e)});return n.addEventListener("mouseenter",()=>{n.style.background=r.colors.danger,n.style.color="white"}),n.addEventListener("mouseleave",()=>{n.style.background="#fee2e2",n.style.color=r.colors.danger}),t.appendChild(a),t.appendChild(n),t}openModal(e){this.editingUserId=e?.id||null;const t=o("div",{style:`
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
      `,onclick:h=>{h.target===t&&this.closeModal()}}),a=o("div",{style:`
        background: white;
        border-radius: 16px;
        width: 90%;
        max-width: 500px;
        animation: slideIn 0.3s ease-out;
      `}),n=o("div",{style:`
        padding: 20px 25px;
        border-bottom: 1px solid #e5e7eb;
        display: flex;
        justify-content: space-between;
        align-items: center;
      `}),i=o("h3",{textContent:e?"Edit User":"Tambah User",style:`color: ${r.colors.dark}; font-size: 20px;`}),s=o("button",{innerHTML:'<i class="fas fa-times"></i>',style:`
        background: none;
        border: none;
        font-size: 24px;
        color: #9ca3af;
        cursor: pointer;
        transition: color 0.2s;
      `,onclick:()=>this.closeModal()});s.addEventListener("mouseenter",()=>{s.style.color=r.colors.dark}),s.addEventListener("mouseleave",()=>{s.style.color="#9ca3af"}),n.appendChild(i),n.appendChild(s);const l=this.createUserForm(e);a.appendChild(n),a.appendChild(l),t.appendChild(a),document.body.appendChild(t),this.modal=t}createUserForm(e){const t=o("form",{onsubmit:g=>this.handleUserSubmit(g)}),a=o("div",{style:"padding: 20px 25px;"});[{id:"username",label:"Username",type:"text",value:e?.username||""},{id:"email",label:"Email",type:"email",value:e?.email||""},{id:"password",label:"Password",type:"password",value:"",placeholder:e?"Kosongkan jika tidak ingin mengubah":"Minimal 6 karakter",required:!e},{id:"nomor_hp",label:"Nomor HP",type:"tel",value:e?.nomor_hp||"",placeholder:"Contoh: 081234567890"}].forEach(g=>{const m=o("div",{style:"margin-bottom: 20px;"}),H=o("label",{textContent:g.label,style:`
          display: block;
          color: ${r.colors.dark};
          font-weight: 600;
          margin-bottom: 8px;
          font-size: 14px;
        `}),k=o("input",{type:g.type,id:g.id,value:g.value,placeholder:g.placeholder||"",required:g.required!==void 0?g.required:!0,style:`
          width: 100%;
          padding: 12px;
          border: 2px solid #e5e7eb;
          border-radius: 8px;
          font-size: 14px;
          transition: all ${r.animation.duration};
          outline: none;
        `});k.addEventListener("focus",()=>{k.style.borderColor=r.colors.primary,k.style.boxShadow="0 0 0 3px rgba(37, 99, 235, 0.1)"}),k.addEventListener("blur",()=>{k.style.borderColor="#e5e7eb",k.style.boxShadow="none"}),m.appendChild(H),m.appendChild(k),a.appendChild(m)});const i=o("div",{style:"margin-bottom: 20px;"}),s=o("label",{textContent:"Role",style:`
        display: block;
        color: ${r.colors.dark};
        font-weight: 600;
        margin-bottom: 8px;
        font-size: 14px;
      `}),l=o("select",{id:"role",required:!0,style:`
        width: 100%;
        padding: 12px;
        border: 2px solid #e5e7eb;
        border-radius: 8px;
        font-size: 14px;
        transition: all ${r.animation.duration};
        outline: none;
      `});["peternak","investor","penyedia_kios","admin"].forEach(g=>{const m=o("option",{value:g,textContent:g.charAt(0).toUpperCase()+g.slice(1).replace("_"," "),selected:e?.role===g});l.appendChild(m)}),l.addEventListener("focus",()=>{l.style.borderColor=r.colors.primary,l.style.boxShadow="0 0 0 3px rgba(37, 99, 235, 0.1)"}),l.addEventListener("blur",()=>{l.style.borderColor="#e5e7eb",l.style.boxShadow="none"}),i.appendChild(s),i.appendChild(l),a.appendChild(i),t.appendChild(a);const p=o("div",{style:`
        padding: 20px 25px;
        border-top: 1px solid #e5e7eb;
        display: flex;
        gap: 10px;
        justify-content: flex-end;
      `}),c=o("button",{type:"button",textContent:"Batal",style:`
        padding: 10px 24px;
        border: none;
        border-radius: 8px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s;
        background: #e5e7eb;
        color: ${r.colors.dark};
      `,onclick:()=>this.closeModal()});c.addEventListener("mouseenter",()=>{c.style.background="#d1d5db"}),c.addEventListener("mouseleave",()=>{c.style.background="#e5e7eb"});const x=o("button",{type:"submit",textContent:"Simpan",style:`
        padding: 10px 24px;
        border: none;
        border-radius: 8px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s;
        background: ${r.colors.primary};
        color: white;
      `});return x.addEventListener("mouseenter",()=>{x.style.background=r.colors.primaryDark}),x.addEventListener("mouseleave",()=>{x.style.background=r.colors.primary}),p.appendChild(c),p.appendChild(x),t.appendChild(p),t}async handleUserSubmit(e){e.preventDefault();const t=document.getElementById("username").value,a=document.getElementById("email").value,n=document.getElementById("password").value,i=document.getElementById("nomor_hp").value,s=document.getElementById("role").value;try{if(this.editingUserId){const l={username:t,email:a,role:s};i&&(l.nomor_hp=i),n&&(l.password=n),await v.updateUser(this.editingUserId,l),d("User berhasil diupdate!","success")}else{if(!n||n.length<6){d("Password minimal 6 karakter!","error");return}await v.createUser({username:t,email:a,password:n,nomor_hp:i||"0",role:s}),d("User berhasil ditambahkan!","success")}this.closeModal(),await this.loadUsers()}catch(l){d(l.message,"error")}}async editUser(e){try{const t=await v.getUserById(e);this.openModal(t)}catch{d("Gagal memuat data user","error")}}async deleteUser(e){if(confirm("Yakin ingin menghapus user ini?"))try{await v.deleteUser(e),d("User berhasil dihapus!","success"),await this.loadUsers()}catch{d("Gagal menghapus user","error")}}createUmkmTable(){const e=o("div",{style:`
        background: transparent;
        border-radius: 12px;
        overflow: hidden;
        box-shadow: none;
        overflow-x: auto;
      `}),t=o("table",{style:`
        width: 100%;
        border-collapse: collapse;
        min-width: 800px;
        background: white;
        border-radius: 12px;
        overflow: hidden;
        box-shadow: ${r.shadows.sm};
      `}),a=o("thead",{style:`background: ${r.colors.light};`}),n=o("tr");["ID","Nama Lengkap","Jenis Usaha","Lokasi","Jenis Peternakan","Created At","Actions"].forEach(l=>{const h=o("th",{textContent:l,style:`
          padding: 15px;
          text-align: left;
          color: ${r.colors.dark};
          font-weight: 600;
          font-size: 14px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        `});n.appendChild(h)}),a.appendChild(n);const s=o("tbody",{id:"umkmTableBody"});return this.umkmTableBody=s,t.appendChild(a),t.appendChild(s),e.appendChild(t),e}async loadUmkm(){try{console.log("Loading UMKM from API...");const e=await y.getAllUmkm();console.log("UMKM loaded:",e),this.displayUmkm(e),this.stats.umkm=e.length}catch(e){console.error("Error loading UMKM:",e);const t=e instanceof Error?e.message:"Unknown error";if(t.includes("Failed to fetch")||t.includes("NetworkError")?d("Tidak dapat terhubung ke backend. Pastikan server backend berjalan di http://localhost:3000","error"):t.includes("401")||t.includes("Unauthorized")?(d("Session expired. Silakan login kembali","error"),setTimeout(()=>{window.location.href="/"},2e3)):d(`Gagal memuat data UMKM: ${t}`,"error"),this.umkmTableBody){b(this.umkmTableBody);const a=o("tr"),n=o("td",{colSpan:7,style:"padding: 40px; text-align: center; color: #9ca3af;",innerHTML:`
            <i class="fas fa-exclamation-circle" style="font-size: 48px; margin-bottom: 16px; display: block; color: #ef4444;"></i>
            <div style="font-size: 16px; font-weight: 600; margin-bottom: 8px;">Tidak dapat memuat data</div>
            <div style="font-size: 14px; margin-bottom: 12px;">Pastikan backend server sudah berjalan di port 3000</div>
            <div style="font-size: 12px; color: #6b7280;">${t}</div>
          `});a.appendChild(n),this.umkmTableBody.appendChild(a)}}}displayUmkm(e){if(this.umkmTableBody){if(b(this.umkmTableBody),e.length===0){const t=o("tr"),a=o("td",{colSpan:7,style:"padding: 40px; text-align: center; color: #9ca3af;",innerHTML:`
          <i class="fas fa-store" style="font-size: 48px; margin-bottom: 16px; display: block;"></i>
          <div style="font-size: 16px; font-weight: 600; margin-bottom: 8px;">Belum ada data UMKM</div>
          <div style="font-size: 14px;">Klik tombol "Tambah UMKM" untuk menambah data baru</div>
        `});t.appendChild(a),this.umkmTableBody.appendChild(t);return}e.forEach(t=>{const a=o("tr",{style:"transition: background 0.2s; cursor: pointer;"});a.addEventListener("mouseenter",()=>{a.style.background="#f9fafb"}),a.addEventListener("mouseleave",()=>{a.style.background="transparent"}),[t.id.toString(),t.nama_lengkap,this.createUmkmBadge(t.jenis_usaha),t.lokasi_peternakan||"-",t.jenis_peternakan_utama||"-",new Date(t.created_at).toLocaleDateString("id-ID"),this.createUmkmActionButtons(t.id)].forEach((i,s)=>{const l=o("td",{style:"padding: 15px; border-top: 1px solid #e5e7eb; color: #4b5563;"});typeof i=="string"?l.innerHTML=i:l.appendChild(i),a.appendChild(l)}),this.umkmTableBody.appendChild(a)})}}createUmkmBadge(e){const t={peternak:"#dbeafe",investor:"#d1fae5",penyedia_kios:"#fef3c7"},a={peternak:"#1e40af",investor:"#065f46",penyedia_kios:"#92400e"};return`<span style="
      background: ${t[e]||"#f3f4f6"};
      color: ${a[e]||"#4b5563"};
      padding: 4px 12px;
      border-radius: 12px;
      font-size: 12px;
      font-weight: 600;
      text-transform: capitalize;
    ">${e.replace("_"," ")}</span>`}createUmkmActionButtons(e){const t=o("div",{style:"display: flex; gap: 8px;"}),a=o("button",{innerHTML:'<i class="fas fa-edit"></i>',style:`
        background: #dbeafe;
        color: #1e40af;
        border: none;
        padding: 8px 12px;
        border-radius: 6px;
        cursor: pointer;
        transition: all 0.2s;
      `,onclick:()=>this.editUmkm(e)}),n=o("button",{innerHTML:'<i class="fas fa-trash"></i>',style:`
        background: #fee2e2;
        color: #dc2626;
        border: none;
        padding: 8px 12px;
        border-radius: 6px;
        cursor: pointer;
        transition: all 0.2s;
      `,onclick:()=>this.deleteUmkm(e)});return t.appendChild(a),t.appendChild(n),t}openUmkmModal(e){this.editingUmkmId=e?.id||null;const t=o("div",{style:`
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
      `}),a=o("div",{style:`
        background: white;
        padding: 30px;
        border-radius: 12px;
        width: 90%;
        max-width: 600px;
        max-height: 90vh;
        overflow-y: auto;
        animation: slideIn 0.3s;
      `}),n=o("h3",{textContent:e?"Edit UMKM":"Tambah UMKM",style:`color: ${r.colors.dark}; margin-bottom: 20px; font-size: 24px;`}),i=o("form",{style:"display: flex; flex-direction: column; gap: 15px;"}),s=o("input",{type:"text",id:"umkm-nama",placeholder:"Nama Lengkap",value:e?.nama_lengkap||"",style:`
        padding: 12px;
        border: 1px solid #e5e7eb;
        border-radius: 8px;
        font-size: 14px;
      `}),l=o("select",{id:"umkm-jenis-usaha",style:`
        padding: 12px;
        border: 1px solid #e5e7eb;
        border-radius: 8px;
        font-size: 14px;
      `});l.innerHTML=`
      <option value="">Pilih Jenis Usaha</option>
      <option value="peternak" ${e?.jenis_usaha==="peternak"?"selected":""}>Peternak</option>
      <option value="investor" ${e?.jenis_usaha==="investor"?"selected":""}>Investor</option>
      <option value="penyedia_kios" ${e?.jenis_usaha==="penyedia_kios"?"selected":""}>Penyedia Kios</option>
    `;const h=o("textarea",{id:"umkm-lokasi",placeholder:"Lokasi Peternakan",value:e?.lokasi_peternakan||"",style:`
        padding: 12px;
        border: 1px solid #e5e7eb;
        border-radius: 8px;
        font-size: 14px;
        min-height: 80px;
        resize: vertical;
      `}),p=o("input",{type:"text",id:"umkm-jenis-peternakan",placeholder:"Jenis Peternakan Utama (contoh: Sapi, Kambing, Ayam)",value:e?.jenis_peternakan_utama||"",style:`
        padding: 12px;
        border: 1px solid #e5e7eb;
        border-radius: 8px;
        font-size: 14px;
      `}),c=o("div",{style:"display: flex; gap: 10px; margin-top: 10px;"}),x=o("button",{type:"submit",textContent:e?"Update":"Simpan",style:`
        flex: 1;
        padding: 12px;
        background: ${r.colors.secondary};
        color: white;
        border: none;
        border-radius: 8px;
        font-weight: 600;
        cursor: pointer;
      `}),g=o("button",{type:"button",textContent:"Batal",style:`
        flex: 1;
        padding: 12px;
        background: #e5e7eb;
        color: #4b5563;
        border: none;
        border-radius: 8px;
        font-weight: 600;
        cursor: pointer;
      `,onclick:()=>this.closeUmkmModal()});c.appendChild(x),c.appendChild(g),i.appendChild(s),i.appendChild(l),i.appendChild(h),i.appendChild(p),i.appendChild(c),i.onsubmit=m=>{m.preventDefault(),this.handleUmkmSubmit()},a.appendChild(n),a.appendChild(i),t.appendChild(a),t.onclick=m=>{m.target===t&&this.closeUmkmModal()},document.body.appendChild(t),this.umkmModal=t}async handleUmkmSubmit(){const e=document.getElementById("umkm-nama").value.trim(),t=document.getElementById("umkm-jenis-usaha").value,a=document.getElementById("umkm-lokasi").value.trim(),n=document.getElementById("umkm-jenis-peternakan").value.trim();if(!e||!t){d("Nama dan Jenis Usaha wajib diisi!","error");return}try{this.editingUmkmId?(await y.updateUmkm(this.editingUmkmId,{nama_lengkap:e,jenis_usaha:t,lokasi_peternakan:a,jenis_peternakan_utama:n}),d("UMKM berhasil diupdate!","success")):(await y.createUmkm({nama_lengkap:e,jenis_usaha:t,lokasi_peternakan:a,jenis_peternakan_utama:n}),d("UMKM berhasil ditambahkan!","success")),this.closeUmkmModal(),await this.loadUmkm()}catch(i){d(i.message,"error")}}async editUmkm(e){try{const t=await y.getUmkmById(e);this.openUmkmModal(t)}catch{d("Gagal memuat data UMKM","error")}}async deleteUmkm(e){if(confirm("Yakin ingin menghapus UMKM ini?"))try{await y.deleteUmkm(e),d("UMKM berhasil dihapus!","success"),await this.loadUmkm()}catch{d("Gagal menghapus UMKM","error")}}closeUmkmModal(){this.umkmModal&&(this.umkmModal.remove(),this.umkmModal=null),this.editingUmkmId=null}createPelatihanTable(){const e=o("div",{style:`
        background: white;
        border-radius: 12px;
        box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        overflow: hidden;
        flex: 1;
        display: flex;
        flex-direction: column;
      `}),t=o("table",{style:`
        width: 100%;
        border-collapse: collapse;
        font-size: 14px;
      `}),a=o("thead");a.innerHTML=`
      <tr style="background: linear-gradient(135deg, #8B4513 0%, #654321 100%); color: white;">
        <th style="padding: 16px; text-align: left; font-weight: 600;">JUDUL</th>
        <th style="padding: 16px; text-align: left; font-weight: 600;">KATEGORI</th>
        <th style="padding: 16px; text-align: left; font-weight: 600;">TINGKAT</th>
        <th style="padding: 16px; text-align: left; font-weight: 600;">DURASI</th>
        <th style="padding: 16px; text-align: left; font-weight: 600;">STATUS</th>
        <th style="padding: 16px; text-align: center; font-weight: 600;">ACTIONS</th>
      </tr>
    `;const n=o("tbody");return this.pelatihanTableBody=n,t.appendChild(a),t.appendChild(n),e.appendChild(t),e}async loadPelatihan(){try{const e=await S.getAllPelatihan();this.displayPelatihan(e)}catch{d("Gagal memuat data pelatihan","error")}}displayPelatihan(e){if(this.pelatihanTableBody){if(b(this.pelatihanTableBody),e.length===0){const t=o("tr");t.innerHTML=`
        <td colspan="6" style="padding: 40px; text-align: center; color: #9ca3af;">
          <i class="fas fa-inbox" style="font-size: 48px; margin-bottom: 16px; display: block;"></i>
          Belum ada data pelatihan
        </td>
      `,this.pelatihanTableBody.appendChild(t);return}e.forEach((t,a)=>{const n=o("tr",{style:`
          border-bottom: 1px solid #f3f4f6;
          transition: background-color 0.2s;
          background: ${a%2===0?"white":"#fafafa"};
        `});n.onmouseover=()=>n.style.background="#fef3c7",n.onmouseout=()=>n.style.background=a%2===0?"white":"#fafafa",n.innerHTML=`
        <td style="padding: 16px; font-weight: 600; color: #374151;">${t.judul_pelatihan}</td>
        <td style="padding: 16px; color: #6b7280;">${t.kategori}</td>
        <td style="padding: 16px; color: #6b7280;">${t.tingkat_kesulitan}</td>
        <td style="padding: 16px; color: #6b7280;">${t.durasi_menit} menit</td>
        <td style="padding: 16px;">
          <span style="background: ${t.is_published?"#d1fae5":"#fee2e2"}; color: ${t.is_published?"#10b981":"#ef4444"}; padding: 6px 12px; border-radius: 6px; font-size: 12px; font-weight: 600;">
            ${t.is_published?"Published":"Draft"}
          </span>
        </td>
      `;const i=o("td",{style:"padding: 16px; text-align: center;"}),s=o("div",{style:"display: flex; gap: 8px; justify-content: center;"}),l=o("button",{innerHTML:'<i class="fas fa-edit"></i>',style:`
          background: #3b82f6;
          color: white;
          border: none;
          padding: 8px 12px;
          border-radius: 6px;
          cursor: pointer;
        `});l.onclick=()=>this.editPelatihan(t.id);const h=o("button",{innerHTML:'<i class="fas fa-trash"></i>',style:`
          background: #ef4444;
          color: white;
          border: none;
          padding: 8px 12px;
          border-radius: 6px;
          cursor: pointer;
        `});h.onclick=()=>this.deletePelatihan(t.id),s.appendChild(l),s.appendChild(h),i.appendChild(s),n.appendChild(i),this.pelatihanTableBody.appendChild(n)})}}async openPelatihanModal(e){const t=o("div",{style:`
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
      `}),a=o("div",{style:`
        background: white;
        padding: 32px;
        border-radius: 16px;
        width: 90%;
        max-width: 600px;
        max-height: 90vh;
        overflow-y: auto;
      `}),n=o("h3",{innerHTML:`<i class="fas fa-graduation-cap"></i> ${e?"Edit":"Tambah"} Pelatihan`,style:`color: ${r.colors.dark}; margin-bottom: 24px; font-size: 24px;`}),i=o("form");i.innerHTML=`
      <div style="display: grid; gap: 16px;">
        <div>
          <label style="display: block; margin-bottom: 8px; font-weight: 600;">Judul Pelatihan *</label>
          <input type="text" name="judul_pelatihan" value="${e?.judul_pelatihan||""}" required
            style="width: 100%; padding: 12px; border: 2px solid #e5e7eb; border-radius: 8px;">
        </div>
        <div>
          <label style="display: block; margin-bottom: 8px; font-weight: 600;">Deskripsi *</label>
          <textarea name="deskripsi" required rows="3"
            style="width: 100%; padding: 12px; border: 2px solid #e5e7eb; border-radius: 8px;">${e?.deskripsi||""}</textarea>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
          <div>
            <label style="display: block; margin-bottom: 8px; font-weight: 600;">Kategori *</label>
            <select name="kategori" required style="width: 100%; padding: 12px; border: 2px solid #e5e7eb; border-radius: 8px;">
              <option value="">Pilih Kategori</option>
              <option value="manajemen_kandang" ${e?.kategori==="manajemen_kandang"?"selected":""}>Manajemen Kandang</option>
              <option value="kesehatan" ${e?.kategori==="kesehatan"?"selected":""}>Kesehatan</option>
              <option value="kewirausahaan" ${e?.kategori==="kewirausahaan"?"selected":""}>Kewirausahaan</option>
              <option value="biosecurity" ${e?.kategori==="biosecurity"?"selected":""}>Biosecurity</option>
            </select>
          </div>
          <div>
            <label style="display: block; margin-bottom: 8px; font-weight: 600;">Tingkat *</label>
            <select name="tingkat_kesulitan" required style="width: 100%; padding: 12px; border: 2px solid #e5e7eb; border-radius: 8px;">
              <option value="">Pilih Tingkat</option>
              <option value="pemula" ${e?.tingkat_kesulitan==="pemula"?"selected":""}>Pemula</option>
              <option value="menengah" ${e?.tingkat_kesulitan==="menengah"?"selected":""}>Menengah</option>
              <option value="lanjutan" ${e?.tingkat_kesulitan==="lanjutan"?"selected":""}>Lanjutan</option>
            </select>
          </div>
        </div>
        <div>
          <label style="display: block; margin-bottom: 8px; font-weight: 600;">Durasi (menit) *</label>
          <input type="number" name="durasi_menit" value="${e?.durasi_menit||""}" required
            style="width: 100%; padding: 12px; border: 2px solid #e5e7eb; border-radius: 8px;">
        </div>
        <div>
          <label style="display: block; margin-bottom: 8px; font-weight: 600;">
            <input type="checkbox" name="is_published" ${e?.is_published?"checked":""}>
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
          <i class="fas fa-save"></i> ${e?"Update":"Simpan"}
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
    `,i.onsubmit=l=>{l.preventDefault(),this.handlePelatihanSubmit(i,e)};const s=i.querySelector("#cancel-btn");s&&(s.onclick=()=>this.closePelatihanModal()),a.appendChild(n),a.appendChild(i),t.appendChild(a),document.body.appendChild(t),this.pelatihanModal=t,e&&(this.editingPelatihanId=e.id)}async handlePelatihanSubmit(e,t){const a=new FormData(e),n={judul_pelatihan:a.get("judul_pelatihan"),deskripsi:a.get("deskripsi"),kategori:a.get("kategori"),tingkat_kesulitan:a.get("tingkat_kesulitan"),durasi_menit:parseInt(a.get("durasi_menit")),is_published:a.get("is_published")==="on"};try{t?(await S.updatePelatihan(t.id,n),d("Pelatihan berhasil diupdate!","success")):(await S.createPelatihan(n),d("Pelatihan berhasil ditambahkan!","success")),this.closePelatihanModal(),await this.loadPelatihan()}catch{d("Gagal menyimpan pelatihan","error")}}async editPelatihan(e){try{const t=await S.getPelatihanById(e);this.openPelatihanModal(t)}catch{d("Gagal memuat data pelatihan","error")}}async deletePelatihan(e){if(confirm("Yakin ingin menghapus pelatihan ini?"))try{await S.deletePelatihan(e),d("Pelatihan berhasil dihapus!","success"),await this.loadPelatihan()}catch{d("Gagal menghapus pelatihan","error")}}closePelatihanModal(){this.pelatihanModal&&(this.pelatihanModal.remove(),this.pelatihanModal=null),this.editingPelatihanId=null}createPembiayaanTable(){const e=o("div",{style:`
        background: white;
        border-radius: 12px;
        box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        overflow: hidden;
        flex: 1;
        display: flex;
        flex-direction: column;
      `}),t=o("table",{style:`
        width: 100%;
        border-collapse: collapse;
        font-size: 14px;
      `}),a=o("thead");a.innerHTML=`
      <tr style="background: linear-gradient(135deg, #D2691E 0%, #8B4513 100%); color: white;">
        <th style="padding: 16px; text-align: left; font-weight: 600;">NO. PENGAJUAN</th>
        <th style="padding: 16px; text-align: left; font-weight: 600;">JENIS</th>
        <th style="padding: 16px; text-align: left; font-weight: 600;">JUMLAH</th>
        <th style="padding: 16px; text-align: left; font-weight: 600;">TENOR</th>
        <th style="padding: 16px; text-align: left; font-weight: 600;">STATUS</th>
        <th style="padding: 16px; text-align: center; font-weight: 600;">ACTIONS</th>
      </tr>
    `;const n=o("tbody");return this.pembiayaanTableBody=n,t.appendChild(a),t.appendChild(n),e.appendChild(t),e}async loadPembiayaan(){try{const e=await C.getAllPembiayaan();this.displayPembiayaan(e)}catch{d("Gagal memuat data pembiayaan","error")}}displayPembiayaan(e){if(this.pembiayaanTableBody){if(b(this.pembiayaanTableBody),e.length===0){const t=o("tr");t.innerHTML=`
        <td colspan="6" style="padding: 40px; text-align: center; color: #9ca3af;">
          <i class="fas fa-inbox" style="font-size: 48px; margin-bottom: 16px; display: block;"></i>
          Belum ada data pembiayaan
        </td>
      `,this.pembiayaanTableBody.appendChild(t);return}e.forEach((t,a)=>{const n=o("tr",{style:`
          border-bottom: 1px solid #f3f4f6;
          transition: background-color 0.2s;
          background: ${a%2===0?"white":"#fafafa"};
        `});n.onmouseover=()=>n.style.background="#fef3c7",n.onmouseout=()=>n.style.background=a%2===0?"white":"#fafafa";const i={pending:{bg:"#fef3c7",color:"#92400e"},disetujui:{bg:"#d1fae5",color:"#10b981"},ditolak:{bg:"#fee2e2",color:"#ef4444"},dicairkan:{bg:"#dbeafe",color:"#3b82f6"}},s=i[t.status_pengajuan]||i.pending;n.innerHTML=`
        <td style="padding: 16px; font-weight: 600; color: #374151;">${t.nomor_pengajuan}</td>
        <td style="padding: 16px; color: #6b7280;">${t.jenis_pembiayaan.replace("_"," ")}</td>
        <td style="padding: 16px; color: #6b7280;">Rp ${(t.jumlah_pengajuan||0).toLocaleString("id-ID")}</td>
        <td style="padding: 16px; color: #6b7280;">${t.tenor_bulan} bulan</td>
        <td style="padding: 16px;">
          <span style="background: ${s.bg}; color: ${s.color}; padding: 6px 12px; border-radius: 6px; font-size: 12px; font-weight: 600;">
            ${t.status_pengajuan}
          </span>
        </td>
      `;const l=o("td",{style:"padding: 16px; text-align: center;"}),h=o("div",{style:"display: flex; gap: 8px; justify-content: center;"}),p=o("button",{innerHTML:'<i class="fas fa-edit"></i>',style:`
          background: #3b82f6;
          color: white;
          border: none;
          padding: 8px 12px;
          border-radius: 6px;
          cursor: pointer;
        `});p.onclick=()=>this.editPembiayaan(t.id);const c=o("button",{innerHTML:'<i class="fas fa-trash"></i>',style:`
          background: #ef4444;
          color: white;
          border: none;
          padding: 8px 12px;
          border-radius: 6px;
          cursor: pointer;
        `});c.onclick=()=>this.deletePembiayaan(t.id),h.appendChild(p),h.appendChild(c),l.appendChild(h),n.appendChild(l),this.pembiayaanTableBody.appendChild(n)})}}async openPembiayaanModal(e){const t=o("div",{style:`
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
      `}),a=o("div",{style:`
        background: white;
        padding: 32px;
        border-radius: 16px;
        width: 90%;
        max-width: 600px;
        max-height: 90vh;
        overflow-y: auto;
      `}),n=o("h3",{innerHTML:`<i class="fas fa-money-bill-wave"></i> ${e?"Edit":"Ajukan"} Pembiayaan`,style:`color: ${r.colors.dark}; margin-bottom: 24px; font-size: 24px;`}),i=o("form");i.innerHTML=`
      <div style="display: grid; gap: 16px;">
        <div>
          <label style="display: block; margin-bottom: 8px; font-weight: 600;">Nomor Pengajuan *</label>
          <input type="text" name="nomor_pengajuan" value="${e?.nomor_pengajuan||""}" required
            style="width: 100%; padding: 12px; border: 2px solid #e5e7eb; border-radius: 8px;">
        </div>
        <div>
          <label style="display: block; margin-bottom: 8px; font-weight: 600;">Jenis Pembiayaan *</label>
          <select name="jenis_pembiayaan" required style="width: 100%; padding: 12px; border: 2px solid #e5e7eb; border-radius: 8px;">
            <option value="">Pilih Jenis</option>
            <option value="modal_usaha" ${e?.jenis_pembiayaan==="modal_usaha"?"selected":""}>Modal Usaha</option>
            <option value="pembelian_ternak" ${e?.jenis_pembiayaan==="pembelian_ternak"?"selected":""}>Pembelian Ternak</option>
            <option value="pakan" ${e?.jenis_pembiayaan==="pakan"?"selected":""}>Pakan</option>
            <option value="infrastruktur" ${e?.jenis_pembiayaan==="infrastruktur"?"selected":""}>Infrastruktur</option>
          </select>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
          <div>
            <label style="display: block; margin-bottom: 8px; font-weight: 600;">Jumlah Pengajuan *</label>
            <input type="number" name="jumlah_pengajuan" value="${e?.jumlah_pengajuan||""}" required
              style="width: 100%; padding: 12px; border: 2px solid #e5e7eb; border-radius: 8px;">
          </div>
          <div>
            <label style="display: block; margin-bottom: 8px; font-weight: 600;">Tenor (bulan) *</label>
            <input type="number" name="tenor_bulan" value="${e?.tenor_bulan||""}" required
              style="width: 100%; padding: 12px; border: 2px solid #e5e7eb; border-radius: 8px;">
          </div>
        </div>
        <div>
          <label style="display: block; margin-bottom: 8px; font-weight: 600;">Tujuan Pembiayaan *</label>
          <textarea name="tujuan_pembiayaan" required rows="3"
            style="width: 100%; padding: 12px; border: 2px solid #e5e7eb; border-radius: 8px;">${e?.tujuan_pembiayaan||""}</textarea>
        </div>
        <div>
          <label style="display: block; margin-bottom: 8px; font-weight: 600;">Status Pengajuan *</label>
          <select name="status_pengajuan" required style="width: 100%; padding: 12px; border: 2px solid #e5e7eb; border-radius: 8px;">
            <option value="pending" ${e?.status_pengajuan==="pending"?"selected":""}>Pending</option>
            <option value="disetujui" ${e?.status_pengajuan==="disetujui"?"selected":""}>Disetujui</option>
            <option value="ditolak" ${e?.status_pengajuan==="ditolak"?"selected":""}>Ditolak</option>
            <option value="dicairkan" ${e?.status_pengajuan==="dicairkan"?"selected":""}>Dicairkan</option>
          </select>
        </div>
        <div>
          <label style="display: block; margin-bottom: 8px; font-weight: 600;">Tanggal Pengajuan *</label>
          <input type="date" name="tanggal_pengajuan" value="${e?.tanggal_pengajuan?e.tanggal_pengajuan.split("T")[0]:""}" required
            style="width: 100%; padding: 12px; border: 2px solid #e5e7eb; border-radius: 8px;">
        </div>
      </div>

      <div style="display: flex; gap: 12px; margin-top: 24px;">
        <button type="submit" style="
          flex: 1;
          background: linear-gradient(135deg, #D2691E 0%, #8B4513 100%);
          color: white;
          border: none;
          padding: 14px;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 600;
        ">
          <i class="fas fa-save"></i> ${e?"Update":"Simpan"}
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
    `,i.onsubmit=l=>{l.preventDefault(),this.handlePembiayaanSubmit(i,e)};const s=i.querySelector("#cancel-btn");s&&(s.onclick=()=>this.closePembiayaanModal()),a.appendChild(n),a.appendChild(i),t.appendChild(a),document.body.appendChild(t),this.pembiayaanModal=t,e&&(this.editingPembiayaanId=e.id)}async handlePembiayaanSubmit(e,t){const a=new FormData(e),n={nomor_pengajuan:a.get("nomor_pengajuan"),jenis_pembiayaan:a.get("jenis_pembiayaan"),jumlah_pengajuan:parseFloat(a.get("jumlah_pengajuan")),tenor_bulan:parseInt(a.get("tenor_bulan")),tujuan_pembiayaan:a.get("tujuan_pembiayaan"),status_pengajuan:a.get("status_pengajuan"),tanggal_pengajuan:a.get("tanggal_pengajuan")};try{t?(await C.updatePembiayaan(t.id,n),d("Pembiayaan berhasil diupdate!","success")):(await C.createPembiayaan(n),d("Pembiayaan berhasil diajukan!","success")),this.closePembiayaanModal(),await this.loadPembiayaan(),await this.loadStats()}catch{d("Gagal menyimpan pembiayaan","error")}}async editPembiayaan(e){try{const t=await C.getPembiayaanById(e);this.openPembiayaanModal(t)}catch{d("Gagal memuat data pembiayaan","error")}}async deletePembiayaan(e){if(confirm("Yakin ingin menghapus pembiayaan ini?"))try{await C.deletePembiayaan(e),d("Pembiayaan berhasil dihapus!","success"),await this.loadPembiayaan(),await this.loadStats()}catch{d("Gagal menghapus pembiayaan","error")}}closePembiayaanModal(){this.pembiayaanModal&&(this.pembiayaanModal.remove(),this.pembiayaanModal=null),this.editingPembiayaanId=null}closeModal(){this.modal&&(this.modal.remove(),this.modal=null),this.editingUserId=null}handleLogout(){f.logout(),this.onLogout()}getElement(){return this.container}}class G{constructor(){this.currentView="login",D();const e=document.getElementById("app");if(!e)throw new Error("App container not found");this.appContainer=e,this.init()}init(){f.isAuthenticated()?this.showDashboard():this.showLogin()}showLogin(){this.currentView="login",b(this.appContainer);const e=new F;e.onRegisterClick=()=>this.showRegister(),e.onLoginSuccess=()=>this.showDashboard(),this.appContainer.appendChild(e.getElement())}showRegister(){this.currentView="register",b(this.appContainer);const e=new K;e.onLoginClick=()=>this.showLogin(),this.appContainer.appendChild(e.getElement())}showDashboard(){this.currentView="dashboard",b(this.appContainer),this.appContainer.style.padding="0",this.appContainer.style.alignItems="flex-start";const e=new N;e.onLogout=()=>{this.appContainer.style.padding="20px",this.appContainer.style.alignItems="center",this.showLogin()},this.appContainer.appendChild(e.getElement())}}function A(){try{console.log("Initializing app..."),new G,console.log("App initialized successfully")}catch(u){console.error("Failed to initialize app:",u),document.body.innerHTML=`
      <div style="padding: 20px; text-align: center; color: red;">
        <h1>Error</h1>
        <p>Failed to initialize application: ${u}</p>
      </div>
    `}}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",A):A();
