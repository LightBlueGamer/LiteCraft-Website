import { For, Match, Switch } from 'solid-js';

const servs = [
    {name: "Better MC Plus 1.16", ip: "bmcp"},
    {name: "Vault Hunters", ip: "vh"},
    {name: "Better MC Plus 1.18", ip: "bmcp18"},
    {name: "Fantasy Realm", ip: "fr"},
    {name: "LiteCraft", ip: "lc"},
    {name: "FTB Inferno", ip: "inf"}
];

const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms))

const servers = [];

for (const s of servs) {
  let headersList = {
    "Accept": "*/*",
  }

  const response = await fetch(`https://api.mcstatus.io/v2/status/java/${s.ip}.litecraft.org`, { 
    method: "GET",
    headers: headersList
  });

  const data = await response.json();

  const obj = {
    name: s.name,
    status: data.online ? "Online" : "Offline",
    players: data.online ? data.players.online : 0,
    maxPlayers: data.online ? data.players.max : 0
  };

  servers.push(obj);
  await wait(50)
}
setTimeout(() => {
    window.location.reload(true);
}, 1000 * 60);

export default function Home() {
    return <>
        <div class='bg-slate-800 mt-10 inset-0 z-10 flex flex-row place-content-center place-items-center'>
        <div class='bg-blue-800 flex grow flex-col place-content-center gap-4 max-w-sm p-4 rounded mx-2'>
        <h1 class='text-4xl font-bold text-center p-1 text-slate-300'>LCN Servers</h1>

        <For each={servers}>
            {(server) => (
            <a
                class='bg-gray-800 border-slate-400 hover:slate-900 flex flex-col gap-2 h-11 place-content-between rounded px-2 font-semibold leading-none focus:ring-2 focus:ring-blue-500'
                href={`/server/${server.name}`}
            >
                <div class='flex grow flex-row place-content-between place-items-center gap-2'>
                <div class='flex grow flex-row place-content-between place-items-center'>
                    <div class='flex flex-row place-content-between place-items-center gap-2'>
                    <Switch>
                        <Match when={server.status === 'Online'}>
                        <span class='text-green-500'>●</span>
                        </Match>

                        <Match when={server.status === 'Offline'}>
                        <span class='text-red-500'>●</span>
                        </Match>
                    </Switch>

                    <h2 class='font-semibold text-slate-300'>{server.name}</h2>
                    </div>

                    <span class='bg-slate-900 text-sm text-neutral-300 rounded-full p-1 px-2'>
                    {server.players} / {server.maxPlayers}
                    </span>
                </div>
                </div>
            </a>
            )}
        </For>
        </div>
    </div>
    </>
}