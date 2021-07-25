import axios from "axios";

const useStats = () => {
  const headers = {
    "x-rapidapi-key": "dbe0f1f010mshc5e441799a56718p16b0d3jsn5fc4bad703fa",
    "x-rapidapi-host": "free-nba.p.rapidapi.com",
  };

  const fetchTeams = async () => {
    try {
      const response = await axios.get(
        "https://free-nba.p.rapidapi.com/teams",
        {
          params: { page: 0 },
          headers,
        }
      );

      return response.data.data;
    } catch {
      console.log("whoops something is broken");
    }
  };

  return [fetchTeams];
};

export default useStats;
