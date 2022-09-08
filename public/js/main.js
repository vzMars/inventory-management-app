const statusBtns = document.querySelectorAll('.status');
const body = document.querySelector('body');

statusBtns.forEach((btn) =>
  btn.addEventListener('click', async (e) => {
    console.log(e);
    const id = e.target.parentElement.id;
    let status = e.target.innerText.toLowerCase();
    status = status === 'available' ? 'sold' : 'available';

    try {
      console.log(id);
      const res = await fetch('/inventory/updateStatus', {
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
  })
);

body.addEventListener('click', async (e) => {
  if (e.target.classList.contains('delete-btn')) {
    const id = e.target.parentElement.id;
    try {
      const res = await fetch('/inventory/deleteItem', {
        method: 'delete',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id,
        }),
      });
      const data = await res.json();
      console.log(data);
      location.assign('/inventory');
    } catch (err) {
      console.log(err);
    }
  }
});
