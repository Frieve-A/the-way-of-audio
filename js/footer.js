document.addEventListener('DOMContentLoaded', () => {
  const footer = document.querySelector('footer.site-footer')
  if (!footer) return
  footer.innerHTML =
    `<nav class="footer-links">` +
    `<a href="https://www.frieve.com" target="_blank" rel="noopener">Frieveのサイト</a>` +
    `<a href="https://github.com/Frieve-A/the-way-of-audio" target="_blank" rel="noopener">GitHub</a>` +
    `<a href="https://ko-fi.com/frievea" target="_blank" rel="noopener">支援する</a>` +
    `</nav>` +
    `© 2026 Frieve`
})
