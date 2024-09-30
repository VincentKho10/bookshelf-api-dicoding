const books = require("../books");

const getAllBookHandler = (req, h) => {
  const {reading, finished, name} = req.query
  const searched = books.filter((v)=>{
    if(reading){
      return v.reading==reading
    }
    else if(finished){
      return v.finished==finished
    }
    else if(name){
      return v.name.toLowerCase().includes(name.toLowerCase())
    }else{
      return v
    }
  })
  
  const toShow = searched.map((v)=>{
    return {
      id:v.id,
      name:v.name,
      publisher:v.publisher,
    }
  })

  if (books.length > 0) {
    const res = h.response({
      status: "success",
      data: {
        books: toShow,
      },
    });
    res.type("application/json");
    res.code(200);
    return res;
  }

  const res = h.response({
    status: "success",
    data: {
      books: [],
    },
  });
  res.type("application/json");
  res.code(200);
  return res;
};

module.exports = getAllBookHandler;
