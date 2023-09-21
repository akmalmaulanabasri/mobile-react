import logo from "./logo.svg";
import "./App.css";
// css
import "./index.css";

function App() {
  return (
    <>
      <div className="">
        <div className="container px-5 py-10">
          <img
            src="https://smkwikrama.sch.id/assets2/wikrama-logo.png"
            className="w-[90px]"
            alt=""
          />
          <div className="w-[200px] text-blue-800 text-4xl font-semibold">
            Sign in to E-Canteen
          </div>
          <div className="w-[80px] h-[10px] mt-5 bg-gradient-to-r from-blue-800 to-blue-400 rounded-[30px]" />

          <form action="">
            <input
              type="text"
              placeholder="Username"
              className="mt-10 bg-gray-200 text-white w-[400px] h-[50px] rounded-[10px] px-5"
            />
            <input
              type="password"
              placeholder="Password"
              className="mt-3 bg-gray-200 text-white w-[400px] h-[50px] rounded-[10px] px-5"
            />

            <input
              type="submit"
              value="Login"
              className="mt-10 bg-gradient-to-r from-indigo-600 to-blue-500 text-white w-[400px] h-[50px] rounded-[21px] px-5"
            />
          </form>
        </div>
      </div>
    </>
  );
}

export default App;
