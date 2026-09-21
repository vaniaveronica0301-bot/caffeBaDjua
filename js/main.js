/**
 * COFFEE BY BADJUA - JAVASCRIPT & JQUERY CONTROLLER
 * Menghandle:
 * 1. Navigasi & Mobile Menu Responsif
 * 2. Filter Kategori Menu Berbasis Animasi jQuery
 * 3. Live Search Menu Realtime
 * 4. Keranjang Pesanan Interaktif & Kalkulator Total Belanja
 * 5. Integrasi Checkout WhatsApp Otomatis
 * 6. Lightbox Modal Foto Dokumentasi Kunjungan/Wawancara UMKM
 * 7. Notifikasi Toast & Back-to-Top Button
 */

$(document).ready(function () {
  'use strict';

  // ==========================================
  // 1. STATE & VARIABEL GLOBAL
  // ==========================================
  let cart = JSON.parse(localStorage.getItem('badjua_cart')) || [];
  const whatsappNumber = '6281234567890'; // Default nomor BaDjua Coffee (dapat disesuaikan)

  // Format Angka ke Format Rupiah (cth: Rp 20.000)
  function formatRupiah(number) {
    return 'Rp ' + number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }

  // Tampilkan Notifikasi Toast
  function showToast(message, iconClass = 'fa-check-circle') {
    const $toast = $('#toastNotification');
    $('#toastMessage').text(message);
    $('#toastIcon').attr('class', 'fas ' + iconClass);

    $toast.addClass('show');
    clearTimeout(window.toastTimer);
    window.toastTimer = setTimeout(function () {
      $toast.removeClass('show');
    }, 2800);
  }

  // ==========================================
  // 2. NAVBAR, SCROLLSPY, & MOBILE TOGGLE
  // ==========================================
  const $navbar = $('#mainNavbar');
  const $backToTop = $('#backToTop');

  $(window).on('scroll', function () {
    const scrollPos = $(this).scrollTop();

    // Sticky shadow navbar
    if (scrollPos > 40) {
      $navbar.addClass('scrolled');
    } else {
      $navbar.removeClass('scrolled');
    }

    // Tampilkan Back to Top Button
    if (scrollPos > 350) {
      $backToTop.addClass('show');
    } else {
      $backToTop.removeClass('show');
    }

    // ScrollSpy Highlight Menu
    $('section[id]').each(function () {
      const top = $(this).offset().top - 120;
      const bottom = top + $(this).outerHeight();
      const id = $(this).attr('id');

      if (scrollPos >= top && scrollPos <= bottom) {
        $('.nav-link').removeClass('active');
        $('.nav-link[href="#' + id + '"]').addClass('active');
      }
    });
  });

  // Mobile Hamburger Toggle
  $('#mobileMenuToggle').on('click', function () {
    $('#navMenu').slideToggle(250).toggleClass('active');
    const isOpen = $('#navMenu').hasClass('active');
    $(this).find('i').toggleClass('fa-bars', !isOpen).toggleClass('fa-times', isOpen);
  });

  // Klik Nav Link pada Mobile Menutup Menu
  $('.nav-link').on('click', function () {
    if ($(window).width() <= 768) {
      $('#navMenu').slideUp(200).removeClass('active');
      $('#mobileMenuToggle').find('i').addClass('fa-bars').removeClass('fa-times');
    }
  });

  // Back to Top Action
  $backToTop.on('click', function (e) {
    e.preventDefault();
    $('html, body').animate({ scrollTop: 0 }, 500);
  });

  // ==========================================
  // 3. FILTER KATEGORI MENU (JQUERY ANIMATION)
  // ==========================================
  $('.filter-btn').on('click', function () {
    $('.filter-btn').removeClass('active');
    $(this).addClass('active');

    const selectedCategory = $(this).data('filter');
    const searchQuery = $('#menuSearchInput').val().toLowerCase().trim();

    filterMenuItems(selectedCategory, searchQuery);
  });

  // ==========================================
  // 4. LIVE SEARCH MENU REALTIME
  // ==========================================
  $('#menuSearchInput').on('keyup input', function () {
    const query = $(this).val().toLowerCase().trim();
    const activeFilter = $('.filter-btn.active').data('filter');

    if (query.length > 0) {
      $('#searchClearBtn').show();
    } else {
      $('#searchClearBtn').hide();
    }

    filterMenuItems(activeFilter, query);
  });

  // Tombol Reset Search
  $('#searchClearBtn').on('click', function () {
    $('#menuSearchInput').val('');
    $(this).hide();
    const activeFilter = $('.filter-btn.active').data('filter');
    filterMenuItems(activeFilter, '');
  });

  // Fungsi Filter & Pencarian Menu Gabungan
  function filterMenuItems(category, query) {
    let visibleCount = 0;

    $('.menu-item-card').each(function () {
      const itemCategory = $(this).data('category');
      const itemName = $(this).find('.item-name').text().toLowerCase();
      const itemDesc = $(this).find('.item-desc').text().toLowerCase();

      const matchCategory = (category === 'all' || itemCategory === category);
      const matchSearch = (query === '' || itemName.includes(query) || itemDesc.includes(query));

      if (matchCategory && matchSearch) {
        $(this).stop(true, true).fadeIn(250);
        visibleCount++;
      } else {
        $(this).stop(true, true).hide();
      }
    });

    // Handle Tampilan Jika Menu Tidak Ditemukan
    if (visibleCount === 0) {
      $('#noMenuFound').fadeIn(250);
    } else {
      $('#noMenuFound').hide();
    }
  }

  // ==========================================
  // 5. KERANJANG PESANAN & SIMULASI CHECKOUT
  // ==========================================

  // Simpan Cart ke LocalStorage
  function saveCart() {
    localStorage.setItem('badjua_cart', JSON.stringify(cart));
    updateCartUI();
  }

  // Render & Update Tampilan Keranjang
  function updateCartUI() {
    const $cartContainer = $('#cartItemsList');
    const $cartCountBadges = $('.cart-count-badge');
    const $cartSubtotal = $('#cartSubtotalText');
    const $cartTotal = $('#cartTotalText');

    // Hitung Total Item & Total Harga
    let totalItems = 0;
    let totalPrice = 0;

    $cartContainer.empty();

    if (cart.length === 0) {
      $('#cartEmptyState').show();
      $('#cartFooterContent').hide();
    } else {
      $('#cartEmptyState').hide();
      $('#cartFooterContent').show();

      cart.forEach(function (item, index) {
        totalItems += item.qty;
        const itemSubtotal = item.price * item.qty;
        totalPrice += itemSubtotal;

        const rowHtml = `
          <div class="cart-item-row" data-index="${index}">
            <div class="cart-item-info">
              <div class="cart-item-name">${item.name}</div>
              <div class="cart-item-variant">${item.variant ? `<i class="fas fa-tag"></i> ${item.variant}` : ''}</div>
              <div class="cart-item-price">${formatRupiah(item.price)}</div>
            </div>
            <div class="cart-qty-ctrls">
              <button class="qty-btn btn-qty-minus" data-index="${index}" title="Kurangi"><i class="fas fa-minus"></i></button>
              <span class="qty-number">${item.qty}</span>
              <button class="qty-btn btn-qty-plus" data-index="${index}" title="Tambah"><i class="fas fa-plus"></i></button>
            </div>
            <button class="btn-remove-item" data-index="${index}" title="Hapus"><i class="fas fa-trash-alt"></i></button>
          </div>
        `;
        $cartContainer.append(rowHtml);
      });
    }

    $cartCountBadges.text(totalItems);
    $cartSubtotal.text(formatRupiah(totalPrice));
    $cartTotal.text(formatRupiah(totalPrice));
  }

  // Tambah Menu ke Keranjang
  $(document).on('click', '.btn-add-order', function () {
    const itemId = $(this).data('id');
    const itemName = $(this).data('name');
    const itemPrice = parseInt($(this).data('price'), 10);
    const itemVariant = $(this).data('variant') || '';

    // Cek apakah item dengan variant sama sudah ada di cart
    const existingIndex = cart.findIndex(function (item) {
      return item.id === itemId && item.variant === itemVariant;
    });

    if (existingIndex > -1) {
      cart[existingIndex].qty += 1;
    } else {
      cart.push({
        id: itemId,
        name: itemName,
        variant: itemVariant,
        price: itemPrice,
        qty: 1
      });
    }

    saveCart();
    showToast(`"${itemName}" berhasil ditambahkan!`, 'fa-cart-plus');

    // Animasi tombol badge cart
    $('.cart-count-badge').css({ transform: 'scale(1.35)' });
    setTimeout(() => $('.cart-count-badge').css({ transform: 'scale(1)' }), 250);
  });

  // Tombol Tambah Qty
  $(document).on('click', '.btn-qty-plus', function () {
    const idx = $(this).data('index');
    if (cart[idx]) {
      cart[idx].qty += 1;
      saveCart();
    }
  });

  // Tombol Kurangi Qty
  $(document).on('click', '.btn-qty-minus', function () {
    const idx = $(this).data('index');
    if (cart[idx]) {
      if (cart[idx].qty > 1) {
        cart[idx].qty -= 1;
      } else {
        cart.splice(idx, 1);
      }
      saveCart();
    }
  });

  // Tombol Hapus Item dari Cart
  $(document).on('click', '.btn-remove-item', function () {
    const idx = $(this).data('index');
    const $row = $(this).closest('.cart-item-row');

    $row.slideUp(200, function () {
      cart.splice(idx, 1);
      saveCart();
      showToast('Item dihapus dari pesanan', 'fa-info-circle');
    });
  });

  // Buka & Tutup Cart Drawer
  function openCartDrawer() {
    $('#cartDrawerBackdrop').addClass('active');
    $('#cartDrawer').addClass('active');
    $('body').css('overflow', 'hidden');
  }

  function closeCartDrawer() {
    $('#cartDrawerBackdrop').removeClass('active');
    $('#cartDrawer').removeClass('active');
    $('body').css('overflow', 'auto');
  }

  $('#cartToggleBtn, #floatingCartBtn, #btnHeroOrder').on('click', function (e) {
    e.preventDefault();
    openCartDrawer();
  });

  $('#closeCartBtn, #cartDrawerBackdrop').on('click', function () {
    closeCartDrawer();
  });

  // ==========================================
  // 6. CHECKOUT VIA WHATSAPP (GENERATOR PESAN)
  // ==========================================
  $('#btnSubmitWhatsappOrder').on('click', function (e) {
    e.preventDefault();

    if (cart.length === 0) {
      alert('Keranjang belanja Anda masih kosong. Silakan pilih menu terlebih dahulu!');
      return;
    }

    const customerName = $('#orderCustomerName').val().trim();
    const tableNumber = $('#orderTableNumber').val().trim() || 'Bungkus / Take Away';
    const notes = $('#orderNotes').val().trim() || '-';

    if (!customerName) {
      alert('Silakan isi Nama Pemesan terlebih dahulu.');
      $('#orderCustomerName').focus();
      return;
    }

    let totalPrice = 0;
    let itemsText = '';

    cart.forEach(function (item, idx) {
      const sub = item.price * item.qty;
      totalPrice += sub;
      const variantStr = item.variant ? ` (${item.variant})` : '';
      itemsText += `${idx + 1}. *${item.name}*${variantStr} x ${item.qty} = ${formatRupiah(sub)}\n`;
    });

    // Format Pesan WhatsApp yang Rapi & Profesional
    const message = `Halo *Coffee by BaDjua*! ☕\n` +
      `Saya ingin memesan menu berikut melalui Website:\n\n` +
      `👤 *Data Pemesan:*\n` +
      `• Nama: *${customerName}*\n` +
      `• No. Meja / Tipe: *${tableNumber}*\n` +
      `• Catatan: ${notes}\n\n` +
      `📋 *Rincian Pesanan:*\n` +
      `${itemsText}\n` +
      `💰 *Total Pembayaran:* *${formatRupiah(totalPrice)}*\n\n` +
      `Mohon konfirmasi pesanan saya. Terima kasih! 🙏`;

    const encodedMessage = encodeURIComponent(message);
    const waUrl = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodedMessage}`;

    // Buka WhatsApp di Tab Baru
    window.open(waUrl, '_blank');

    // Notifikasi sukses
    showToast('Mengarahkan ke WhatsApp...', 'fa-paper-plane');
  });

  // ==========================================
  // 7. LIGHTBOX MODAL DOKUMENTASI (JQUERY)
  // ==========================================
  $('.doc-img-frame, .lightbox-trigger').on('click', function () {
    const imgSrc = $(this).find('img').attr('src') || $(this).data('src');
    const caption = $(this).data('caption') || $(this).closest('.doc-card').find('h4').text();

    $('#lightboxImage').attr('src', imgSrc);
    $('#lightboxCaption').text(caption);
    $('#lightboxModal').addClass('active');
    $('body').css('overflow', 'hidden');
  });

  function closeLightbox() {
    $('#lightboxModal').removeClass('active');
    $('body').css('overflow', 'auto');
  }

  $('#btnCloseLightbox, #lightboxModal').on('click', function (e) {
    if (e.target === this || $(e.target).hasClass('btn-close-lightbox') || $(e.target).closest('.btn-close-lightbox').length) {
      closeLightbox();
    }
  });

  // Tutup Modal via Tombol Escape Keyboard
  $(document).on('keyup', function (e) {
    if (e.key === 'Escape') {
      if ($('#lightboxModal').hasClass('active')) {
        closeLightbox();
      }
      if ($('#cartDrawer').hasClass('active')) {
        closeCartDrawer();
      }
    }
  });

  // ==========================================
  // 8. INTERACTIVE PREVIEW GANTI FOTO DOKUMENTASI
  // Memudahkan mahasiswa mengunggah foto langsung
  // ==========================================
  $('#ownerPhotoInput').on('change', function (e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (event) {
        $('#ownerInterviewPhoto').attr('src', event.target.result);
        showToast('Foto dokumentasi berhasil diperbarui di preview!', 'fa-camera');
      };
      reader.readAsDataURL(file);
    }
  });

  // Inisialisasi Keranjang awal saat halaman dimuat
  updateCartUI();
});
