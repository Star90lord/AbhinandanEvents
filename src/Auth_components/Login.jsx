function Login() {
  return (
    <div className="max-w-md mx-auto bg-white shadow p-6 rounded">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <input className="w-full border p-2 mb-3" placeholder="Email" />
      <input className="w-full border p-2 mb-3" placeholder="Password" type="password" />
      <button className="bg-blue-600 text-white px-4 py-2 w-full">
        Login
      </button>
    </div>
  );
}
export default Login;