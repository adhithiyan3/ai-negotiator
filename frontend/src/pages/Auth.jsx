import { useState } from "react";
import { loginUser, registerUser } from "../api/auth";
import { Input } from "../components/ui/ui/Input";
import { Button } from "../components/ui/ui/Button";
import { Card, CardContent, CardHeader } from "../components/ui/ui/Card";
import { Tabs, Tab } from "../components/ui/ui/Tabs";

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    role: "buyer",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (isLogin) {
        const data = await loginUser(formData.email, formData.password);
        console.log("Login Successful:", data);
      } else {
        const data = await registerUser(formData);
        console.log("Registration Successful:", data);
      }
    } catch (err) {
      setError(err);
    }

    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 w-full">
      <Card className="w-full max-w-md p-6 bg-white shadow-xl rounded-xl">
        <CardHeader className="text-center">
          <h2 className="text-2xl font-bold text-gray-800">{isLogin ? "Login" : "Sign Up"}</h2>
        </CardHeader>
        <CardContent>
          <Tabs value={isLogin ? "login" : "signup"} onValueChange={(val) => setIsLogin(val === "login")}>
            <Tab value="login" label="Login" />
            <Tab value="signup" label="Sign Up" />
          </Tabs>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            {!isLogin && <Input placeholder="Name" name="name" value={formData.name} onChange={handleChange} required />}
            {!isLogin && <Input placeholder="Phone" name="phone" value={formData.phone} onChange={handleChange} required />}
            <Input placeholder="Email" type="email" name="email" value={formData.email} onChange={handleChange} required />
            <Input placeholder="Password" type="password" name="password" value={formData.password} onChange={handleChange} required />
            {!isLogin && (
              <select name="role" value={formData.role} onChange={handleChange} className="w-full p-2 border rounded-md bg-white">
                <option value="buyer">Buyer</option>
                <option value="seller">Seller</option>
              </select>
            )}
            <Button type="submit" className="w-full bg-blue-500 text-white rounded-lg py-2" disabled={loading}>
              {loading ? "Processing..." : isLogin ? "Login" : "Sign Up"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
