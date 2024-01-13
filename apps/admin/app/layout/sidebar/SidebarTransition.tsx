'use client';

export default function SidebarTransition() {
  const sidebar = document.querySelector('.sidebar');
  const menu = document.querySelector('.menu');
  const navbarLogo = document.querySelector('.navbar-logo');
  const sidebarLogo = document.querySelector('.sidebar-logo');
  const middlecontent = document.querySelector('.middlecontent');

  if (sidebar && navbarLogo && sidebarLogo) {
    sidebar.classList.toggle('w-80');
    sidebar.classList.toggle('w-0');
    navbarLogo.classList.add('animating');
    sidebarLogo.classList.add('animating');

    setTimeout(() => {
      navbarLogo.classList.remove('animating');
      sidebarLogo.classList.remove('animating');
    }, 300);
    navbarLogo.classList.toggle('hidden');
  }
  if (middlecontent) {
    middlecontent.classList.toggle('ml-80');
    middlecontent.classList.toggle('ml-0');
  }
  if (menu) {
    menu.classList.toggle('visible');
    menu.classList.toggle('invisible');
  }
}
