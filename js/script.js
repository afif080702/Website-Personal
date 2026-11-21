document.addEventListener("DOMContentLoaded", () => {
  // Tandai menu halaman yang sedang aktif.
  const currentPage = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".aliy_menu a").forEach(link => {
    const targetPage = link.getAttribute("href");
    if (targetPage === currentPage) {
      link.classList.add("active");
      link.setAttribute("aria-current", "page");
    } else {
      link.classList.remove("active");
      link.removeAttribute("aria-current");
    }
  });

  // Animasi judul halaman.
  const heading = document.querySelector(".aliy_main h2");
  if (heading) {
    heading.classList.add("fade-in");
  }

  // Atur tindakan tombol berdasarkan teksnya.
  document.querySelectorAll(".aliy_main button").forEach(button => {
    button.addEventListener("click", () => {
      const label = button.textContent.trim().toLowerCase();

      if (label.includes("hubungi") || label.includes("klik saya")) {
        location.href = "kontak.html";
      } else if (label.includes("pelajari lebih lanjut")) {
        location.href = "layanan.html";
      } else if (label.includes("lihat lebih banyak")) {
        location.href = "artikel.html";
      } else if (label.includes("baca selengkapnya")) {
        const article = button.closest(".artikel_item");
        if (!article) return;
        const detail = article.querySelector(".artikel_detail");
        if (detail) {
          detail.hidden = !detail.hidden;
          button.textContent = detail.hidden ? "Baca Selengkapnya" : "Tutup";
        } else {
          const paragraph = article.querySelector("p");
          const extra = document.createElement("p");
          extra.className = "artikel_detail";
          extra.textContent = "Informasi ini merupakan bagian dari perkembangan teknologi digital. Aliy Tech siap membantu Anda memahami dan memanfaatkan teknologi sesuai kebutuhan.";
          paragraph.insertAdjacentElement("afterend", extra);
          button.textContent = "Tutup";
        }
      }
    });
  });

  // Formulir kontak.
  const contactForm = document.getElementById("kontakForm");
  if (contactForm) {
    contactForm.addEventListener("submit", event => {
      event.preventDefault();
      const nama = document.getElementById("nama").value.trim();
      alert(`Terima kasih, ${nama}! Pesan Anda berhasil dicatat.`);
      contactForm.reset();
    });
  }

  // Simpan dan tampilkan pesan buku tamu di browser.
  const guestForm = document.getElementById("aliy_form");
  const output = document.getElementById("aliy_output");
  if (guestForm && output) {
    const renderGuests = () => {
      const guests = JSON.parse(localStorage.getItem("aliyGuestbook") || "[]");
      output.replaceChildren();
      if (guests.length === 0) {
        output.hidden = true;
        output.style.display = "none";
        return;
      }
      output.hidden = false;
      output.style.display = "block";
      const title = document.createElement("h3");
      title.textContent = "Pesan Buku Tamu";
      output.appendChild(title);
      guests.forEach(guest => {
        const item = document.createElement("div");
        item.className = "guest-entry";
        const name = document.createElement("strong");
        name.textContent = guest.nama;
        const email = document.createElement("p");
        email.textContent = guest.email;
        const message = document.createElement("p");
        message.textContent = guest.pesan;
        item.append(name, email, message);
        output.appendChild(item);
      });
    };

    renderGuests();
    guestForm.addEventListener("submit", event => {
      event.preventDefault();
      const nama = document.getElementById("aliy_nama").value.trim();
      const email = document.getElementById("aliy_email").value.trim();
      const pesan = document.getElementById("aliy_pesan").value.trim();
      if (!nama || !email || !pesan) return;

      const guests = JSON.parse(localStorage.getItem("aliyGuestbook") || "[]");
      guests.unshift({ nama, email, pesan });
      localStorage.setItem("aliyGuestbook", JSON.stringify(guests));
      guestForm.reset();
      renderGuests();
      alert("Terima kasih! Pesan Anda tersimpan di buku tamu pada browser ini.");
    });
  }
});
