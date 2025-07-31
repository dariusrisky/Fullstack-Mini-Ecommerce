import React from 'react'

export default function Reminder({renderFormRegister, renderFormLogin, closereminder}) {
  return (
    <div className='p-4 bg-purple-950 text-white'>
        Bergabung dengan kami dengan mendaftar akun di <b>weeCommerceLTE</b>
        <input type="button" onClick={renderFormRegister} value="Dapatkan Akun" className='bg-green-200 text-sm mx-5 text-black font-semibold p-2 rounded cursor-pointer' />
        dan<input type="button" onClick={renderFormLogin} value="Masuk" className='bg-green-200 text-sm mx-5 text-black font-semibold p-2 rounded cursor-pointer' />
        <button className='bg-black text-sm p-1 ' onClick={closereminder}>x</button>
    </div>
  )
}
