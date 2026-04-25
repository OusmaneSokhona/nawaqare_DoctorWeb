import axios from "axios";

import { Country } from "@/api/api-types";

export const fetchCountries = async () => {
  try {
    const response = await axios.get("https://restcountries.com/v3.1/all");
    return response?.data
      .map((country: any) => ({
        name: country.name.common,
        code: country.idd?.root + (country.idd?.suffixes?.[0] || ""),
        flag: country.flags?.svg || country.flags?.png,
      }))
      .filter(
        (c: Country) =>
          c.code &&
          c.flag &&
          !["Antarctica", "Heard Island and McDonald Islands"].includes(c.name), // Exclude specific countries
      )
      .sort((a: Country, b: Country) => a.name.localeCompare(b.name));
  } catch (error) {
    console.error("Error fetching country data:", error);
  }
};
