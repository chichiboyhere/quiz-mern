
const config = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
    }
  };
  
  const {
    data: { ip }
  } = await axios.get("https://api.ipify.org?format=json", config);