import { createStore } from 'vuex';

export default createStore({
  state: {
    countries: [
      {
        name: 'Malaysia',
        locations: [
          {
            name: 'Langkawi',
            images: [
              { 
                title: 'Sunset at Langkawi', 
                url: 'https://lh3.googleusercontent.com/pw/AP1GczPMBC0SUnvVyVwLFxh_-0c58gr5qH6TSMXEV4rtNy4hEqbPepaD8YsH1CZ2tCJvfbjDGwmSBDt_4-udJ48OxhRhOU2XfHeyfoduIECNZTpdVJClNaX3QMJLe8Xdq7iHEp6fvOTDbGmaYuH9YnEBodNFOg=w1159-h869-s-no-gm?'
              }
            ]
          }
        ]
      }
    ]
  },
  
  mutations: {
    addCountry(state, country) {
      state.countries.push(country);
    },
    addLocation(state, { countryName, location }) {
      const country = state.countries.find(c => c.name === countryName);
      if (country) {
        country.locations.push(location);
      }
    },
    addImage(state, payload) {
      const country = state.countries.find(c => c.name === payload.countryName);
      if (!country) return;

      const location = country.locations.find(l => l.name === payload.locationName);
      if (!location) return;

      // Push the new image to the 'images' array
      location.images.push({
        title: payload.image.title,
        url: payload.image.url
      });
    }
  
  }
});
