import React from "react";
import './AddLid.css';
import useSetValue from "../../../customHooks/useSetValue";

function AddLid() {

  const { handleChange, inputValues } = useSetValue();
  async function submitForm(e) {
    e.preventDefault();
    await fetch("http://localhost:5000/lids", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(inputValues)
    })
    .catch((err) => {
      if (err) {
        console.error("Error:", err);
        alert("Talabgor qo'shishda xatolik yuz berdi");
      }
    })
    alert("Talabgor qo'shish uchun rahmat! Talabgorlar ro'yxatdan o'tkazildi");
    window.location.reload();
  }

  return (
    <div className="add_form_container">
      <h2 className="add_title">Talabgor qo'shish</h2>
      <form className="admin_form" onSubmit={submitForm}>
        <label className="label" htmlFor="name">
          <span>Ismi: </span>
          <input className="input" type="text" name="name" onChange={handleChange} id="name" required />
        </label>
        <label className="label" htmlFor="surname">
          <span>Familiyasi: </span>
          <input className="input" type="text" name="surname" id="surname"
            onChange={handleChange} required />
        </label>
        <label className="label" htmlFor="phone">
          <span>Telefon: </span>
          <input className="input" type="number" name="phone" onChange={handleChange} id="phone" required />
        </label>
        <label className="label" htmlFor="address">
          <span>Manzili: </span>
          <input className="input" type="text" name="address" onChange={handleChange} id="address" required />
        </label>
        <label className="label" htmlFor="born">
          <span>Tug'ilgan sanasi: </span>
          <input className="input" type="date" name="born" onChange={handleChange} id="born" required />
        </label>
        <label className="label" htmlFor="sub">
          <span>O'qimoqchi bo'lgan fani: </span>
          <input className="input" type="text" name="subject" onChange={handleChange} id="sub" required />
        </label>
        <div className='form_time_group'>
            <label className='label' htmlFor="free_1">
              <span>Bo'sh vaqti ... dan: </span>
              <input className='input' type="time" name="free_1" id="free_1" required />
            </label>
            <label className='label' htmlFor="free_2">
              <span>Gacha: </span>
              <input className='input' type="time" name="free_2" id="free_2" required />
            </label>
          </div>
        <button className="add_btn" type="submit">Talabgorni qo'shish</button>
      </form>
    </div>
  );
}

export default AddLid;