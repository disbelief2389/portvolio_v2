// Sidebar functionality
function initializeSidebar() {
    const navbar = document.getElementById('navbar-nav');
    const openBtn = document.getElementById('open-sidebar-button');
    const closeBtn = document.getElementById('close-sidebar-button');
    const html = document.documentElement;
    // const audioControls = document.getElementById('audio-controls');
    // const overlay = document.getElementById('overlay');
  
  
    function updateButtonStates () {
      if (navbar.classList.contains('show')) {
        
        html.style.overflow = 'hidden';

        // when sidebar is open:
        openBtn.style.opacity = 0;
        openBtn.style.pointerEvents = 'none';
        closeBtn.style.opacity = 1;
        closeBtn.style.pointerEvents = 'auto';
  
        // if (audioControls) {
        //   audioControls.style.opacity = 0;
        //   setTimeout(() => {
        //     audioControls.classList.add('hidden');
        //   }, 300);
        // }
        overlay.style.display = 'block';
        overlay.style.pointerEvents = 'auto';
        setTimeout(() => {
            overlay.style.opacity = 1;
        }, 50);
  
      } else {
  
        // when sidebar is closed:
        openBtn.style.opacity = 1;
        openBtn.style.pointerEvents = 'auto';
        closeBtn.style.opacity = 0;
        closeBtn.style.pointerEvents = 'none';
  
        // if (audioControls) {
        //   audioControls.style.opacity = 1;
        //   setTimeout(() => {
        //     audioControls.classList.remove('hidden');
        //   }, 300);
        // }
        overlay.style.opacity = 0;
        overlay.style.pointerEvents = 'none';
        setTimeout(() => {
            overlay.style.display = 'none';
        }, 300)
      }
    }
  
    function openSidebar() {
        navbar.classList.add('show');
        updateButtonStates();
    }
  
    function closeSidebar() {
        navbar.classList.remove('show');
        updateButtonStates();
    }
  
    openBtn.addEventListener('click', openSidebar);
    closeBtn.addEventListener('click', closeSidebar);
    overlay.addEventListener('click', closeSidebar);
}