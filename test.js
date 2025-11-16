document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll('#main-nav a[data-filter]');
    const items   = document.querySelectorAll('.work-grid li');
  
    buttons.forEach(button => {
  
      button.addEventListener("click", e => {
        e.preventDefault();
  
        const filter = button.dataset.filter;
  
        // aktiven Button markieren
        buttons.forEach(b => b.classList.remove("active"));
        button.classList.add("active");
  
        items.forEach(item => {
          const cat = item.dataset.cat;
  
          if (filter === "all" || filter === cat) {
            item.classList.remove("is-blurred");
          } else {
            item.classList.add("is-blurred");
          }
        });
  
      });
  
    });
  });
  