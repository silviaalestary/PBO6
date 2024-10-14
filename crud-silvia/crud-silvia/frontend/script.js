const ikanNamaInput = document.getElementById("ikanNama");
const addIkanButton = document.getElementById("addIkan");
const updateIkanButton = document.getElementById("updateIkan");
const ikanList = document.getElementById("ikanList");

let editingIkanId = null; // Menyimpan ID ikan yang sedang diedit

// Fungsi untuk memuat data ikan
function loadIkan() {
  fetch("http://localhost:3000/api/ikan")
    .then((response) => response.json())
    .then((data) => {
      ikanList.innerHTML = "";
      data.forEach((ikan) => {
        const li = document.createElement("li");
        li.className =
          "list-group-item d-flex justify-content-between align-items-center";
        li.textContent = ikan.nama;

        const editButton = document.createElement("button");
        editButton.className = "btn btn-info btn-sm mr-2";
        editButton.textContent = "Edit";
        editButton.onclick = () => editIkan(ikan.id, ikan.nama);

        const deleteButton = document.createElement("button");
        deleteButton.className = "btn btn-danger btn-sm";
        deleteButton.textContent = "Hapus";
        deleteButton.onclick = () => deleteIkan(ikan.id);

        li.appendChild(editButton);
        li.appendChild(deleteButton);
        ikanList.appendChild(li);
      });
    });
}

// Fungsi untuk mengedit ikan
function editIkan(id, nama) {
  editingIkanId = id; // Simpan ID ikan yang sedang diedit
  ikanNamaInput.value = nama; // Set input dengan nama ikan
  addIkanButton.style.display = "none"; // Sembunyikan tombol tambah
  updateIkanButton.style.display = "block"; // Tampilkan tombol update
}

// Fungsi untuk menambah atau memperbarui ikan
const saveIkan = () => {
  const newIkan = { nama: ikanNamaInput.value };
  if (editingIkanId) {
    // Jika sedang mengedit, lakukan update
    fetch(`http://localhost:3000/api/ikan/${editingIkanId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newIkan),
    }).then(() => {
      resetForm(); // Reset form setelah update
      loadIkan(); // Muat ulang daftar ikan
    });
  } else {
    // Jika tidak sedang mengedit, lakukan tambah
    fetch("http://localhost:3000/api/ikan", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newIkan),
    }).then(() => {
      ikanNamaInput.value = "";
      loadIkan(); // Muat ulang daftar ikan
    });
  }
};

addIkanButton.onclick = saveIkan;
updateIkanButton.onclick = saveIkan; // Menggunakan fungsi yang sama untuk tombol update

// Fungsi untuk menghapus ikan
function deleteIkan(id) {
  fetch(`http://localhost:3000/api/ikan/${id}`, {
    method: "DELETE",
  }).then(() => loadIkan());
}

// Fungsi untuk mereset form
function resetForm() {
  ikanNamaInput.value = "";
  editingIkanId = null; // Reset ID setelah update
  addIkanButton.style.display = "block"; // Tampilkan tombol tambah
  updateIkanButton.style.display = "none"; // Sembunyikan tombol update
}

// Muat ikan saat halaman dimuat
loadIkan();
