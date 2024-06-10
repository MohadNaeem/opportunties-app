import FilterPage from "./pages";
import Search from "./pages/Search";
import Admin from './pages/Admin'

export default function Home() {
  return (
    <main className="">
      {/* <FilterPage /> */}
      <Search />
      <Admin />
    </main>
  );
}
