const emailButton = document.getElementById('emailButton');

if (emailButton) {
  emailButton.addEventListener('click', () => {
    window.location.href = 'mailto:hello@pbggloballexim.com';
  });
}
