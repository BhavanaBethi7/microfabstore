import { loginUser } from '../api/auth';

const [token, setToken] = useState(null);

const handleLogin = async () => {
  const data = await loginUser({ email, password });
  setToken(data.token); // 🔐 Store in memory only
};
