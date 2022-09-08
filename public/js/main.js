const statusBtns = document.querySelectorAll('.status');

const updateStatus = async (e) => {
  console.log(e);
  const id = e.target.parentElement.id;
  let status = e.target.innerText.toLowerCase();
  status = status === 'available' ? 'sold' : 'available';

  try {
    console.log(id);
    const res = await fetch('inventory/updateStatus', {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id,
        status,
      }),
    });
    const data = await res.json();
    console.log(data);
    location.reload();
  } catch (err) {
    console.log(err);
  }
};

statusBtns.forEach((btn) => btn.addEventListener('click', updateStatus));
