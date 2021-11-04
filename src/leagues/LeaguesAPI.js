function leaguesAPI(page,perpage,game){
    const options = {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: 'Bearer ASbPv4LDK0IBqqOA_JR9CdHEoVeLqcHr41NcXWR47tjz0dephsA'
        }
      };
      let linkApi;
      if(game === "all-games" || game == null){
          linkApi = process.env.REACT_APP_LEAGUES_API_URL + "/leagues?page=" + page + "&per_page=" + perpage;
      }
      else {
          linkApi = process.env.REACT_APP_LEAGUES_API_URL +"/"+ game + "/leagues?page=" + page + "&per_page=" + perpage
      };
      return fetch(linkApi,options);
}
export default leaguesAPI;