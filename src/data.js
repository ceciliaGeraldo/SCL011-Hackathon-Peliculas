const orderSelector = (data, selectOrd) => {

    let orderSelector = "";
  
    if (selectOrd === "yearAsc") {
      orderSelector = data.sort((a, b) => {
        return (a.id - b.id);
      })
    }
    else if (selectOrd === "yearDesc") {
      orderSelector = data.sort((a, b) => {
        return (b.id - a.id);
      })
    }
    else if (selectOrd === "alphaAsc") {
      orderSelector = data.sort((a, b) => {
        return a.name.localeCompare(b.name);
      })
    }
    else {
      orderSelector = data.sort((a, b) => {
        return b.name.localeCompare(a.name);
      })
    }
  
  
    return orderSelector;
  
  }

  window.orderSelector = orderSelector;