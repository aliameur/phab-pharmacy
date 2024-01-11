'use client';

export default function SidebarTransition() {
  const sidebar = document.querySelector('.sidebar');
  const menu = document.querySelector('.menu');
  if (sidebar) {
    sidebar.classList.toggle('w-80');
    sidebar.classList.toggle('w-0');
  }
  if (menu) {
    menu.classList.toggle('visible');
    menu.classList.toggle('invisible');
  }
}
