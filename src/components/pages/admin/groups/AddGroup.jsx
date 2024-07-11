import React, { useState } from 'react'
import useSetValue from '../../../customHooks/useSetValue';
import useFetch from '../../../customHooks/useFetch';

function AddGroup() {

  const { handleChange, inputValues } = useSetValue();
  const [check, setCheck] = useState([]);
  const days = ['Dushanba', 'Seshanba', 'Chorshanba', 'Payshnaba', 'Juma', 'Shanba'];
  const [customDay, setCustomDay] = useState(false);
  const { getData } = useFetch({
    url: "http://localhost:5000/teachers",
    mode: "GET"
  })

  function autoDays(e) {
    const allDays = JSON.parse(e.target.value)
    inputValues.days = allDays
    setCheck([])
  }

  function chosen(e) {
    setCheck(oldDay => {
      if (oldDay.includes(e.target.value)) {
        return oldDay.filter(item => item !== e.target.value);
      } else {
        return [...oldDay, e.target.value];
      }
    });
  };
  if (customDay) {
    inputValues.days = check
  }

  console.log(inputValues, 'aaaaaa');

  async function submitForm(e) {
    e.preventDefault();
    if (customDay && inputValues.days.length < 3) {
      return alert('Hafta kunlari kamida 3 ta bo\'lishi kerak')
    }
    const response = await fetch("http://localhost:5000/groups", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(inputValues)
    })
    if (response.ok && response.status < 300) {
      alert('Guruh yaratildi!')
      window.location.reload()
    } else {
      alert('Guruh yaratishda qandaydir xatolik yuz berdi')
    }
  }
  return (
    <div className="add_form_container">
      <h2 className="add_title">Yangi guruh yaratish</h2>
      <form className="admin_form" onSubmit={submitForm}>
        <div className="group_form_info">
          <label className='label' htmlFor="name">
            <span>Guruh nomi: </span>
            <input className='input' type="text" name="name" onChange={handleChange} id="name" required />
          </label>
          <label className='label' htmlFor="direction">
            <span>Yo'nalishi: </span>
            <input className='input' type="text" name="direction" id="direction"
              onChange={handleChange} required />
          </label>
          <label className='label' htmlFor="price">
            <span>Oylik to'lov narxi: </span>
            <input className='input' type="number" name="price" id="price" onChange={handleChange} required />
          </label>
          <label className='label' htmlFor="teacher">
            <span>O'qituvchisi: </span>
            <select name="teacher" id="teacher" defaultValue={''} onChange={handleChange} required>
              <option disabled value=''>Tanlash...</option>
              {
                getData && getData.map((teacher, index) => (
                  <option key={index} value={teacher._id} onChange={handleChange}>{teacher.name}</option>
                ))
              }
            </select>
          </label>
        </div>

        <div className="group_form_time">
          <label className='label' htmlFor="days">
            <span>Hafta kunlari: </span>
            <div className="day_mode_btn_box">
              <div className={customDay ? 'day_mode_btn day_mode_btn_checked' : 'day_mode_btn'} onClick={() => setCustomDay(false)}>Tavsiya etilgan</div>
              <div className={customDay ? 'day_mode_btn' : 'day_mode_btn day_mode_btn_checked'} onClick={() => setCustomDay(true)}>Qo'lda tanlash</div>
            </div>
            <div className="day_choose_custom">
              {
                customDay ? <div className="days_checkbox_form">
                  {days.map((day, index) => (
                    <div key={index} className="inputGroup">
                      <input id={`option${index}`} name="option1" type="checkbox" value={day} onChange={chosen} />
                      <label htmlFor={`option${index}`}>{day}</label>
                    </div>
                  ))}
                </div> :
                  <select name="days" id='days' onChange={autoDays} defaultValue={''} required={!customDay}>
                    <option disabled value=''>Tanlash...</option>
                    <option value={JSON.stringify([days[0], days[2], days[4]])}>Haftaning toq kunlari</option>
                    <option value={JSON.stringify([days[1], days[3], days[5]])}>Haftaning juft kunlari</option>
                    <option value={JSON.stringify(days)}>Har kuni (6 kun)</option>
                  </select>
              }
            </div>
          </label>
          <label className='label' htmlFor="start">
            <span>Boshlanish sanasi: </span>
            <input className='input' type="date" name="start" id="start" onChange={handleChange} required />
          </label>
          <div className='form_time_group'>
            <label className='label' htmlFor="start_time">
              <span>Dars boshlanish soati: </span>
              <input className='input' type="time" name="time_1" id="start_time" onChange={handleChange} required />
            </label>
            <label className='label' htmlFor="end_time">
              <span>Dars tugash soati: </span>
              <input className='input' type="time" name="time_2" id="end_time" onChange={handleChange} required />
            </label>
          </div>
        </div>
        <button className="add_btn" type="submit">Talabgorni qo'shish</button>
      </form>
    </div>
  )
}

export default AddGroup