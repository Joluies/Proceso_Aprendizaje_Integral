document.addEventListener('DOMContentLoaded', () => {
    const beforeAfterContainer = document.querySelector('.before-after-container');
    const afterImage = document.querySelector('.after-image');
    const resizeHandle = document.querySelector('.resize-handle');

    let isDragging = false;

    // --- Eventos para escritorio (ratón) ---
    resizeHandle.addEventListener('mousedown', (e) => {
        isDragging = true;
        resizeHandle.classList.add('dragging'); // Añade clase para estilos visuales al arrastrar
        e.preventDefault(); // Evita la selección de texto
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;

        const containerRect = beforeAfterContainer.getBoundingClientRect();
        // Calcula la posición del cursor relativa al contenedor
        let handlePosition = e.clientX - containerRect.left;

        // Limita la posición de la línea dentro del contenedor
        if (handlePosition < 0) {
            handlePosition = 0;
        } else if (handlePosition > containerRect.width) {
            handlePosition = containerRect.width;
        }

        // Calcula el porcentaje para el clip-path
        const clipPercentage = (handlePosition / containerRect.width) * 100;
        afterImage.style.clipPath = `polygon(0 0, ${clipPercentage}% 0, ${clipPercentage}% 100%, 0 100%)`;
        resizeHandle.style.left = `${handlePosition}px`;
        resizeHandle.style.transform = `translateX(-50%)`; // Mantener el centro de la línea
    });

    document.addEventListener('mouseup', () => {
        if (!isDragging) return;
        isDragging = false;
        resizeHandle.classList.remove('dragging'); // Remueve estilos de arrastre
    });

    // --- Eventos para dispositivos táctiles ---
    resizeHandle.addEventListener('touchstart', (e) => {
        isDragging = true;
        resizeHandle.classList.add('dragging');
        e.preventDefault(); // Evita el scroll y otros comportamientos táctiles por defecto
    }, { passive: false }); // Usar { passive: false } para permitir preventDefault

    document.addEventListener('touchmove', (e) => {
        if (!isDragging) return;

        const touch = e.touches[0]; // Obtiene el primer toque
        const containerRect = beforeAfterContainer.getBoundingClientRect();
        let handlePosition = touch.clientX - containerRect.left;

        // Limita la posición
        if (handlePosition < 0) {
            handlePosition = 0;
        } else if (handlePosition > containerRect.width) {
            handlePosition = containerRect.width;
        }

        const clipPercentage = (handlePosition / containerRect.width) * 100;
        afterImage.style.clipPath = `polygon(0 0, ${clipPercentage}% 0, ${clipPercentage}% 100%, 0 100%)`;
        resizeHandle.style.left = `${handlePosition}px`;
        resizeHandle.style.transform = `translateX(-50%)`;
        e.preventDefault(); // Previene el scroll de la página al arrastrar
    }, { passive: false });

    document.addEventListener('touchend', () => {
        if (!isDragging) return;
        isDragging = false;
        resizeHandle.classList.remove('dragging');
    });

    // Ajustar el tamaño inicial del after-image y el handle si el contenedor cambia de tamaño
    window.addEventListener('resize', () => {
        const containerRect = beforeAfterContainer.getBoundingClientRect();
        const handlePosition = containerRect.width / 2; // Vuelve a centrar
        afterImage.style.clipPath = `polygon(0 0, 50% 0, 50% 100%, 0 100%)`;
        resizeHandle.style.left = `${handlePosition}px`;
        resizeHandle.style.transform = `translateX(-50%)`;
    });
});