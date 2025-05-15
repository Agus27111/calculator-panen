function cleanNumber(str) {
  return str.replace(/\D/g, '');
}

function formatRupiah(angka) {
  const number = parseInt(angka, 10);
  if (isNaN(number)) return '';
  return number.toLocaleString('id-ID');
}

function setupAutoFormat(inputId) {
  const input = document.getElementById(inputId);
  input.addEventListener('input', () => {
    const raw = cleanNumber(input.value);
    input.value = formatRupiah(raw);
  });
}

setupAutoFormat('hargaGabah');
setupAutoFormat('biayaKomben');
setupAutoFormat('totalKg');

function hitung() {
  const totalKg = parseFloat(cleanNumber(document.getElementById("totalKg").value)) || 0;
  const rasioPemilik = parseFloat(document.getElementById("rasioPemilik").value) || 1;
  const rasioPekerja = parseFloat(document.getElementById("rasioPekerja").value) || 1;
  const hargaGabah = parseFloat(cleanNumber(document.getElementById("hargaGabah").value)) || 0;
  const biayaKomben = parseFloat(cleanNumber(document.getElementById("biayaKomben").value)) || 0;
  const jumlahPekerja = parseInt(document.getElementById("jumlahPekerja").value) || 1;

  const totalRasio = rasioPemilik + rasioPekerja;
  const bagianPemilikKg = (rasioPemilik / totalRasio) * totalKg;
  const bagianPekerjaKg = (rasioPekerja / totalRasio) * totalKg;

  const potonganKombenKwintal = biayaKomben / hargaGabah;
  const potonganKombenKg = potonganKombenKwintal * 100;
  const sisaUntukPekerjaKg = bagianPekerjaKg - potonganKombenKg;

  const perOrangKg = sisaUntukPekerjaKg / jumlahPekerja;

  document.getElementById("result").innerHTML = `
    <p>Total panen: <strong>${totalKg.toLocaleString("id-ID")} kg</strong></p>
    <p>Bagian pemilik sawah: <strong>${bagianPemilikKg.toFixed(2)} kg</strong></p>
    <p>Bagian pekerja: <strong>${bagianPekerjaKg.toFixed(2)} kg</strong></p>
    <p>Potongan biaya komben (ditanggung pekerja): <strong>${potonganKombenKg.toFixed(2)} kg</strong> (Rp${biayaKomben.toLocaleString("id-ID")})</p>
    <p>Sisa untuk pekerja: <strong>${sisaUntukPekerjaKg.toFixed(2)} kg</strong></p>
    <p>Per pekerja (${jumlahPekerja} orang): <strong>${perOrangKg.toFixed(2)} kg</strong></p>
  `;
}
