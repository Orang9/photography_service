import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // cek login saat refresh
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (storedUser && storedUser !== "undefined" && token) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (err) {
        console.error("User data rusak di localStorage");
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      }
    }
  }, []);

  // Fitur Auto Logout jika tidak ada aktivitas selama 15 menit
  useEffect(() => {
    if (!user) return; // Hanya jalankan jika user sedang login

    let timeoutId;

    const logoutUser = () => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setUser(null);
      alert("Sesi Anda telah berakhir karena tidak ada aktivitas selama 15 menit. Silakan login kembali.");
    };

    const resetTimer = () => {
      if (timeoutId) clearTimeout(timeoutId);
      // Set timer untuk 15 menit (15 * 60 * 1000 = 900000 ms)
      timeoutId = setTimeout(logoutUser, 900000);
    };

    // Daftar event yang dianggap sebagai aktivitas user
    const events = ["mousemove", "mousedown", "keypress", "scroll", "touchstart"];
    
    // Tambahkan event listener
    events.forEach((event) => window.addEventListener(event, resetTimer));

    // Inisialisasi timer pertama kali
    resetTimer();

    // Cleanup saat komponen unmount atau user logout
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      events.forEach((event) => window.removeEventListener(event, resetTimer));
    };
  }, [user]);

  // 🔥 INI YANG KAMU TANYAKAN
  const onLogin = (user, token) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
  };

  const onLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        onLogin,
        onLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
