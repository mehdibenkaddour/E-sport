function leaguesAPI(page,perpage){
    const options = {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: 'Bearer ASbPv4LDK0IBqqOA_JR9CdHEoVeLqcHr41NcXWR47tjz0dephsA'
        }
      };
    const linkApi = process.env.REACT_APP_LEAGUES_API_URL + "/leagues?page=" + page + "&per_page=" + perpage;
    console.log(linkApi);
    return fetch(linkApi,options);
}
export default leaguesAPI;