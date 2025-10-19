document.querySelectorAll('.accordion-toggle').forEach(button => {
  button.addEventListener('click', () => {
    const expanded = button.getAttribute('aria-expanded') === 'true';
    const accordion = button.closest('.accordion');
    const contentId = button.getAttribute('aria-controls');
    const content = document.getElementById(contentId);

    // Close all accordions
    document.querySelectorAll('.accordion-content').forEach(panel => {
      panel.style.maxHeight = null;
      panel.classList.remove('open');
    });
    document.querySelectorAll('.accordion-toggle').forEach(btn => {
      btn.setAttribute('aria-expanded', 'false');
    });
    document.querySelectorAll('.accordion').forEach(acc => {
      acc.classList.remove('active');
    });

    if (!expanded) {
      // open this accordion
      button.setAttribute('aria-expanded', 'true');
      content.style.maxHeight = content.scrollHeight + 'px';
      content.classList.add('open');
      accordion.classList.add('active');
    }
  });
});
