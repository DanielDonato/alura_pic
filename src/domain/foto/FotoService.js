export default class FotoService {

    constructor(http){
        this._http = http;
    }

    lista(){
        return this._http
            .get("http://localhost:3000/v1/fotos")
            .then(res => res.json(), err => {
                console.log(err);
                throw new Error("Não foi possivel obter as fotos");
            });
    }

    cadastra(foto){
        if(foto._id){
            return this._http
                .put(`http://localhost:3000/v1/fotos/${foto._id}`, foto);
        }
        return this._http.post('http://localhost:3000/v1/fotos', foto);
    }

    apaga(id){
        return this._http.delete(`http://localhost:3000/v1/fotos/${id}`)
            .then(null, (err) =>{
                console.log(err);
                throw new Error('Não foi possivel remover a foto');
            });
    }

    busca(id){
        return this._http
            .get(`http://localhost:3000/v1/fotos/${id}`)
            .then(res => res.json())
    }

}