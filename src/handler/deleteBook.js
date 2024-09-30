const books = require("../books")

const deleteBookHandler=(req,h)=>{
    const {id } = req.params
    const idx = books.findIndex((v)=>v.id==id)
    if(idx>-1){
        books.splice(idx,1);
        const res = h.response({
            "status": "success",
            "message": "Buku berhasil dihapus"
        })
        res.type('application/json').code(200)
        return res 
    }
    const res = h.response({
        "status": "fail",
        "message": "Buku gagal dihapus. Id tidak ditemukan"
    }).type('application/json').code(404)
    return res
}

module.exports = deleteBookHandler