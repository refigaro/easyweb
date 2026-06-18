/**
 * Easyweb — Navbar Web Component (light DOM injection)
 *
 * Usage (root pages):    <script src="js/navbar.js"></script>
 * Usage (subdirectories): <script src="../js/navbar.js"></script>
 * Optional back link:    <script src="../js/navbar.js" data-back-label="Our Work" data-back-href="../our-work.html"></script>
 */
(function () {
  var cs         = document.currentScript;
  var backLabel  = cs.dataset.backLabel || '';
  var backHref   = cs.dataset.backHref  || '';

  // Detect path depth: blog/, work/, lp/ → prefix with ../
  var r = /\/(blog|work|lp)\//.test(window.location.pathname) ? '../' : '';

  // ── Desktop "Our Work" link or custom back link ──
  var workLinkDesktop = backLabel
    ? '<a href="' + backHref + '" class="flex items-center gap-1.5 nav-link" style="font-weight:700;color:var(--primario-600)"><i data-lucide="arrow-left" class="w-3.5 h-3.5"></i> ' + backLabel + '</a>'
    : '<a href="' + r + 'our-work.html" class="nav-link">Our Work</a>';

  var workLinkMobile = backLabel
    ? '<a href="' + backHref + '" class="nav-link py-3 block" style="border-bottom:1px solid var(--border-1);font-weight:700;color:var(--primario-600)">← ' + backLabel + '</a>'
    : '<a href="' + r + 'our-work.html" class="nav-link py-3 block" style="border-bottom:1px solid var(--border-1)">Our Work</a>';

  // ── Build nav element ──
  var nav = document.createElement('nav');
  nav.id        = 'navbar';
  nav.className = 'fixed w-full z-50';
  nav.innerHTML = [
    '<div id="navbar-inner" class="w-full">',
    '  <div id="nav-content" class="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">',
    '    <a href="' + r + 'index.html" class="flex items-center">',
    '      <img id="nav-logo" src="' + r + 'brand_assets/logotipo.svg" alt="Easyweb">',
    '    </a>',
    '    <div class="hidden lg:flex items-center gap-8">',
    '      <div class="relative group">',
    '        <button class="nav-link flex items-center gap-1">',
    '          Services <i data-lucide="chevron-down" class="w-3.5 h-3.5 transition-transform group-hover:rotate-180"></i>',
    '        </button>',
    '        <div class="absolute top-full left-0 mt-3 w-52 bg-white rounded-2xl border border-neutral-50 shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 z-50 overflow-hidden">',
    '          <a href="' + r + 'services-corporate.html" class="flex items-center gap-2.5 px-4 py-3 hover:bg-brand-50 text-ink text-sm font-medium transition-colors"><i data-lucide="layout" class="w-4 h-4 flex-shrink-0 text-brand-600"></i> Business Websites</a>',
    '          <a href="' + r + 'services-ecommerce.html" class="flex items-center gap-2.5 px-4 py-3 hover:bg-brand-50 text-ink text-sm font-medium transition-colors border-t border-neutral-50"><i data-lucide="shopping-bag" class="w-4 h-4 flex-shrink-0 text-brand-600"></i> Online Stores</a>',
    '          <a href="' + r + 'services-speed-optimization.html" class="flex items-center gap-2.5 px-4 py-3 hover:bg-brand-50 text-ink text-sm font-medium transition-colors border-t border-neutral-50"><i data-lucide="zap" class="w-4 h-4 flex-shrink-0 text-brand-600"></i> Landing Pages</a>',
    '          <a href="' + r + 'services-care-plan.html" class="flex items-center gap-2.5 px-4 py-3 hover:bg-brand-50 text-ink text-sm font-medium transition-colors border-t-2 border-neutral-50"><i data-lucide="shield-check" class="w-4 h-4 flex-shrink-0 text-brand-600"></i> Monthly Care Plan</a>',
    '        </div>',
    '      </div>',
    '      <a href="' + r + 'pricing.html" class="nav-link">Pricing</a>',
    '      ' + workLinkDesktop,
    '      <a href="' + r + 'blog/index.html" class="nav-link">Blog</a>',
    '      <a href="' + r + 'about.html" class="nav-link">About</a>',
    '    </div>',
    '    <a href="' + r + 'contact.html" class="btn-primary btn-sm hidden md:inline-flex">',
    '      Get a free quote <i data-lucide="arrow-right" class="w-4 h-4"></i>',
    '    </a>',
    '    <button id="mobile-menu-btn" class="lg:hidden text-ink"><i data-lucide="menu" class="w-6 h-6"></i></button>',
    '  </div>',
    '  <div id="mobile-menu" class="lg:hidden hidden flex-col gap-0 bg-white border-t px-6 py-4" style="border-color:var(--border-1)">',
    '    <a href="' + r + 'pricing.html" class="nav-link py-3 block" style="border-bottom:1px solid var(--border-1)">Pricing</a>',
    '    ' + workLinkMobile,
    '    <a href="' + r + 'blog/index.html" class="nav-link py-3 block" style="border-bottom:1px solid var(--border-1)">Blog</a>',
    '    <a href="' + r + 'about.html" class="nav-link py-3 block" style="border-bottom:1px solid var(--border-1)">About</a>',
    '    <a href="' + r + 'services-corporate.html" class="nav-link py-3 block" style="border-bottom:1px solid var(--border-1)">Business Websites</a>',
    '    <a href="' + r + 'services-ecommerce.html" class="nav-link py-3 block" style="border-bottom:1px solid var(--border-1)">Online Stores</a>',
    '    <a href="' + r + 'services-speed-optimization.html" class="nav-link py-3 block" style="border-bottom:1px solid var(--border-1)">Landing Pages</a>',
    '    <a href="' + r + 'services-care-plan.html" class="nav-link py-3 block" style="border-bottom:1px solid var(--border-1)">Monthly Care Plan</a>',
    '    <a href="' + r + 'contact.html" class="btn-primary mt-4 justify-center">Get a free quote <i data-lucide="arrow-right" class="w-4 h-4"></i></a>',
    '  </div>',
    '</div>'
  ].join('\n');

  // Replace the <script> tag with the nav in-place
  cs.replaceWith(nav);

  // ── Behavior (runs after full DOM is available) ──
  document.addEventListener('DOMContentLoaded', function () {
    var btn  = document.getElementById('mobile-menu-btn');
    var menu = document.getElementById('mobile-menu');
    if (!btn || !menu) return;

    var icon = btn.querySelector('i');

    // Hamburger toggle
    btn.addEventListener('click', function () {
      var isOpen = !menu.classList.contains('hidden');
      menu.classList.toggle('hidden', isOpen);
      menu.classList.toggle('flex', !isOpen);
      icon.setAttribute('data-lucide', isOpen ? 'menu' : 'x');
      if (typeof lucide !== 'undefined') lucide.createIcons();
    });

    // Close on any mobile menu link click
    menu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        menu.classList.add('hidden');
        menu.classList.remove('flex');
        icon.setAttribute('data-lucide', 'menu');
        if (typeof lucide !== 'undefined') lucide.createIcons();
      });
    });

    // Scroll: pill effect + logo shrink
    var navbar  = document.getElementById('navbar');
    var navLogo = document.getElementById('nav-logo');
    window.addEventListener('scroll', function () {
      var scrolled = window.scrollY > 20;
      navbar.classList.toggle('scrolled', scrolled);
      if (navLogo) {
        navLogo.style.width  = scrolled ? '160px' : '221px';
        navLogo.style.height = scrolled ? '48px'  : '65px';
      }
    });

    // Mark as initialized so per-file scripts can skip nav setup
    window._ewNavReady = true;
  });
})();
