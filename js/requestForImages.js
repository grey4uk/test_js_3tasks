export default (getData, query = "car",numberPage=1) => {
  return fetch(
    `https://pixabay.com/api/?key=15313425-bc0f61e46a051ea2578b0fd6a&q=${query}&page=${numberPage}&image_type=photo`
  )
    .then((res) => res.json())
    .then((data) =>getData(data));
};
