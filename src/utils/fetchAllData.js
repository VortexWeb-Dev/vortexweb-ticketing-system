import axios from "axios";

const fetchAllData = async (url, config = {}, setIsLoading=null, setError=null) => {
  let page = 1;
  let aggregateData = [];
  let total = Infinity;
  setIsLoading && setIsLoading(true)
  while (aggregateData.length < total) {
    try {
      const response = await axios.get(
        url+page,
        {
          headers: {
          "Cache-Control": "no-cache"
        }}
      );
      const { tickets, pagination } = response.data;
      const newTotal = pagination.total
      console.log(tickets);
      console.log(response.data);
      
      setError && setError(null)

      aggregateData = [...aggregateData, ...tickets];
      total = newTotal;

      if (aggregateData.length >= total) break;

      page++;
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error)
      break;
    }finally{
      setIsLoading(false)
    }
  }
  
  return aggregateData;
};

export default fetchAllData;
