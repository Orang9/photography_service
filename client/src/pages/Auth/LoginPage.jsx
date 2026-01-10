import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { loginUser } from "../../services/authService";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import Card from "../../components/common/Card";
import { useAuth } from "../../context/AuthContext";

export default function LoginPage() {
  const { onLogin } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await loginUser(email, password);

      const user = {
        id: res.data.user_id,
        username: res.data.username,
        fullname: res.data.fullname,
        email: res.data.email,
        role: res.data.role,
        phone: res.data.phone,
      };

      const token = res.data.token;
      // simpan token
      onLogin(user, token);

      // redirect (contoh)
      navigate("/home");
    } catch (err) {
      setError(err.response?.data?.message || "Login gagal");
    }
  };

  return (
    <div className="min-h-screen bg-[#E8D4C3] flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-heading font-bold text-[#13273F]">
            Assalamu'alaikum
          </h2>
          <p className="text-[#6B7280]">Silakan masuk ke akun Anda</p>
        </div>
        <form onSubmit={handleLogin}>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <Input
            label="Email Address"
            type="email"
            placeholder="nama@email.com"
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border p-2"
            required
          />
          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border p-2"
            required
          />
          <Button
            variant="[#13273F]"
            className="w-full mt-2 border-2 border-[#13273F]"
            onChange={handleLogin}
          >
            Masuk
          </Button>
        </form>
        <p className="text-center mt-6 text-sm text-[#6B7280]">
          Belum punya akun?{" "}
          <Link to="/register" className="text-[#13273F] font-medium">
            Daftar disini
          </Link>
        </p>
      </Card>
    </div>
  );
}
