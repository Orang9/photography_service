import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import Card from "../../components/common/Card";

export default function RegisterPage() {
  const { onLogin } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [fullname, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await registerUser({
        username,
        fullname,
        email,
        password,
        phone,
        role: "client",
      });

      const user = {
        id: res.data.user_id,
        username: res.data.username,
        fullname: res.data.fullname,
        email: res.data.email,
        role: res.data.role,
        phone: res.data.phone,
      };

      const token = res.data.token;
      // 🔥 AUTO LOGIN
      onLogin(user, token);

      navigate("/home");
    } catch (err) {
      setError(err.response?.data?.message || "Register gagal");
    }
  };

  return (
    <div className="min-h-screen bg-[#E8D4C3] flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-heading font-bold text-[#13273F]">
            Daftar Akun Baru
          </h2>
          <p className="text-[#6B7280]">Bergabunglah dengan Anyfaal</p>
        </div>
        <form onSubmit={handleRegister}>
          {error && <p className="text-red-500 text-sm">{error}</p>}

          <Input
            label="Nama Panggilan"
            placeholder="Fulan"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <Input
            label="Nama Lengkap"
            placeholder="Fulan bin Fulan"
            onChange={(e) => setFullName(e.target.value)}
            required
          />
          <Input
            label="Nomor Telepon"
            placeholder="085733XXXXXX"
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <Input
            label="Email Address"
            type="email"
            placeholder="nama@email.com"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input label="Password" type="password" placeholder="••••••••" />
          <Input
            label="Konfirmasi Password"
            type="password"
            placeholder="••••••••"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button variant="[#13273F]" className="w-full mt-2 border">
            Daftar Sekarang
          </Button>
        </form>
        <p className="text-center mt-6 text-sm text-[#6B7280]">
          Sudah punya akun?{" "}
          <Link to="/login" className="text-[#13273F] font-medium">
            Masuk disini
          </Link>
        </p>
      </Card>
    </div>
  );
}
