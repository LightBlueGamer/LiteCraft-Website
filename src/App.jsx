import { Routes, Route, A } from "@solidjs/router";
import { lazy } from "solid-js";

import { SiDiscord } from 'solid-icons/si';
import { IoReorderThree } from 'solid-icons/io';

const Home = lazy(() => import("./pages/Home"));
const Servers = lazy(() => import("./pages/Servers"));
const Team = lazy(() => import("./pages/Team"));

const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export default function App() {
  return <>
    <div class="bg-slate-800">
      <div>
        <div class="sm:hidden w-full h-full min-w-full min-h-full bg-slate-900 flex justify-items-center">
          <button onClick={async() => {
            const div = document.getElementById('mobnav').classList.toggle('hidden');
          }}>
            <IoReorderThree size={32} class="ml-2" color="#e2e8f0"/>
          </button>
          <a href="https://discord.litecraft.org" target="_blank" class="justify-self-center self-center ml-auto mr-3">
            <SiDiscord color="#e2e8f0" size={24} class=""/>
          </a>
        </div>
        <div id="mobnav" class="hidden bg-slate-900 w-full">
          <ul>
          {[
          ['Home', '/'],
          ['Team', '/team'],
          ['Servers', '/servers'],
        ].map(([title, url]) => (
          <li className="py-2 border-t border-[#0b111e]"><A href={url} className="px-4 py-4 text-xl text-slate-200 font-medium">{title}</A></li>
        ))}
          </ul>
        </div>
      </div>
      {/*Navbar tablet >*/}
      <nav id="navbar" className="hidden sticky top-0 bg-slate-900 sm:flex items-baseline space-x-4">
        {[
          ['Home', '/'],
          ['Team', '/team'],
          ['Servers', '/servers'],
        ].map(([title, url]) => (
          <A href={url} className="px-4 py-4 text-xl text-slate-200 font-medium hover:bg-slate-800 hover:text-slate-50">{title}</A>
        ))}
        <a href="https://panel.litecraft.org" target="_blank" className="px-4 py-4 text-xl text-slate-200 font-medium hover:bg-slate-800 hover:text-slate-50">Panel</a>
        <a href="https://discord.litecraft.org" target="_blank" class="w-8 h-8 px-4 py-4 justify-self-start self-start" style="margin-left:auto;margin-right:32px">
          <SiDiscord color="#e2e8f0" size={24} class=""/>
        </a>
      </nav>
      {/*Navbar tablet > END*/}
      <Routes>
        <Route path="/" component={Home} />
        <Route path="/servers" component={Servers} />
        <Route path="/team" component={Team} />
      </Routes>
    </div>
  </>
};