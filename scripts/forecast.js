const apikey="V4e8yiP1q7ovTAOOIYXESuJYfaUILllT";

//get weather information 

const weather= async (id)=>
{
const base='http://dataservice.accuweather.com/currentconditions/v1/';
const query=`${id}?apikey=${apikey}`;
const response= await fetch(base+query);
const data= await response.json();
return data[0];
}



//get city information
const getCity= async (city)=>
{
    const base="http://dataservice.accuweather.com/locations/v1/cities/search";
    const query=`?apikey=${apikey}&q=${city}`;
    const response=await fetch(base.concat(query));
    const data=await response.json();
    return data[0];
}



