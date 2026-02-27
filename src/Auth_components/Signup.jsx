function Signup() {
  return (
    <div className="max-w-md mx-auto bg-white shadow p-6 rounded">
      <h2 className="text-2xl font-bold mb-4">Signup</h2>
      <input className="w-full border p-2 mb-3" placeholder="Name" />
      <input className="w-full border p-2 mb-3" placeholder="Email" />
      <input className="w-full border p-2 mb-3" placeholder="Password" type="password" />
      <button className="bg-green-600 text-white px-4 py-2 w-full">
        Signup
      </button>
    </div>
  );
}
export default Signup;