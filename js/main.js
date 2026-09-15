/**
 * Uğur Oto Tamir ve Bakım Servisi - Ana JavaScript Dosyası
 * WhatsApp Etkileşimleri, Mobil Menü ve Dinamik İşlevler
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Otomatik Yıl Güncelleme
  const currentYearSpan = document.getElementById('current-year');
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

  // 2. Mobil Menü Açma / Kapama & Dış Tıklama Kontrolü
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileNav = document.getElementById('mobileNav');

  if (mobileToggle && mobileNav) {
    const toggleMenu = (open) => {
      const shouldOpen = typeof open === 'boolean' ? open : !mobileNav.classList.contains('open');
      mobileNav.classList.toggle('open', shouldOpen);
      mobileToggle.setAttribute('aria-expanded', shouldOpen);
      document.body.style.overflow = shouldOpen ? 'hidden' : '';
    };

    mobileToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMenu();
    });

    // Menü bağlantılarına tıklandığında menüyü kapat
    const mobileLinks = mobileNav.querySelectorAll('.mobile-nav-link');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        toggleMenu(false);
      });
    });

    // Dışarı tıklandığında menüyü kapat
    document.addEventListener('click', (e) => {
      if (mobileNav.classList.contains('open') && !mobileNav.contains(e.target) && e.target !== mobileToggle) {
        toggleMenu(false);
      }
    });

    // ESC tuşuna basıldığında menüyü kapat
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileNav.classList.contains('open')) {
        toggleMenu(false);
      }
    });
  }

  // 3. İnteraktif WhatsApp Fiyat / Arıza Bildirim Formu
  const quoteForm = document.getElementById('whatsappQuoteForm');
  if (quoteForm) {
    quoteForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const carBrand = document.getElementById('carBrand').value.trim();
      const serviceType = document.getElementById('serviceType').value;
      const targetMaster = document.getElementById('targetMaster').value;
      const userNotes = document.getElementById('userNotes').value.trim();

      if (!carBrand) {
        alert('Lütfen araç marka ve modelini belirtiniz.');
        document.getElementById('carBrand').focus();
        return;
      }

      // Mesaj Şablonu Hazırlama
      let message = `🚗 *Uğur Oto Web Sitesi - Servis & Fiyat Talebi*\n\n`;
      message += `• *Araç:* ${carBrand}\n`;
      message += `• *İstenen Hizmet:* ${serviceType}\n`;
      if (userNotes) {
        message += `• *Arıza / Açıklama:* ${userNotes}\n`;
      }
      message += `\nUstam merhaba, bu konu hakkında müsaitlik ve fiyat bilgisi alabilir miyim?`;

      // WhatsApp URL oluşturma ve yeni sekmede açma
      const encodedMsg = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/${targetMaster}?text=${encodedMsg}`;
      window.open(whatsappUrl, '_blank');
    });
  }

  // 4. Hizmet Kartlarındaki "WhatsApp ile Fiyat Al" Butonları
  const serviceButtons = document.querySelectorAll('.service-action-btn');
  serviceButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const serviceName = btn.getAttribute('data-service') || 'Mekanik Bakım';
      const defaultPhone = '905418320044'; // Uğur Usta (Varsayılan Hat)
      const msg = `Merhaba Uğur Usta, uguroto.net üzerinden *${serviceName}* hizmetiniz için fiyat ve randevu bilgisi almak istiyorum.`;
      const url = `https://wa.me/${defaultPhone}?text=${encodeURIComponent(msg)}`;
      window.open(url, '_blank');
    });
  });

  // 5. Scroll Göstergesi ve Header Efekti
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.4)';
    } else {
      header.style.boxShadow = 'none';
    }
  });
});
