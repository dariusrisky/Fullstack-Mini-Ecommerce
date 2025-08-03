import React, { useState } from "react";
import RiwayatBelanja from "./RiwayatBelanja";
import UpdateProfile from "./form/updateProfile";
import ResetPasssword from "./form/resetPasssword";
import TokoUser from "./TokoUser";

export default function ProfileMain({ user }) {
  const [showUpdate, setShowUpdate] = useState(false);
  const [showReset, setShowReset] = useState(false);
  const [showBergabung, setShowBergabung] = useState(false);

  return (
    <div className="p-4 sm:p-6 md:p-8">
      <main className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-sm space-y-10">
        <section>
          <h2 className="text-xl font-bold text-gray-800 border-b border-black pb-2">
            Informasi
          </h2>
          {user.role === "USER" ? (
            <p className="mt-4 text-gray-600">
              Tingkatkan potensi Anda dan raih lebih banyak pelanggan!
              Bergabunglah bersama kami sebagai penjual dan nikmati kemudahan
              mengelola produk serta menjangkau pasar yang lebih luas.
              <a
                onClick={() => setShowBergabung(true)}
                className="text-blue-600"
              >
                Bergabung Menjadi TOKO {user.name}
              </a>
              {showBergabung && (
                <TokoUser
                  onClose={() => setShowBergabung(false)}
                  renderFormLogin={() => setShowBergabung(false)}
                  setShowReminder={() => setShowBergabung(false)}
                ></TokoUser>
              )}
            </p>
          ) : (
            <p className="mt-4 text-gray-600">
              Tingkatkan potensi Anda dan raih lebih banyak pelanggan!
              Bergabunglah bersama kami sebagai penjual dan nikmati kemudahan
              mengelola produk serta menjangkau pasar yang lebih luas.
            </p>
          )}
          <button
            onClick={() => setShowUpdate(true)}
            className="mt-5 mr-5 bg-green-600 text-white font-semibold px-5 py-2 rounded-md hover:bg-green-700 transition-colors"
          >
            Update Profile
          </button>
          {showUpdate && (
            <UpdateProfile
              data={user}
              renderUpdateForm={() => setShowUpdate(false)}
            ></UpdateProfile>
          )}
          {showReset && (
            <ResetPasssword
              renderResetForm={() => setShowReset(false)}
            ></ResetPasssword>
          )}
          <button
            onClick={() => setShowReset(true)}
            className="mt-5 bg-red-600 text-white font-semibold px-5 py-2 rounded-md hover:bg-red-700 transition-colors"
          >
            Reset Password
          </button>
        </section>
      </main>
      <RiwayatBelanja></RiwayatBelanja>
    </div>
  );
}
