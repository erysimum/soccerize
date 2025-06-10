
//console.log("API Base URL:", import.meta.env.VITE_API_BASE_URL);
console.log("API Base URL:", window.env?.VITE_API_BASE_URL);

// const API = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
const API =window.env?.VITE_API_BASE_URL || "http://localhost:5000";
type GoalResponse = {
    message: string
}

export const postGoal = async (team: string, player: string,second:number, matchId:string): Promise<GoalResponse> => {
    const response = await fetch(`${API}/goal`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type:'goal',matchId, team, player,second }),
    });
    if (!response.ok) {
        console.log("Error from Server")
        throw new Error(`Server error: ${response.status}`)
    }
    const data: GoalResponse = await response.json()
    console.log('Reponse from server', data.message)//data has message as a key
    return data

}


type CardResponse = {
    message: string
}
export const postCard = async (
    team: string,
    player: string,
    card: string,
    second:number,
    matchId:string
): Promise<CardResponse> => {
    const response = await fetch(`${API}/card`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type:'card', matchId, team, player, card ,second}),
    });
    if (!response.ok) {
        throw new Error(`Server error: ${response.status}`)
    }
    const data: CardResponse = await response.json()
    return data
};

export const resetMatch = async () => {
    await fetch(`${API}/reset`, { method: "POST" });
};
