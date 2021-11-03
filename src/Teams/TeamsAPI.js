function teamsAPI(page,perpage){
    const options = {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: 'Bearer ASbPv4LDK0IBqqOA_JR9CdHEoVeLqcHr41NcXWR47tjz0dephsA'
        }
      };
    const linkApi = process.env.REACT_APP_LEAGUES_API_URL + "/teams?page=" + page + "&per_page=" + perpage;
    return fetch(linkApi,options);
}
export default teamsAPI;