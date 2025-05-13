// Fungsi untuk menghapus karakter non-angka
function cleanNumber(str) {
  return str.replace(/\D/g, "");
}

// Format angka ke Rupiah Indonesia (1.400.000)
function formatRupiah(angka) {
  const number = parseInt(angka, 10);
  if (isNaN(number)) return "";
  return number.toLocaleString("id-ID");
}

// Format semua input angka otomatis
function setupAutoFormat(inputId) {
  const input = document.getElementById(inputId);
  input.addEventListener("input", () => {
    const raw = cleanNumber(input.value);
    input.value = formatRupiah(raw);
  });
}

// Pasang ke semua input angka yang ingin diformat
setupAutoFormat("hargaGabah");
setupAutoFormat("biayaKomben");
setupAutoFormat("totalTon");

function hitung() {
  // Ambil dan bersihkan nilai dari input
  const totalTon =
    parseFloat(cleanNumber(document.getElementById("totalTon").value)) || 0;
  const rasioPemilik =
    parseFloat(document.getElementById("rasioPemilik").value) || 1;
  const rasioPekerja =
    parseFloat(document.getElementById("rasioPekerja").value) || 1;
  const hargaGabah =
    parseFloat(cleanNumber(document.getElementById("hargaGabah").value)) || 0;
  const biayaKomben =
    parseFloat(cleanNumber(document.getElementById("biayaKomben").value)) || 0;
  const jumlahPekerja =
    parseInt(document.getElementById("jumlahPekerja").value) || 1;

  const totalKwintal = totalTon * 10;
  const totalRasio = rasioPemilik + rasioPekerja;
  const bagianPemilik = (rasioPemilik / totalRasio) * totalKwintal;
  const bagianPekerja = (rasioPekerja / totalRasio) * totalKwintal;

  // Hitung potongan biaya komben (dilakukan pada pekerja)
  const potonganKomben = biayaKomben / hargaGabah; // dalam kwintal
  const sisaUntukPekerja = bagianPekerja - potonganKomben;

  // Pembagian pekerja berdasarkan jumlah orang
  const perOrang = sisaUntukPekerja / jumlahPekerja;

  document.getElementById("result").innerHTML = `
      <p>Total panen: <strong>${totalKwintal.toLocaleString(
        "id-ID"
      )} kwintal</strong></p>
      <p>Bagian pemilik sawah: <strong>${bagianPemilik.toFixed(
        2
      )} kwintal</strong></p>
      <p>Bagian pekerja: <strong>${bagianPekerja.toFixed(
        2
      )} kwintal</strong></p>
      <p>Potongan biaya komben (ditanggung pekerja): <strong>${potonganKomben.toFixed(
        2
      )} kwintal</strong> (Rp${biayaKomben.toLocaleString("id-ID")})</p>
      <p>Sisa untuk pekerja: <strong>${sisaUntukPekerja.toFixed(
        2
      )} kwintal</strong></p>
      <p>Per pekerja (${jumlahPekerja} orang): <strong>${perOrang.toFixed(
    2
  )} kwintal</strong></p>
    `;
}
