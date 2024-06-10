// pages/api/fetchSAMData.js
import { supabase } from "../lib/supabase";

async function fetchSAMData() {
  const response = await fetch(
    `https://api.sam.gov/prod/opportunities/v2/search?limit=800&api_key=${process.env.NEXT_PUBLIC_SAM_API_KEY}&ptype=a&deptname=general&postedFrom=01/01/2024&postedTo=05/04/2024`
  );
  const data = await response.json();
  if (data.opportunitiesData) {
    data.opportunitiesData.forEach(async (opportunity) => {
      await supabase.from("opportunities").insert([
        {
          title: opportunity.title,
          description: opportunity.description,
          naics_code: opportunity.naicsCode,
        },
      ]);
      console.log("Added row");
    });
  }
}

export default async function handler(req, res) {
  try {
    await fetchSAMData();
    return ({ message: "Data fetched and stored in Supabase" });
  } catch (error) {
    console.error("Error fetching data:", error);
    return ({ message: "Error fetching data", error: error.message });
  }
}
