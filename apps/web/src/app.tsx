import logo from "./assets/logo-in-orbit.svg";
import letsstart from "./assets/lets-start-illustration.svg";
import { Plus } from "lucide-react";

export function App() {
  return (
    <div className="h-screen flex flex-col items-center justify-center gap-8">
      <img src={logo} alt="in.orbit" />
      <img src={letsstart} alt="in.orbit" />
      <p className="text-zinc-300 leading-relaxed max-w-80 text-center        ">
        Você ainda não cadastrou nenhuma meta, que tal cadastrar um agora mesmo?
      </p>
      <button
        type="button"
        className="px-4 py-2.5 bg-violet-500 text-violet-50 flex items-center gap-2 rounded-lg"
      >
        <Plus className="size-4" />
        Cadastrar meta
      </button>
    </div>
  );
}
