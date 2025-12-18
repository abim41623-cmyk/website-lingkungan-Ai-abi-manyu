/**
 * EcoVision AI - Core Logic
 * Mengatur deteksi kamera, sistem poin, dan interaksi UI
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. SIMULASI DETEKSI AI (Kamera)
    const startScanBtn = document.querySelector('.btn-primary'); // Tombol di Hero Section
    
    if (startScanBtn) {
        startScanBtn.addEventListener('click', () => {
            simulateAICamera();
        });
    }

    function simulateAICamera() {
        // Menampilkan overlay loading atau memicu fungsi kamera
        console.log("Memulai sistem pemindaian AI...");
        alert("Membuka Kamera... (Fungsi ini membutuhkan akses kamera pada browser Anda)");
        
        // Logika sederhana simulasi klasifikasi
        const items = ['Plastik PET', 'Kertas Karton', 'Sisa Organik', 'Limbah B3'];
        const randomItem = items[Math.floor(Math.random() * items.length)];
        
        setTimeout(() => {
            alert(`AI Berhasil Mengidentifikasi: ${randomItem}\nKeakuratan: 98.5%`);
            addGreenPoints(10); // Memberikan poin setelah scan
        }, 2000);
    }

    // 2. SISTEM GREEN POINTS (Edukasi & Gamifikasi)
    let userPoints = localStorage.getItem('ecoPoints') || 0;

    function addGreenPoints(amount) {
        userPoints = parseInt(userPoints) + amount;
        localStorage.setItem('ecoPoints', userPoints);
        updatePointDisplay();
        
        // Notifikasi Toast Sederhana
        showToast(`Selamat! +${amount} Green Points terkumpul.`);
    }

    function updatePointDisplay() {
        const pointElement = document.getElementById('user-points');
        if (pointElement) {
            pointElement.innerText = userPoints;
        }
    }

    // 3. SMOOTH SCROLL UNTUK NAVIGASI
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // 4. ANIMASI ANGKA STATISTIK (Counter)
    const stats = document.querySelectorAll('.font-bold.text-xl');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const countTo = parseInt(target.innerText.replace(/\D/g, ''));
                animateValue(target, 0, countTo, 2000);
                observer.unobserve(target);
            }
        });
    }, { threshold: 0.5 });

    stats.forEach(stat => observer.observe(stat));

    function animateValue(obj, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            obj.innerHTML = Math.floor(progress * (end - start) + start).toLocaleString() + "+";
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    // 5. FUNGSI TOAST NOTIFIKASI
    function showToast(message) {
        const toast = document.createElement('div');
        toast.className = "fixed bottom-5 right-5 bg-emerald-600 text-white px-6 py-3 rounded-lg shadow-2xl transition-all transform translate-y-20 opacity-0 z-[100]";
        toast.innerHTML = `<i class="fa-solid fa-circle-check mr-2"></i> ${message}`;
        document.body.appendChild(toast);

        // Munculkan
        setTimeout(() => {
            toast.classList.remove('translate-y-20', 'opacity-0');
        }, 100);

        // Hilangkan
        setTimeout(() => {
            toast.classList.add('translate-y-20', 'opacity-0');
            setTimeout(() => toast.remove(), 500);
        }, 3000);
    }
});
