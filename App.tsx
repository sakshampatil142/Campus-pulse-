import { useState } from "react";
import { AuthComponent } from "@/components/ui/sign-up";
import CampusSelect, { Campus } from "@/components/campus-select";
import CampusPulse from "@/components/campus-pulse";

// Brand Logo for Alta School of Technology / Campus Pulse
const AltaBrandLogo = () => (
  <div className="bg-gradient-to-tr from-indigo-500 via-indigo-600 to-violet-600 text-white rounded-xl p-2 shadow-lg shadow-indigo-500/30 flex items-center justify-center">
    <svg 
      className="h-4 w-4" 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
    </svg>
  </div>
);

export function App() {
  const [user, setUser] = useState<{ email: string; name?: string; provider?: string } | null>(null);
  const [campus, setCampus] = useState<Campus | null>(null);

  // 1. If not logged in -> Show Authentication (Google / GitHub / Email)
  if (!user) {
    return (
      <AuthComponent 
        logo={<AltaBrandLogo />} 
        brandName="Alta School of Technology" 
        onSuccess={(userData) => setUser(userData)}
      />
    );
  }

  // 2. If logged in but no campus chosen -> Show Alta School of Technology Campus Selector (5 campuses)
  if (!campus) {
    return (
      <CampusSelect 
        user={user}
        onSelectCampus={(selected) => setCampus(selected)}
        onLogout={() => {
          setUser(null);
          setCampus(null);
        }}
      />
    );
  }

  // 3. Once campus is chosen (e.g. Alta Pune) -> Render Campus Pulse for that campus
  return (
    <CampusPulse 
      currentUser={user} 
      campus={campus}
      onChangeCampus={() => setCampus(null)}
      onLogout={() => {
        setUser(null);
        setCampus(null);
      }} 
    />
  );
}

export default App;
