axios.get('https://cors-anywhere.herokuapp.com/https://covid-api.mmediagroup.fr/v1/cases')
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.error(err)
      })