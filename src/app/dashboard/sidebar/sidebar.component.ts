import { Component, EventEmitter, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: false,
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  @Output() contentChange = new EventEmitter<string>();
  menuItems: any;

  constructor(private router: Router, private sanitizer: DomSanitizer) {
    console.log('Navigating to /home on load');
    // this.router.navigate(['/home']);
    this.menuItems = [
    { name: 'Home', route: '/new-created-template', icon: this.sanitizer.bypassSecurityTrustHtml(`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M6 19h3v-6h6v6h3v-9l-6-4.5L6 10zm-2 2V9l8-6l8 6v12h-7v-6h-2v6zm8-8.75"/></svg>`) },
    { name: 'LLM', route: '/new-llm', icon: this.sanitizer.bypassSecurityTrustHtml(`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<mask id="mask0_15404_6477" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
<rect width="24" height="24" fill="currentColor"/>
</mask>
<g mask="url(#mask0_15404_6477)">
<circle cx="12.5" cy="11.5" r="9.5" stroke="currentColor" stroke-width="2"/>
<path d="M20.1058 8V14H18.4377V10.6894L17.3058 14H15.9101L14.7696 10.6638V14H13.1016V8H15.1186L16.625 11.8979L18.0973 8H20.1058Z" fill="currentColor"/>
<path d="M10.7228 12.7234H12.5866V14H9.05469V8H10.7228V12.7234Z" fill="currentColor"/>
<path d="M6.66808 12.7234H8.53191V14H5V8H6.66808V12.7234Z" fill="currentColor"/>
</g>
</svg>`) },
    { name: 'Integrations', route: '/new-integrations', icon: this.sanitizer.bypassSecurityTrustHtml(`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="2" d="M10 21c-2.5 2.5-5 2-7 0s-2.5-4.5 0-7l3-3l7 7zm4-18c2.5-2.5 5-2 7.001 0s2.499 4.5 0 7l-3 3L11 6zm-3 7l-2.5 2.5zm3 3l-2.5 2.5z"/></svg>`) },
    { name: 'Tools', route: '/new-tools', icon: this.sanitizer.bypassSecurityTrustHtml(`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M6.25 3A3.25 3.25 0 0 0 3 6.25v11.5A3.25 3.25 0 0 0 6.25 21h4.794c.092-.482.323-.942.696-1.314l.186-.186H6.25a1.75 1.75 0 0 1-1.75-1.75V8.5h15v2.532q.258.03.512.085c.47.102.814.412.988.791V6.25A3.25 3.25 0 0 0 17.75 3zm9.744 8.933L14.28 10.22a.75.75 0 1 0-1.06 1.06l1.691 1.692a5.1 5.1 0 0 1 1.083-1.04m-5.214-.653a.75.75 0 1 0-1.06-1.06l-3 3a.75.75 0 0 0 0 1.06l3 3a.75.75 0 1 0 1.06-1.06l-2.47-2.47zm9.019.814c.353.077.44.507.185.762l-1.905 1.904a1.527 1.527 0 0 0 2.16 2.16l1.905-1.904c.255-.255.685-.168.762.185a4.075 4.075 0 0 1-5.57 4.622l-2.729 2.73a1.527 1.527 0 0 1-2.16-2.16l2.73-2.73a4.074 4.074 0 0 1 4.622-5.57"/></svg>`) },
    { name: 'Environment Variables', route: '/environment-variables', icon: this.sanitizer.bypassSecurityTrustHtml(`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M3 6a3 3 0 0 1 3-3a1 1 0 0 1 0 2a1 1 0 0 0-1 1v3.938c0 .789-.307 1.519-.82 2.062c.513.543.82 1.273.82 2.062V18a1 1 0 0 0 1 1a1 1 0 1 1 0 2a3 3 0 0 1-3-3v-3.938a1 1 0 0 0-.757-.97l-.486-.122a1 1 0 0 1 0-1.94l.486-.121A1 1 0 0 0 3 9.939zm18 0a3 3 0 0 0-3-3a1 1 0 1 0 0 2a1 1 0 0 1 1 1v3.938c0 .789.307 1.519.82 2.062a3 3 0 0 0-.82 2.062V18a1 1 0 0 1-1 1a1 1 0 1 0 0 2a3 3 0 0 0 3-3v-3.938a1 1 0 0 1 .758-.97l.485-.122a1 1 0 0 0 0-1.94l-.485-.121a1 1 0 0 1-.758-.97zm-11.71.886a1 1 0 1 0-1.58 1.228L10.734 12l-3.022 3.886a1 1 0 1 0 1.578 1.228L12 13.629l2.71 3.485a1 1 0 0 0 1.58-1.228L13.266 12l3.022-3.886a1 1 0 0 0-1.578-1.228L12 10.371z"/></svg>`) },
    // { name: 'Templates', route: '/templates' },
    { name: 'Usage', route: '/usage', icon: this.sanitizer.bypassSecurityTrustHtml(`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 22q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12q0-3.25 1.875-5.85T8.85 2.525q.725-.25 1.338.175t.612 1.15q0 .5-.287.912t-.738.563Q7.625 6 6.312 7.838T5 12q0 2.925 2.038 4.963T12 19q1.3 0 2.513-.45t2.162-1.3q.375-.35.913-.35t.912.35q.575.525.6 1.188t-.55 1.162q-1.35 1.175-3.012 1.788T12 22m7-10q0-2.3-1.325-4.137T14.2 5.325q-.45-.15-.737-.562t-.288-.913q0-.725.613-1.15t1.337-.175q3.125 1.05 5 3.65T22 12q0 .45-.038.913t-.137 1.012q-.125.725-.737 1.038T19.75 15q-.475-.175-.737-.638t-.163-.962q.075-.425.113-.75T19 12"/></svg>`) },
    { name: 'Billing', route: '/billing',icon: this.sanitizer.bypassSecurityTrustHtml(`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M9.5 10.5H12a1 1 0 0 0 0-2h-1V8a1 1 0 0 0-2 0v.55a2.5 2.5 0 0 0 .5 4.95h1a.5.5 0 0 1 0 1H8a1 1 0 0 0 0 2h1v.5a1 1 0 0 0 2 0v-.55a2.5 2.5 0 0 0-.5-4.95h-1a.5.5 0 0 1 0-1M21 12h-3V3a1 1 0 0 0-.5-.87a1 1 0 0 0-1 0l-3 1.72l-3-1.72a1 1 0 0 0-1 0l-3 1.72l-3-1.72a1 1 0 0 0-1 0A1 1 0 0 0 2 3v16a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3v-6a1 1 0 0 0-1-1M5 20a1 1 0 0 1-1-1V4.73l2 1.14a1.08 1.08 0 0 0 1 0l3-1.72l3 1.72a1.08 1.08 0 0 0 1 0l2-1.14V19a3 3 0 0 0 .18 1Zm15-1a1 1 0 0 1-2 0v-5h2Z"/></svg>`) },
    { name: 'Settings', route: '/settings', icon: this.sanitizer.bypassSecurityTrustHtml(`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none"><circle cx="12" cy="12" r="2" stroke="currentColor" stroke-width="2.5"/><path fill="currentColor" d="m5.399 5.88l.625-1.083a1.25 1.25 0 0 0-1.542.232zM3.4 9.344l-1.195-.369a1.25 1.25 0 0 0 .57 1.451zm-.002 5.311l-.625-1.082a1.25 1.25 0 0 0-.57 1.452zm2 3.464l-.918.85a1.25 1.25 0 0 0 1.543.233zm4.6 2.655H8.75c0 .583.404 1.089.973 1.219zm4.001.002l.278 1.22a1.25 1.25 0 0 0 .972-1.22zM18.6 18.12l-.625 1.082a1.25 1.25 0 0 0 1.542-.232zm1.998-3.466l1.195.369a1.25 1.25 0 0 0-.57-1.451zm.002-5.311l.625 1.082a1.25 1.25 0 0 0 .57-1.452zm-2-3.465l.917-.849a1.25 1.25 0 0 0-1.542-.233zM14 3.225h1.25a1.25 1.25 0 0 0-.972-1.219zm-4-.002l-.278-1.22a1.25 1.25 0 0 0-.972 1.22zm4 1.849h-1.25zm5 8.66l-.625 1.083zm-2 3.464l-.625 1.083zM5 13.732l.625 1.083zm2-6.928l-.625 1.082zm-2.405 2.91a7.74 7.74 0 0 1 1.72-2.985l-1.833-1.7a10.24 10.24 0 0 0-2.276 3.947zm.693 6.161a7.8 7.8 0 0 1-.695-1.589l-2.388.74c.222.719.528 1.422.918 2.099zm1.028 1.396a7.8 7.8 0 0 1-1.028-1.396l-2.165 1.25c.39.676.848 1.293 1.358 1.845zm7.406 2.288a7.74 7.74 0 0 1-3.444-.003l-.556 2.438c1.479.337 3.037.349 4.556.002zm5.683-5.272a7.74 7.74 0 0 1-1.72 2.984l1.833 1.7a10.24 10.24 0 0 0 2.276-3.947zm-.693-6.162c.297.514.527 1.047.695 1.588l2.388-.74a10.3 10.3 0 0 0-.918-2.098zm-1.028-1.397q.58.626 1.028 1.397l2.165-1.25a10.3 10.3 0 0 0-1.359-1.845zm-7.406-2.287a7.74 7.74 0 0 1 3.444.003l.556-2.438a10.24 10.24 0 0 0-4.556-.002zm.972.63V3.224h-2.5v1.849zm-3.625.65l-1.601-.924l-1.25 2.165l1.6.924zm-3.25 6.929l-1.601.924l1.25 2.165l1.6-.924zm1.25-3.465l-1.6-.923l-1.25 2.165l1.6.924zm5.625 11.59v-1.847h-2.5v1.847zm-4.875-4.661l-1.601.924l1.25 2.165l1.6-.924zm12.851.924l-1.601-.924l-1.25 2.165l1.601.924zm-3.976 3.74v-1.85h-2.5v1.85zM19.976 8.26l-1.601.924l1.25 2.165l1.601-.924zm1.248 5.312l-1.599-.924l-1.25 2.166l1.6.923zm-5.974-8.5V3.225h-2.5v1.847zm2.726-.275l-1.601.924l1.25 2.165l1.601-.924zm-5.226.275c0 2.502 2.708 4.065 4.875 2.814l-1.25-2.165a.75.75 0 0 1-1.125-.65zm5.625 4.113c-2.167 1.251-2.167 4.379 0 5.63l1.25-2.165a.75.75 0 0 1 0-1.3zm-.75 6.929c-2.167-1.251-4.875.312-4.875 2.814h2.5a.75.75 0 0 1 1.125-.65zm-6.375 2.814c0-2.502-2.708-4.065-4.875-2.814l1.25 2.165a.75.75 0 0 1 1.125.65zm-5.625-4.113c2.167-1.251 2.167-4.379 0-5.63l-1.25 2.165a.75.75 0 0 1 0 1.3zM8.75 5.072a.75.75 0 0 1-1.125.65l-1.25 2.164c2.167 1.251 4.875-.312 4.875-2.814z"/></g></svg>`) }
    ];
  }

  logout() {
    localStorage.clear();
    this.router.navigate(["/login"]);
  }
}
